import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('should render with title only', () => {
      render(<Card title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render with title and description', () => {
      render(<Card title="Test Title" description="Test description" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should render with image', () => {
      render(<Card image="/test-image.jpg" imageAlt="Test image" />);
      const image = screen.getByRole('img', { name: /test image/i });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
    });

    it('should use title as alt text when imageAlt is not provided', () => {
      render(<Card image="/test.jpg" title="Card Title" />);
      const image = screen.getByRole('img', { name: /card title/i });
      expect(image).toBeInTheDocument();
    });

    it('should render with icon', () => {
      const TestIcon = () => <svg data-testid="test-icon" />;
      render(<Card icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(
        <Card>
          <p>Child content</p>
        </Card>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<Card className="custom-class" title="Test" />);
      const card = container.firstChild;
      expect(card).toHaveClass('custom-class');
    });

    it('should render all props together', () => {
      const TestIcon = () => <svg data-testid="test-icon" />;
      render(
        <Card
          title="Full Card"
          description="Complete description"
          image="/image.jpg"
          imageAlt="Card image"
          icon={<TestIcon />}
          className="custom"
        >
          <button>Action</button>
        </Card>
      );
      
      expect(screen.getByText('Full Card')).toBeInTheDocument();
      expect(screen.getByText('Complete description')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /card image/i })).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
    });
  });

  describe('Interactive Card', () => {
    it('should render as button when onClick is provided', () => {
      const handleClick = vi.fn();
      render(<Card title="Clickable" onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('type', 'button');
    });

    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Card title="Clickable" onClick={handleClick} />);
      const card = screen.getByRole('button');
      
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible when interactive', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Card title="Clickable" onClick={handleClick} />);
      const card = screen.getByRole('button');
      
      card.focus();
      expect(card).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have cursor-pointer class when interactive', () => {
      const handleClick = vi.fn();
      render(<Card title="Clickable" onClick={handleClick} />);
      const card = screen.getByRole('button');
      expect(card).toHaveClass('cursor-pointer');
    });
  });

  describe('Non-interactive Card', () => {
    it('should render as div when onClick is not provided', () => {
      const { container } = render(<Card title="Static" />);
      const card = container.firstChild;
      expect(card?.nodeName).toBe('DIV');
    });

    it('should not have cursor-pointer class when not interactive', () => {
      const { container } = render(<Card title="Static" />);
      const card = container.firstChild;
      expect(card).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Image Loading', () => {
    it('should have lazy loading attribute', () => {
      render(<Card image="/test.jpg" imageAlt="Test" />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('should have proper image styling classes', () => {
      render(<Card image="/test.jpg" imageAlt="Test" />);
      const image = screen.getByRole('img');
      expect(image).toHaveClass('w-full', 'h-full', 'object-cover');
    });
  });
});
