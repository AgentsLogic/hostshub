"use server";

console.log("Processing app/dashboard/websites/new/actions.ts");

import fs from "fs/promises";
import path from "path";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Force production behavior for Supabase operations
const isDevelopment = false;

export async function createWebsiteFromTemplate(
  templateName: string,
  propertyData: {
    name: string;
    description: string;
    address: string;
  },
  subdomain: string,
  propertyId: string
) {
  console.log("Executing createWebsiteFromTemplate server action...");
  let siteDir = '';

  try {
    console.log("Attempting to create Supabase server client...");
    console.log("Value of NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Value of NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const supabase = await createSupabaseServerClient(); // Move supabase creation here
    console.log("Supabase server client created.");

    // --- Supabase Connection Test ---
    console.log("Testing Supabase connection...");
    const { data: testData, error: testError } = await supabase.from('websites').select('id').limit(1);
    if (testError) {
      console.error("Supabase connection test failed:", testError);
      throw new Error("Supabase connection failed. Please check your credentials and database status.");
    }
    console.log("Supabase connection test successful. Found data:", testData);

    // --- Database Schema Verification ---
    console.log("Verifying database schema...");
    const isSchemaValid = await verifyWebsiteTableSchema(supabase);
    if (!isSchemaValid) {
      throw new Error("Database schema verification failed. Please ensure the 'websites' table exists with required columns.");
    }
    console.log("Database schema verification successful.");

    // --- Access Control (Temporarily Bypassed for Local Testing) ---
    // const { data: { user } } = await supabase.auth.getUser();

    // if (!user) {
    //   throw new Error("Unauthorized: You must be logged in to create a website.");
    // }
    // console.log("User authenticated:", user.id);

    // --- Enhanced Server-Side Input Validation with Security Utilities ---
    
    // Validate template name
    if (!templateName || typeof templateName !== 'string' || !templates.find((t) => t.name === templateName)) {
      throw new Error("Invalid or missing template name.");
    }
    
    // Validate property data
    const requiredPropertyFields: (keyof typeof propertyData)[] = ['name', 'description', 'address'];
    const { valid: hasRequiredFields, missingFields } = 
      validateRequiredFields(propertyData, requiredPropertyFields);
    
    if (!hasRequiredFields) {
      throw new Error(`Missing required property data: ${missingFields.join(', ')}`);
    }
    
    // Sanitize property data to prevent XSS and other injection attacks
    const sanitizedPropertyData = {
      name: sanitizeHtml(propertyData.name),
      description: sanitizeHtml(propertyData.description),
      address: sanitizeHtml(propertyData.address)
    };
    
    // Validate & sanitize subdomain
    const sanitizedSubdomain = sanitizeSubdomain(subdomain);
    if (!sanitizedSubdomain) {
      throw new Error("Invalid subdomain format. Use lowercase letters, numbers, and hyphens.");
    }
    
    // UUID Validation for property ID
    if (!isValidUuid(propertyId)) {
      throw new Error("Invalid property ID format. Expected UUID format.");
    }

    // --- Create Website Files by Copying Template ---
    const siteId = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, ""); // Declare siteId
    const template = templates.find((t) => t.name === templateName);
    if (!template) {
      throw new Error(`Template "${templateName}" not found.`);
    }

    const templateSourceDir = path.join(process.cwd(), "templates/project/src/app"); // Path to the template's app directory
    siteDir = path.join(process.cwd(), "app/sites", siteId);
    console.log('Template source directory:', templateSourceDir);
    console.log('Site destination directory:', siteDir);

    console.log(`Creating website directory: ${siteDir}`);
    await fs.mkdir(siteDir, { recursive: true });

    console.log(`Copying template app directory contents from ${templateSourceDir} to ${siteDir}`);
    console.log('Template source exists:', await fs.access(templateSourceDir).then(() => true).catch(() => false));
    console.log('Destination exists:', await fs.access(siteDir).then(() => true).catch(() => false));
    await copyDirectoryContents(templateSourceDir, siteDir);
    console.log('Copy completed. Verifying files...');
    console.log('Copied files:', await fs.readdir(siteDir, { recursive: true }));

    // --- Adjust Import Paths in Copied Files ---
    console.log(`Adjusting import paths in generated site files at ${siteDir}`);
    await adjustImportPaths(siteDir);

    // --- Process Template Variables ---
    // Apply a templating engine to process variables in specific files
    console.log('Processing template variables...');
    console.log('Template directory:', path.join(siteDir, 'src'));
    console.log('Property data:', propertyData);
    console.log('Site data:', { subdomain: subdomain, siteId: siteId });
    await processTemplateVariables(
      path.join(siteDir, 'src'), 
      propertyData,
      { 
        subdomain: subdomain,
        siteId: siteId
      }
    );
    console.log('Template variable processing complete.');

    // --- Save website data using the atomic database function ---
    console.log('Calling atomic database function to save website:', {
      p_subdomain: subdomain,
      p_property_id: propertyId,
      p_template_used: templateName,
      p_site_path: siteDir
    });

    /* Note: For future expansion, we should consider implementing proper transaction management
     * Once we have the necessary stored procedures in the database.
     * This would involve:
     * 1. Implementing BEGIN TRANSACTION, COMMIT, and ROLLBACK stored procedures
     * 2. Using them to wrap multiple database operations
     * 3. Ensuring all operations succeed together or fail together
     */
    
    const { error: insertError } = await supabase.rpc('create_website_atomic', {
      p_subdomain: subdomain,
      p_property_id: propertyId,
      p_template_used: templateName,
      p_site_path: siteDir
    });

    if (insertError) {
      console.error('Atomic website creation failed:', insertError);
      if (siteDir) {
        await fs.rm(siteDir, { recursive: true, force: true });
      }
      throw new Error(insertError.message || 'Failed to register website in database atomically');
    }

    return { 
      siteId,
      redirectUrl: `/dashboard/websites`
    };
  } catch (error: any) {
    console.error("Website creation failed:", error);
    if (siteDir) {
      await fs.rm(siteDir, { recursive: true, force: true });
    }
    throw new Error(error.message || "An unexpected error occurred during website creation.");
  }
}

