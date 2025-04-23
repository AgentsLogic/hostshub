import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const { data, error } = await resend.emails.send({
      from: 'Findr <findr@hostshub.ai>',
      to: email,
      subject: 'Your Findr Search Results',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Your Findr Search Results</h1>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
            ${content.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px;">Thank you for using Findr!</p>
        </div>
      `
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
