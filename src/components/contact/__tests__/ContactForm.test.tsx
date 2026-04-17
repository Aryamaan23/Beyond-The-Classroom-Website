import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ContactForm from '../ContactForm';
import * as contactService from '../../../services/contactService';

// Mock the contact service
vi.mock('../../../services/contactService', () => ({
  validateContactForm: vi.fn(),
  submitContactForm: vi.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render form with all fields', () => {
      renderWithRouter(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should render heading', () => {
      renderWithRouter(<ContactForm />);
      expect(screen.getByText('Send us a message')).toBeInTheDocument();
    });

    it('should have required field indicators', () => {
      renderWithRouter(<ContactForm />);
      const requiredMarkers = screen.getAllByText('*');
      expect(requiredMarkers).toHaveLength(3); // Name, Email, Message
    });

    it('should have proper input placeholders', () => {
      renderWithRouter(<ContactForm />);
      
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Tell us how we can help...')).toBeInTheDocument();
    });
  });

  describe('Form Input', () => {
    it('should update name field on input', async () => {
      const user = userEvent.setup();
      renderWithRouter(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'John Doe');
      
      expect(nameInput).toHaveValue('John Doe');
    });

    it('should update email field on input', async () => {
      const user = userEvent.setup();
      renderWithRouter(<ContactForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'john@example.com');
      
      expect(emailInput).toHaveValue('john@example.com');
    });

    it('should update message field on input', async () => {
      const user = userEvent.setup();
      renderWithRouter(<ContactForm />);
      
      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'This is a test message');
      
      expect(messageInput).toHaveValue('This is a test message');
    });
  });

  describe('Form Validation', () => {
    it('should display validation errors for invalid data', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: false,
        errors: {
          name: 'Name is required',
          email: 'Please enter a valid email address',
          message: 'Message is required',
        },
      });
      
      renderWithRouter(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('should clear field error when user starts typing', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: false,
        errors: { name: 'Name is required' },
      });
      
      renderWithRouter(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'J');
      
      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      });
    });

    it('should highlight invalid fields with red border', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: false,
        errors: { email: 'Invalid email' },
      });
      
      renderWithRouter(<ContactForm />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toHaveClass('border-red-500');
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: true,
        errors: {},
      });
      
      vi.mocked(contactService.submitContactForm).mockResolvedValue({
        success: true,
        message: 'Your message has been sent successfully',
      });
      
      renderWithRouter(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(contactService.submitContactForm).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a test message',
        });
      });
    });

    it('should show success message after successful submission', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: true,
        errors: {},
      });
      
      vi.mocked(contactService.submitContactForm).mockResolvedValue({
        success: true,
        message: 'Your message has been sent successfully',
      });
      
      renderWithRouter(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
      });
    });

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: true,
        errors: {},
      });
      
      vi.mocked(contactService.submitContactForm).mockResolvedValue({
        success: true,
        message: 'Success',
      });
      
      renderWithRouter(<ContactForm />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(messageInput).toHaveValue('');
      });
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: true,
        errors: {},
      });
      
      vi.mocked(contactService.submitContactForm).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100))
      );
      
      renderWithRouter(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      expect(screen.getByText('Sending...')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.getByText('Send Message')).toBeInTheDocument();
      });
    });

    it('should disable form fields during submission', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: true,
        errors: {},
      });
      
      vi.mocked(contactService.submitContactForm).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100))
      );
      
      renderWithRouter(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toBeDisabled();
    });

    it('should display error message on submission failure', async () => {
      const user = userEvent.setup();
      
      vi.mocked(contactService.validateContactForm).mockReturnValue({
        valid: true,
        errors: {},
      });
      
      vi.mocked(contactService.submitContactForm).mockResolvedValue({
        success: false,
        error: 'Server error occurred',
      });
      
      renderWithRouter(<ContactForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Server error occurred')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      renderWithRouter(<ContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('should have noValidate attribute on form', () => {
      const { container } = renderWithRouter(<ContactForm />);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('noValidate');
    });
  });
});
