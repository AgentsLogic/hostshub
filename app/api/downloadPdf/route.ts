import { NextResponse } from 'next/server';
import { marked } from 'marked';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    // Configure Puppeteer to use the bundled Chromium
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Convert Markdown to HTML
    const htmlContent = marked(content);

    // Set the page content with some basic styling for the PDF
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Findr Report</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; padding: 20px; }
          h1, h2, h3 { color: #007bff; margin-top: 20px; margin-bottom: 10px; }
          pre { background-color: #f4f4f4; padding: 10px; overflow-x: auto; }
          code { font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `);

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    // Return the PDF for download
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="findr-report.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