async function verifyWebsiteTableSchema(supabase: any): Promise<boolean> {
  try {
    // Check if 'websites' table exists
    console.log("Checking for 'websites' table existence...");
    console.log("Executing query: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'websites'");
    const { data: tableData, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public') // Assuming the table is in the 'public' schema
      .eq('table_name', 'websites');

    if (tableError) {
      console.error("Error checking for 'websites' table:", tableError);
      console.error("Table check error details:", tableError);
      return false;
    }
    console.log("Table check result:", tableData);
    if (!tableData || tableData.length === 0) {
      console.error("Schema verification failed: 'websites' table not found. Table data:", tableData);
      return false;
    }
    console.log("'websites' table found. Table data:", tableData);

    // Check if required columns exist
    const requiredColumns = ['property_id', 'subdomain', 'template_used', 'site_path', 'created_at'];
    console.log("Checking for required columns:", requiredColumns);
    console.log("Executing query: SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'websites' AND column_name IN ('property_id', 'subdomain', 'template_used', 'site_path', 'created_at')");
    const { data: columnData, error: columnError } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'websites')
      .in('column_name', requiredColumns);

    if (columnError) {
      console.error("Error checking for required columns:", columnError);
      console.error("Column check error details:", columnError);
      return false;
    }
    console.log("Column data retrieved:", columnData);
    if (!columnData || columnData.length !== requiredColumns.length) {
      console.error("Schema verification failed: Missing required columns in 'websites' table. Found columns:", columnData);
      console.error("Expected columns count:", requiredColumns.length);
      console.error("Found columns count:", columnData ? columnData.length : 0);
      return false;
    }
    console.log("Required columns found. Column data:", columnData);

    console.log("Database schema verification successful.");
    return true;
  } catch (error) {
    console.error("An error occurred during schema verification:", error);
    return false;
  }
}

// Note: This is a basic recursive directory copying function.
// For high-volume or very large templates, consider offloading to a dedicated
// file storage service (e.g., Supabase Storage) or using a background job queue
// for improved scalability and performance.
async function copyDirectory(src: string, dest: string) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error: any) {
    console.error(`Error copying directory from ${src} to ${dest}:`, error);
    throw error;
  }
}

// Helper function to copy contents of a directory
async function copyDirectoryContents(src: string, dest: string) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error: any) {
    console.error(`Error copying directory contents from ${src} to ${dest}:`, error);
    throw error;
  }
}

import { processPropertyTemplate } from '@/lib/template-engine';
import { 
  sanitizeHtml, 
  sanitizeSubdomain, 
  isValidUuid, 
  validateRequiredFields,
  sanitizeFilename,
  sanitizeTemplateInput
} from '@/lib/security-utils';

/**
 * Process template variables using the server-side template engine with security measures
 * Walks through all files in the directory tree and applies template substitutions
 * @param dir Directory containing template files
 * @param propertyData Property information for template substitution
 * @param siteData Site/domain information for template substitution
 */
