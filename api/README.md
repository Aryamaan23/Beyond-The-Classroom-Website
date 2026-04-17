# API Functions

This directory contains serverless functions for the Beyond the Classroom website.

## Contact Form (`contact.ts`)

Handles contact form submissions.

## Development

During development, the Vite dev server includes a mock API endpoint at `/api/contact` that logs submissions to the console.

To test the contact form:
1. Start the development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check the terminal for the logged submission

## Production Deployment

### Vercel

The `contact.ts` file is compatible with Vercel's serverless functions.

1. Deploy your site to Vercel
2. The API endpoint will automatically be available at `https://yourdomain.com/api/contact`
3. Configure environment variables in Vercel dashboard:
   - `SENDGRID_API_KEY` (if using SendGrid)
   - `EMAIL_TO`
   - `EMAIL_FROM`

### Other Platforms

For other platforms, adapt the handler function to match their serverless function format.

## Email Service Integration

The current implementation logs submissions to the console. To send actual emails, integrate with an email service:

### Option 1: SendGrid

```bash
npm install @sendgrid/mail
```

Update `api/contact.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

await sgMail.send({
  to: 'contact@beyondtheclassroom.in',
  from: 'noreply@beyondtheclassroom.in',
  replyTo: data.email,
  subject: `Contact Form: ${data.name}`,
  text: data.message,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${data.name} (${data.email})</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
  `,
});
```

### Option 2: Resend

```bash
npm install resend
```

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@beyondtheclassroom.in',
  to: 'contact@beyondtheclassroom.in',
  replyTo: data.email,
  subject: `Contact Form: ${data.name}`,
  html: `...`,
});
```

### Option 3: AWS SES

```bash
npm install @aws-sdk/client-ses
```

```typescript
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const client = new SESClient({ region: process.env.AWS_REGION });

await client.send(new SendEmailCommand({
  Source: 'noreply@beyondtheclassroom.in',
  Destination: { ToAddresses: ['contact@beyondtheclassroom.in'] },
  Message: {
    Subject: { Data: `Contact Form: ${data.name}` },
    Body: { Html: { Data: `...` } },
  },
  ReplyToAddresses: [data.email],
}));
```

## Testing

### Manual Testing

Test with valid data:
```bash
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message with more than 10 characters"
  }'
```

Test with invalid data:
```bash
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "T",
    "email": "invalid-email",
    "message": "Short"
  }'
```

### Expected Responses

Success (200):
```json
{
  "success": true,
  "message": "Your message has been sent successfully",
  "messageId": "msg_1234567890"
}
```

Validation Error (400):
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    "Name must be at least 2 characters",
    "Invalid email format",
    "Message must be at least 10 characters"
  ]
}
```

Server Error (500):
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting to prevent spam
2. **CAPTCHA**: Consider adding reCAPTCHA for additional protection
3. **Input Sanitization**: All inputs are validated, but consider additional sanitization
4. **CORS**: Configure CORS appropriately for production
5. **Environment Variables**: Never commit API keys or secrets to version control
