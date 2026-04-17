import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface EmailServiceResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

type DeliveryPayload = {
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

/**
 * Validates contact form data
 */
function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateNewsletterSignup(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Invalid email format');
  }

  if (data.name != null && typeof data.name === 'string' && data.name.length > 120) {
    errors.push('Name is too long');
  }

  if (
    data.name != null &&
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    data.name.trim().length < 2
  ) {
    errors.push('Name must be at least 2 characters if provided');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

async function deliverEmail(payload: DeliveryPayload): Promise<EmailServiceResponse> {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const hasGmailCredentials = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;
    const hasSendGridKey = process.env.SENDGRID_API_KEY;

    if (isProduction && hasGmailCredentials) {
      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.EMAIL_TO || process.env.GMAIL_USER,
        replyTo: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      };

      const result = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId,
      };
    }

    if (isProduction && hasSendGridKey) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: process.env.EMAIL_TO || 'contact@beyondtheclassroom.in',
        from: process.env.EMAIL_FROM || 'noreply@beyondtheclassroom.in',
        replyTo: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      };

      const result = await sgMail.send(msg);

      return {
        success: true,
        messageId: result[0].headers['x-message-id'],
      };
    }

    console.log('📧 ===== Outbound email (dev / no provider) =====');
    console.log('Subject:', payload.subject);
    console.log('Reply-To:', payload.replyTo);
    console.log(payload.text);
    console.log('================================================');

    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      success: true,
      messageId: `dev_msg_${Date.now()}`,
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function sendEmailNotification(data: ContactFormData): Promise<EmailServiceResponse> {
  return deliverEmail({
    replyTo: data.email,
    subject: `Contact Form: ${data.name}`,
    text: `
New Contact Form Submission

From: ${data.name}
Email: ${data.email}
Message: ${data.message}

Sent at: ${new Date().toLocaleString()}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${data.message.replace(/\n/g, '<br>')}
      </div>
      <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
    `,
  });
}

async function sendNewsletterSignupNotification(
  email: string,
  name: string | undefined
): Promise<EmailServiceResponse> {
  const nameLine = name?.trim() ? name.trim() : 'Not provided';
  const when = new Date().toLocaleString();

  return deliverEmail({
    replyTo: email.trim(),
    subject: 'Newsletter signup (website)',
    text: `
Newsletter signup request

Email: ${email.trim()}
Name: ${nameLine}

Sent at: ${when}
    `,
    html: `
      <h2>Newsletter signup</h2>
      <p><strong>Email:</strong> ${email.trim()}</p>
      <p><strong>Name:</strong> ${nameLine}</p>
      <p><small>Sent at: ${when}</small></p>
    `,
  });
}

/**
 * Serverless function handler for contact form submissions
 * Compatible with Vercel, Netlify, and other serverless platforms
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const body = req.body as any;

    if (body?.purpose === 'newsletter') {
      const validation = validateNewsletterSignup(body);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
        });
      }

      const emailResult = await sendNewsletterSignupNotification(
        body.email,
        typeof body.name === 'string' ? body.name : undefined
      );

      if (!emailResult.success) {
        return res.status(500).json({
          success: false,
          error: 'Failed to send email notification',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'You are subscribed. We will be in touch soon.',
        messageId: emailResult.messageId,
      });
    }

    const formData = body as ContactFormData;
    const validation = validateFormData(formData);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors,
      });
    }

    const emailResult = await sendEmailNotification(formData);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send email notification',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully',
      messageId: emailResult.messageId,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
