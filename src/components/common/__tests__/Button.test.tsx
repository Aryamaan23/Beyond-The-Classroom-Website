import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Button from '../Button';

// Helper to render with router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('should render with primary variant', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button', { name: /primary/i });
      expect(button).toHaveClass('bg-primary');
    });

    it('should render with secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button', { name: /secondary/i });
      expect(button).toHaveClass('bg-secondary');
    });

    it('should render with outline variant', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button', { name: /outline/i });
      expect(button).toHaveClass('border-primary');
    });

    it('should render with small size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button', { name: /small/i });
      expect(button).toHaveClass('px-4', 'py-2', 'text-sm');
    });

    it('should render with medium size', () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole('button', { name: /medium/i });
      expect(button).toHaveClass('px-6', 'py-3', 'text-base');
    });

    it('should render with large size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button', { name: /large/i });
      expect(button).toHaveClass('px-8', 'py-4', 'text-lg');
    });

    it('should apply custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button', { name: /custom/i });
      expect(button).toHaveClass('custom-class');
    });

    it('should render as disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });

    it('should render with aria-label', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      const button = screen.getByRole('button', { name: /custom label/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick} disabled>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should be keyboard accessible', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      
      button.focus();
      expect(button).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Link Rendering', () => {
    it('should render as internal link when href is provided', () => {
      renderWithRouter(<Button href="/about">About</Button>);
      const link = screen.getByRole('link', { name: /about/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/about');
    });

    it('should render as external link with target blank', () => {
      render(<Button href="https://example.com">External</Button>);
      const link = screen.getByRole('link', { name: /external/i });
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render mailto link without target', () => {
      render(<Button href="mailto:test@example.com">Email</Button>);
      const link = screen.getByRole('link', { name: /email/i });
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
      expect(link).not.toHaveAttribute('target');
    });

    it('should call onClick for link buttons', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      renderWithRouter(<Button href="/test" onClick={handleClick}>Link</Button>);
      const link = screen.getByRole('link', { name: /link/i });
      
      await user.click(link);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button Types', () => {
    it('should render with submit type', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button', { name: /submit/i });
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should render with reset type', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button', { name: /reset/i });
      expect(button).toHaveAttribute('type', 'reset');
    });

    it('should default to button type', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button', { name: /default/i });
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
