/**
 * Template Engine Utilities
 * This file provides server-side templating functionality
 * Uses Handlebars in a way that is compatible with Next.js server components
 */

// Import handlebars on server side only
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Using a dynamic import for Handlebars to avoid webpack issues
let Handlebars: any = null;

// Initialize Handlebars with custom helpers
export async function getTemplateEngine() {
  if (!Handlebars) {
    // Only load handlebars in a server context
    if (typeof window === 'undefined') {
      try {
        Handlebars = require('handlebars');
        
        // Register custom Handlebars helpers using arrow functions to avoid 'this' context issues
        Handlebars.registerHelper('toLowerCase', (str: string) => {
          return str.toLowerCase();
        });
        
        Handlebars.registerHelper('toUpperCase', (str: string) => {
          return str.toUpperCase();
        });
        
        Handlebars.registerHelper('capitalize', (str: string) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        });
        
        Handlebars.registerHelper('formatDate', (date: string | Date) => {
          return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        });
        
        // Special handling for block helpers that need 'this' context
        Handlebars.registerHelper('ifEquals', function(this: any, arg1: any, arg2: any, options: any) {
          return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });
        
        Handlebars.registerHelper('ifNotEquals', function(this: any, arg1: any, arg2: any, options: any) {
          return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
        });
      } catch (error) {
        console.error('Error loading Handlebars:', error);
        throw new Error('Failed to load template engine');
      }
    } else {
      throw new Error('Template engine can only be used in server-side code');
    }
  }
  
  return Handlebars;
}

/**
 * Process a template string with provided data
 * @param template - The template string with Handlebars syntax
 * @param data - The data to populate the template with
 * @returns Processed template string
 */
export async function processTemplate(template: string, data: Record<string, any>): Promise<string> {
  const handlebars = await getTemplateEngine();
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(data);
}

/**
 * A utility function specifically for transforming property website templates
 * @param content - Raw template content
 * @param propertyData - Property information
 * @param siteData - Site/domain information
 * @returns - Processed template with variables substituted
 */
export async function processPropertyTemplate(
  content: string,
  propertyData: { name: string; description: string; address: string },
  siteData: { subdomain: string; siteId: string }
): Promise<string> {
  // Prepare the template data
  const templateData = {
    property: propertyData,
    site: siteData,
    // Add additional context variables that might be useful
    currentYear: new Date().getFullYear(),
    environment: process.env.NODE_ENV || 'development',
  };
  
  return processTemplate(content, templateData);
}
