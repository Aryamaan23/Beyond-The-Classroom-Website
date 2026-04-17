import { ContactFormData, NewsletterSignupData } from '../types';

interface ContactApiResponse {
  success: boolean;
  message?: string;
  messageId?: string;
  error?: string;
  errors?: string[];
}

/**
 * Submits contact form data to the API
 * @param data Contact form data
 * @returns Promise with API response
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  try {
    // Determine API endpoint based on environment
    const apiUrl = import.meta.env.VITE_API_URL || '/api/contact';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit form');
    }

    return result;
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return error response
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

/**
 * Validates contact form data on the client side
 * @param data Contact form data
 * @returns Validation result with errors if any
 */
export function validateContactForm(data: ContactFormData): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateNewsletterSignup(data: NewsletterSignupData): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  const nameTrim = data.name?.trim() ?? '';
  if (nameTrim.length === 1) {
    errors.name = 'Name must be at least 2 characters if provided';
  } else if (nameTrim.length > 120) {
    errors.name = 'Name is too long';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function submitNewsletterSignup(
  data: NewsletterSignupData
): Promise<ContactApiResponse> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '/api/contact';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        purpose: 'newsletter',
        email: data.email.trim(),
        ...(data.name?.trim() ? { name: data.name.trim() } : {}),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to subscribe',
        errors: result.errors,
      };
    }

    return result;
  } catch (error) {
    console.error('Newsletter signup error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}
