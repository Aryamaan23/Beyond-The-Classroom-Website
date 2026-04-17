import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Navigation from '../Navigation';

const renderWithRouter = (ui: React.ReactElement, initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      {ui}
    </MemoryRouter>
  );
};

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset body overflow style before each test
    document.body.style.overflow = 'unset';
  });

  describe('Rendering', () => {
    it('should render logo', () => {
      renderWithRouter(<Navigation />);
      expect(screen.getByRole('link', { name: /beyond the classroom/i })).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      renderWithRouter(<Navigation />);
      
      // Nav text links (exclude logo): desktop + mobile drawers
      expect(screen.getAllByRole('link', { name: 'Home' })).toHaveLength(2);
      expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(2);
      expect(screen.getAllByRole('link', { name: 'Programs' })).toHaveLength(2);
      expect(screen.getAllByRole('link', { name: 'Media' })).toHaveLength(2);
      expect(screen.getAllByRole('link', { name: 'Partner With Us' })).toHaveLength(2);
      expect(screen.getAllByRole('link', { name: 'Get Involved' })).toHaveLength(2);
    });

    it('should have correct href attributes', () => {
      renderWithRouter(<Navigation />);
      
      // Check first instance (desktop menu)
      expect(screen.getAllByRole('link', { name: 'Home' })[0]).toHaveAttribute('href', '/');
      expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute('href', '/about');
      expect(screen.getAllByRole('link', { name: 'Programs' })[0]).toHaveAttribute('href', '/programs');
      expect(screen.getAllByRole('link', { name: 'Media' })[0]).toHaveAttribute('href', '/media');
      expect(screen.getAllByRole('link', { name: 'Partner With Us' })[0]).toHaveAttribute('href', '/partner');
      expect(screen.getAllByRole('link', { name: 'Get Involved' })[0]).toHaveAttribute('href', '/contact');
    });

    it('should render mobile menu button', () => {
      renderWithRouter(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Active Link Highlighting', () => {
    it('should highlight home link when on home page', () => {
      renderWithRouter(<Navigation />, '/');
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      expect(homeLinks[0].className).toMatch(/text-primary/);
      expect(homeLinks[0].className).toMatch(/bg-primary-soft/);
    });

    it('should highlight about link when on about page', () => {
      renderWithRouter(<Navigation />, '/about');
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      expect(aboutLinks[0].className).toMatch(/text-primary/);
      expect(aboutLinks[0].className).toMatch(/bg-primary-soft/);
    });

    it('should highlight programs link when on programs page', () => {
      renderWithRouter(<Navigation />, '/programs');
      const programsLinks = screen.getAllByRole('link', { name: 'Programs' });
      expect(programsLinks[0].className).toMatch(/text-primary/);
      expect(programsLinks[0].className).toMatch(/bg-primary-soft/);
    });

    it('should not highlight inactive links', () => {
      renderWithRouter(<Navigation />, '/');
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      expect(aboutLinks[0]).toHaveClass('text-slate-600');
      expect(aboutLinks[0].className).not.toMatch(/bg-primary-soft/);
    });
  });

  describe('Mobile Menu Behavior', () => {
    it('should open mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should close mobile menu when close button is clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      const closeButton = screen.getByRole('button', { name: /close menu/i });
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should close mobile menu when backdrop is clicked', async () => {
      const user = userEvent.setup();
      const { container } = renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      const backdrop = container.querySelector('[class*="bg-slate-900"]');
      if (backdrop) {
        await user.click(backdrop as HTMLElement);
      }
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should prevent body scroll when menu is open', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    it('should restore body scroll when menu is closed', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
      
      const closeButton = screen.getByRole('button', { name: /close menu/i });
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close menu on Escape key', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should not close menu on Escape when menu is already closed', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      await user.keyboard('{Escape}');
      
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should be able to tab through navigation links', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const logo = screen.getByRole('link', { name: /beyond the classroom/i });
      logo.focus();
      expect(logo).toHaveFocus();
      
      await user.tab();
      const homeNav = screen.getAllByRole('link', { name: 'Home' });
      expect(homeNav[0]).toHaveFocus();
    });

    it('should have focus indicators on interactive elements', () => {
      renderWithRouter(<Navigation />);
      
      const logo = screen.getByRole('link', { name: /beyond the classroom/i });
      expect(logo.className).toMatch(/focus-visible:ring-primary/);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on menu button', () => {
      renderWithRouter(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    it('should have proper ARIA label on close button', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(menuButton);
      
      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close menu/i });
        expect(closeButton).toHaveAttribute('aria-label', 'Close menu');
      });
    });

    it('should have semantic nav element', () => {
      const { container } = renderWithRouter(<Navigation />);
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should have desktop navigation with proper classes', () => {
      renderWithRouter(<Navigation />);
      const homeNav = screen.getAllByRole('link', { name: 'Home' });
      expect(homeNav[0].parentElement).toHaveClass('hidden', 'md:flex');
    });

    it('should have mobile menu button with proper classes', () => {
      renderWithRouter(<Navigation />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toHaveClass('md:hidden');
    });
  });

  describe('Logo', () => {
    it('should link to home page', () => {
      renderWithRouter(<Navigation />);
      const logo = screen.getByRole('link', { name: /beyond the classroom/i });
      expect(logo).toHaveAttribute('href', '/');
    });

    it('should have proper styling', () => {
      renderWithRouter(<Navigation />);
      const logo = screen.getByRole('link', { name: /beyond the classroom/i });
      expect(logo.className).toMatch(/rounded-lg/);
      expect(logo.className).toMatch(/hover:opacity-90/);
    });
  });
});
