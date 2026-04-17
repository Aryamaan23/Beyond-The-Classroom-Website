import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  validateContactForm,
  submitContactForm,
  validateNewsletterSignup,
  submitNewsletterSignup,
} from '../contactService';
import type { ContactFormData } from '../../types';

describe('contactService', () => {
  describe('validateContactForm', () => {
    it('should validate correct form data', () => {
      const validData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with more than 10 characters',
      };

      const result = validateContactForm(validData);

      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject empty name', () => {
      const invalidData: ContactFormData = {
        name: '',
        email: 'john@example.com',
        message: 'Valid message here',
      };

      const result = validateContactForm(invalidData);

      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe('Name is required');
    });

    it('should reject name shorter than 2 characters', () => {
      const invalidData: ContactFormData = {
        name: 'J',
        email: 'john@example.com',
        message: 'Valid message here',
      };

      const result = validateContactForm(invalidData);

      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe('Name must be at least 2 characters');
    });

    it('should reject invalid email format', () => {
      const invalidData: ContactFormData = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Valid message here',
      };

      const result = validateContactForm(invalidData);

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('Please enter a valid email address');
    });

    it('should reject empty email', () => {
      const invalidData: ContactFormData = {
        name: 'John Doe',
        email: '',
        message: 'Valid message here',
      };

      const result = validateContactForm(invalidData);

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('Email is required');
    });

    it('should reject message shorter than 10 characters', () => {
      const invalidData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      };

      const result = validateContactForm(invalidData);

      expect(result.valid).toBe(false);
      expect(result.errors.message).toBe('Message must be at least 10 characters');
    });

    it('should reject empty message', () => {
      const invalidData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: '',
      };

      const result = validateContactForm(invalidData);

      expect(result.valid).toBe(false);
      expect(result.errors.message).toBe('Message is required');
    });

    it('should return multiple errors for multiple invalid fields', () => {
      const invalidData: ContactFormData = {
        name: 'J',
        email: 'invalid',
        message: 'Short',
      };

      const result = validateContactForm(invalidData);

      expect(result.valid).toBe(false);
      expect(Object.keys(result.errors)).toHaveLength(3);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.message).toBeDefined();
    });
  });

  describe('submitContactForm', () => {
    beforeEach(() => {
      // Reset fetch mock before each test
      global.fetch = vi.fn();
    });

    it('should successfully submit valid form data', async () => {
      const validData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      };

      const mockResponse = {
        success: true,
        message: 'Your message has been sent successfully',
        messageId: 'msg_123',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await submitContactForm(validData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Your message has been sent successfully');
      expect(result.messageId).toBe('msg_123');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/contact'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validData),
        })
      );
    });

    it('should handle API error response', async () => {
      const validData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      };

      const mockErrorResponse = {
        success: false,
        error: 'Server error',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse,
      });

      const result = await submitContactForm(validData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Server error');
    });

    it('should handle network error', async () => {
      const validData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      };

      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const result = await submitContactForm(validData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('validateNewsletterSignup', () => {
    it('should accept email only', () => {
      const result = validateNewsletterSignup({ email: 'a@b.co' });
      expect(result.valid).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = validateNewsletterSignup({ email: 'not-an-email' });
      expect(result.valid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it('should reject single-character name when provided', () => {
      const result = validateNewsletterSignup({ email: 'a@b.co', name: 'X' });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBeDefined();
    });
  });

  describe('submitNewsletterSignup', () => {
    beforeEach(() => {
      global.fetch = vi.fn();
    });

    it('should POST newsletter payload', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'ok' }),
      });

      const result = await submitNewsletterSignup({ email: 'sub@example.com', name: 'Sam' });

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/contact'),
        expect.objectContaining({
          body: JSON.stringify({
            purpose: 'newsletter',
            email: 'sub@example.com',
            name: 'Sam',
          }),
        })
      );
    });

    it('should return API errors when not ok', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false, error: 'Validation failed', errors: ['Invalid email format'] }),
      });

      const result = await submitNewsletterSignup({ email: 'bad' });

      expect(result.success).toBe(false);
      expect(result.errors).toEqual(['Invalid email format']);
    });
  });
});
