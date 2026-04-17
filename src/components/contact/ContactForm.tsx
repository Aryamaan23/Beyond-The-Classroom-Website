import { useState } from 'react';
import { ContactFormData } from '../../types';
import Button from '../common/Button';
import { submitContactForm, validateContactForm } from '../../services/contactService';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // Clear general error when user makes changes
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Submit form to API
      const result = await submitContactForm(formData);

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        // Handle API errors
        setErrors({
          general: result.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setErrors({
        general: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border-2 border-primary/15 border-t-4 border-t-secondary p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Send us a message
      </h2>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 font-medium">
            Thank you for your message! We'll get back to you soon.
          </p>
        </div>
      )}

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 font-medium">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300'
            }`}
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-vertical ${
              errors.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300'
            }`}
            placeholder="Tell us how we can help..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
