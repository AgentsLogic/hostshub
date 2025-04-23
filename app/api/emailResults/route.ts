import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { marked } from 'marked';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, content } = await request.json();

    if (!email || !content) {
      return NextResponse.json(
        { error: 'Email and content are required' },
        { status: 400 }
      );
    }

    // Convert Markdown content to HTML for the email body
    const htmlContent = marked(content);

    const { data, error } = await resend.emails.send({
      from: 'Findr <mail@hostshub.ai>', // Replace with your verified domain
      to: email,
      subject: 'Your Findr Report',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: sans-serif; line-height: 1.6; }
            h1, h2, h3 { color: #007bff; margin-top: 20px; margin-bottom: 10px; }
            pre { background-color: #f4f4f4; padding: 10px; overflow-x: auto; }
            code { font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Error processing email request:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
