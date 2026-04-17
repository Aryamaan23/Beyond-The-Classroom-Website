import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ContactForm from '../components/contact/ContactForm';

/**
 * Form Compatibility Tests
 * 
 * Test form behavior across different browsers to ensure:
 * - Form validation works consistently
 * - Input types are supported
 * - Submission handling is reliable
 * - Error states display correctly
 */

describe('Form Cross-Browser Compatibility', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
  });

  describe('Input Type Support', () => {
    it('should support email input type', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(emailInput.type).toBe('email');
    });

    it('should support text input type', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      expect(nameInput.type).toBe('text');
    });

    it('should support textarea element', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const messageInput = screen.getByLabelText(/message/i);
      expect(messageInput.tagName).toBe('TEXTAREA');
    });
  });

  describe('Form Validation Attributes', () => {
    it('should have required attribute on required fields', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

      expect(nameInput.required).toBe(true);
      expect(emailInput.required).toBe(true);
      expect(messageInput.required).toBe(true);
    });

    it('should have appropriate input attributes', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(emailInput.type).toBe('email');
      expect(emailInput.required).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should handle successful form submission', async () => {
      const user = userEvent.setup();
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a test message for cross-browser compatibility.');
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/contact'),
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
            body: expect.any(String),
          })
        );
      });
    });

    it('should handle form submission errors', async () => {
      const user = userEvent.setup();
      
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a test message.');
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(/failed to send message/i);
        expect(errorMessage).toBeTruthy();
      });
    });
  });

  describe('Client-Side Validation', () => {
    it('should validate email format', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(/valid email/i);
        expect(errorMessage).toBeTruthy();
      });
    });

    it('should validate required fields', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        const nameError = screen.getByText(/name is required/i);
        expect(nameError).toBeTruthy();
      });
    });

    it('should validate minimum length', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      await user.type(nameInput, 'A');
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(/at least 2 characters/i);
        expect(errorMessage).toBeTruthy();
      });
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper label associations', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(messageInput).toBeTruthy();
    });

    it('should have accessible submit button', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeTruthy();
      expect(submitButton.getAttribute('type')).toBe('submit');
    });

    it('should display error messages accessibly', async () => {
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);

      await waitFor(() => {
        const errors = screen.getAllByRole('alert');
        expect(errors.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Form State Management', () => {
    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      
      // Mock a delayed response
      (global.fetch as any).mockImplementationOnce(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true }),
        }), 100))
      );

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message');
      await user.click(submitButton);

      // Check for loading state
      const loadingButton = screen.getByRole('button', { name: /sending/i });
      expect(loadingButton).toBeTruthy();
      expect(loadingButton).toBeDisabled();
    });

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup();
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
      const submitButton = screen.getByRole('button', { name: /send message/i });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message');
      await user.click(submitButton);

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });
  });

  describe('Browser-Specific Form Features', () => {
    it('should support autocomplete attribute', () => {
      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

      // Check that autocomplete is properly set
      expect(nameInput.autocomplete).toBeTruthy();
      expect(emailInput.autocomplete).toBeTruthy();
    });

    it('should handle form submission with Enter key', async () => {
      const user = userEvent.setup();
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message');
      
      // Submit with Enter key
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });
  });
});
