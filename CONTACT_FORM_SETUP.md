# Contact Form Setup Guide

This document explains the contact form submission implementation for the Beyond the Classroom website.

## Overview

The contact form submission system consists of:

1. **Client-side validation** - Validates form data before submission
2. **API service layer** - Handles communication with the backend
3. **Development API** - Mock API endpoint integrated into Vite dev server
4. **Production API** - Serverless function for deployment (Vercel/Netlify compatible)

## Architecture

```
┌─────────────────┐
│  ContactForm    │  (React Component)
│   Component     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ contactService  │  (API Service Layer)
│  - validate     │
│  - submit       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Endpoint  │
│  /api/contact   │
│                 │
│  Dev: Vite      │
│  Prod: Vercel   │
└─────────────────┘
```

## Files Created

### Client-Side
- `src/services/contactService.ts` - API service with validation and submission logic
- `src/components/contact/ContactForm.tsx` - Updated to use the service

### Server-Side
- `api/contact.ts` - Serverless function for production (Vercel compatible)
- `vite.config.ts` - Updated with mock API endpoint for development
- `api/README.md` - Deployment and email integration guide

### Configuration
- `.env.example` - Example environment variables
- `.env.local` - Local development configuration

### Testing
- `test-contact-api.js` - Manual test script
- `src/services/__tests__/contactService.test.ts` - Unit tests (requires vitest)

## Development Usage

### Starting the Development Server

```bash
npm run dev
```

The Vite dev server includes a mock API endpoint at `/api/contact` that:
- Validates form submissions
- Logs submissions to the console
- Returns appropriate success/error responses

### Testing the Form

1. Navigate to `http://localhost:5173/contact`
2. Fill out the contact form
3. Submit the form
4. Check the terminal for the logged submission:

```
📧 ===== Contact Form Submission =====
From: John Doe <john@example.com>
Time: 2024-01-15T10:30:00.000Z
Message: This is a test message
=====================================
```

### Manual API Testing

Run the test script:

```bash
node test-contact-api.js
```

Or use curl:

```bash
# Valid submission
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message with more than 10 characters"
  }'

# Invalid submission
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "email": "invalid-email",
    "message": "Short"
  }'
```

## Validation Rules

The form validates the following:

| Field   | Rules                                    |
|---------|------------------------------------------|
| Name    | Required, minimum 2 characters           |
| Email   | Required, valid email format             |
| Message | Required, minimum 10 characters          |

Validation occurs:
- **Client-side**: Before API submission (immediate feedback)
- **Server-side**: In the API endpoint (security)

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy (Vercel automatically detects the `api/` directory)
4. The API endpoint will be available at `https://yourdomain.com/api/contact`

### Environment Variables

Set these in your deployment platform:

```bash
# Email service (choose one)
SENDGRID_API_KEY=your_key_here
# or
RESEND_API_KEY=your_key_here
# or
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here

# Email addresses
EMAIL_TO=contact@beyondtheclassroom.in
EMAIL_FROM=noreply@beyondtheclassroom.in
```

### Email Service Integration

The current implementation logs to console. To send actual emails, see `api/README.md` for integration guides for:

- **SendGrid** - Popular email service with generous free tier
- **Resend** - Modern email API with great developer experience
- **AWS SES** - Cost-effective for high volume

## Error Handling

The implementation handles various error scenarios:

### Client-Side Errors
- **Validation errors**: Displayed inline below each field
- **Network errors**: Displayed as general error message
- **API errors**: Displayed as general error message

### Server-Side Errors
- **400 Bad Request**: Validation failed
- **405 Method Not Allowed**: Wrong HTTP method
- **500 Internal Server Error**: Server-side error

### User Experience
- Loading state during submission (button shows "Sending...")
- Success message displayed for 5 seconds after successful submission
- Form is cleared after successful submission
- Errors are cleared when user starts typing

## Security Considerations

### Implemented
✅ Input validation (client and server)
✅ CORS headers configured
✅ Content-Type validation
✅ Error messages don't expose sensitive information

### Recommended for Production
- [ ] Rate limiting (prevent spam)
- [ ] CAPTCHA integration (reCAPTCHA or hCaptcha)
- [ ] Input sanitization (prevent XSS)
- [ ] CSRF protection
- [ ] Request logging and monitoring

## Testing Checklist

- [x] Valid form submission works
- [x] Invalid name is rejected
- [x] Invalid email is rejected
- [x] Invalid message is rejected
- [x] Multiple validation errors are shown
- [x] Success message is displayed
- [x] Form is cleared after success
- [x] Loading state is shown during submission
- [x] Errors are cleared when typing
- [ ] Test on actual deployment
- [ ] Test email delivery (after email service integration)

## Troubleshooting

### Form submission not working in development

1. Check that dev server is running: `npm run dev`
2. Check browser console for errors
3. Check terminal for API logs
4. Verify the API endpoint in `.env.local`

### Form submission not working in production

1. Check that serverless function deployed correctly
2. Check environment variables are set
3. Check browser network tab for API response
4. Check serverless function logs in deployment platform

### Emails not being sent

1. Verify email service is integrated (see `api/README.md`)
2. Check API keys are set correctly
3. Check email service logs/dashboard
4. Verify sender email is verified (required by most services)

## Next Steps

1. **Choose an email service** - Select SendGrid, Resend, or AWS SES
2. **Integrate email service** - Follow guide in `api/README.md`
3. **Add rate limiting** - Prevent spam submissions
4. **Add CAPTCHA** - Additional spam protection
5. **Monitor submissions** - Set up logging/analytics
6. **Test thoroughly** - Test on staging before production

## Support

For issues or questions:
- Check `api/README.md` for detailed API documentation
- Review error messages in browser console and server logs
- Test with `test-contact-api.js` script
