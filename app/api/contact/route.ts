import { NextRequest, NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email to all team members
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: [
        'write2manasvini@gmail.com',
        'asktoniya@gmail.com',
        'manoj.elango123@gmail.com',
        'anirudh.venkat03@gmail.com'
      ].join(', '), // Join array with commas
      subject: `Feedback Received: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Feedback Received
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="padding: 20px; border-left: 4px solid #007bff; border-radius: 4px;">
              <h3 style="margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="font-size: 12px; color: #999;">This feedback was shared via the AsterAI feedback form</p>
              <p style="font-size: 12px; color: #999;">Timestamp: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('Contact form submission sent to team:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString(),
      recipients: [
        'write2manasvini@gmail.com',
        'asktoniya@gmail.com',
        'manoj.elango123@gmail.com',
        'anirudh.venkat03@gmail.com'
      ]
    });

    return NextResponse.json(
      { message: 'Thank you for your feedback! We\'re thrilled to hear from you and will respond soon.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while sending your feedback. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