async function processTemplateVariables(
  dir: string, 
  propertyData: { name: string; description: string; address: string },
  siteData: { subdomain: string; siteId: string }
) {
  try {
    // Identify the files to be processed
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processTemplateVariables(entryPath, propertyData, siteData);
      } else if (entry.isFile()) {
        // Process only specific file types
        if (/\.(js|jsx|ts|tsx|html|css|json|md)$/.test(entry.name)) {
          try {
            // Read the file content
            let content = await fs.readFile(entryPath, 'utf8');
            
            // Convert common template patterns to Handlebars format before processing
            // First, convert hardcoded property names to template variables
            content = content.replace(/Twin Hills River Ranch/g, '{{property.name}}');
            
            // Prepare title tags for Handlebars
            content = content.replace(
              /<title>(.*?)<\/title>/g,
              '<title>{{property.name}}</title>'
            );
            
            // Replace property description placeholders
            content = content.replace(
              /placeholder description/g,
              '{{property.description}}'
            );
            
            // Replace address placeholders
            content = content.replace(
              /Located at: \{propertyData\.address\}/g,
              'Located at: {{property.address}}'
            );
            
            // Replace hardcoded site IDs with the template variable
            content = content.replace(/test2/g, '{{site.siteId}}');
            
            // Apply special processing for specific file types
            if (entry.name === 'Layout.tsx') {
              content = content.replace(
                /<span className="text-xl font-serif text-gray-900">(.*?)<\/span>/g,
                '<span className="text-xl font-serif text-gray-900">{{property.name}}</span>'
              );
            }
            
            // Process the template using our server-side template engine
            const processedContent = await processPropertyTemplate(
              content,
              propertyData,
              siteData
            );
            
            // Write the processed content back to the file
            await fs.writeFile(entryPath, processedContent, 'utf8');
            
          } catch (error) {
            console.error(`Error processing template file ${entryPath}:`, error);
            // Continue with other files even if one fails
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error in template processing:`, error);
    throw new Error(`Template processing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Enhanced function to adjust import paths in copied template files
async function adjustImportPaths(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await adjustImportPaths(entryPath); // Recurse into subdirectories
    } else if (entry.isFile() && /\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      let content = await fs.readFile(entryPath, 'utf8');

      // Regex to find import statements
      const importRegex = /import\s+(\{?\s*[\w\s,]+\s*\}?)\s+from\s+['"](.*?)['"]/g;
      let newContent = content;
      let match;

      while ((match = importRegex.exec(content)) !== null) {
        const fullMatch = match[0];
        const imported = match[1];
        const importPath = match[2];

        // Check if the import path is a relative path starting with ../
        if (importPath.startsWith('../')) {
          // Resolve the absolute path of the imported module based on the original template structure
          const originalTemplateSrcDir = path.join(process.cwd(), "templates/project/src");
          const originalFilePath = path.relative(path.join(process.cwd(), "app/sites", path.relative(path.join(process.cwd(), "app/sites"), dir)), entryPath);
          const originalImportPath = path.resolve(path.dirname(path.join(originalTemplateSrcDir, originalFilePath)), importPath);

          // Determine the relative path from the new file location to the imported module's new location
          const newFileDir = path.dirname(entryPath);
          const newImportPath = path.relative(newFileDir, originalImportPath);

          // Replace the original import path with the new relative path
          newContent = newContent.replace(fullMatch, `import ${imported} from '${newImportPath.replace(/\\/g, '/')}'`);
        } else if (importPath.startsWith('@/lib/')) {
           // Handle imports from the main application's lib directory
           // Imports from @/lib/ should remain as is, pointing to the main application's lib directory
           // No adjustment needed for these imports
           // newContent = newContent.replace(fullMatch, `import ${imported} from '${importPath}'`); // Keep original import path
        } else if (importPath.startsWith('../../../../app/lib/')) {
           // Handle specific case for imports from main app/lib when copied to app/sites/[siteId]
           const libModule = importPath.replace('../../../../app/lib/', '');
           newContent = newContent.replace(fullMatch, `import ${imported} from '../../lib/${libModule}'`);
        }
      }

      // Fix any Next.js specific imports
      newContent = newContent.replace(
        /import\s+(\{?\s*[\w\s,]+\s*\}?)\s+from\s+['"]next\/(.+)['"]/g,
        "import $1 from 'next/$2'"
      );

      // Fix React imports
      newContent = newContent.replace(
        /import\s+(\{?\s*[\w\s,]+\s*\}?)\s+from\s+['"]react['"](.+)?/g,
        "import $1 from 'react'$2"
      );


      await fs.writeFile(entryPath, newContent, 'utf8');
    }
  }
}


const templates = [
  {
    name: "Modern Minimal",
    templatePath: "templates/project/src/app", // Point to the Next.js app directory
    outputPath: "app/sites/[siteId]"
  }
];
