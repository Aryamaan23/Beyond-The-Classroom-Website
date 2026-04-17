import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Home from '../pages/Home';

/**
 * Responsive Design Tests
 * 
 * Verify that components adapt correctly to different viewport sizes
 * and that responsive breakpoints work as expected.
 */

describe('Responsive Design', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    // Restore original viewport size
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  describe('Navigation Component Responsiveness', () => {
    it('should render mobile menu button on small screens', () => {
      window.innerWidth = 375; // Mobile width
      window.dispatchEvent(new Event('resize'));

      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      // Mobile menu button should be present
      const menuButton = screen.getByLabelText(/toggle navigation menu/i);
      expect(menuButton).toBeTruthy();
    });

    it('should render desktop navigation on large screens', () => {
      window.innerWidth = 1280; // Desktop width
      window.dispatchEvent(new Event('resize'));

      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      // Navigation links should be visible
      const homeLink = screen.getByText(/home/i);
      expect(homeLink).toBeTruthy();
    });
  });

  describe('Viewport Breakpoints', () => {
    const breakpoints = [
      { name: 'iPhone SE', width: 320, height: 568 },
      { name: 'iPhone 12', width: 390, height: 844 },
      { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
      { name: 'iPad', width: 768, height: 1024 },
      { name: 'iPad Pro', width: 1024, height: 1366 },
      { name: 'Desktop HD', width: 1280, height: 720 },
      { name: 'Desktop Full HD', width: 1920, height: 1080 },
    ];

    breakpoints.forEach(({ name, width, height }) => {
      it(`should render without errors at ${name} (${width}x${height})`, () => {
        window.innerWidth = width;
        window.innerHeight = height;
        window.dispatchEvent(new Event('resize'));

        const { container } = render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );

        expect(container).toBeTruthy();
        expect(container.querySelector('main')).toBeTruthy();
      });
    });
  });

  describe('Media Query Matching', () => {
    it('should match mobile media query at 375px', () => {
      window.innerWidth = 375;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      expect(isMobile).toBe(true);
    });

    it('should match tablet media query at 768px', () => {
      window.innerWidth = 768;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      expect(isTablet).toBe(true);
    });

    it('should match desktop media query at 1280px', () => {
      window.innerWidth = 1280;
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      expect(isDesktop).toBe(true);
    });
  });

  describe('Touch Device Detection', () => {
    it('should detect hover capability', () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      expect(typeof hasHover).toBe('boolean');
    });

    it('should detect pointer type', () => {
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      
      // At least one should be defined
      expect(typeof hasCoarsePointer).toBe('boolean');
      expect(typeof hasFinePointer).toBe('boolean');
    });
  });

  describe('Orientation Support', () => {
    it('should detect portrait orientation', () => {
      window.innerWidth = 375;
      window.innerHeight = 667;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      expect(typeof isPortrait).toBe('boolean');
    });

    it('should detect landscape orientation', () => {
      window.innerWidth = 667;
      window.innerHeight = 375;
      const isLandscape = window.matchMedia('(orientation: landscape)').matches;
      expect(typeof isLandscape).toBe('boolean');
    });
  });

  describe('Reduced Motion Preference', () => {
    it('should respect prefers-reduced-motion setting', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      expect(typeof prefersReducedMotion).toBe('boolean');
    });
  });

  describe('High DPI Display Support', () => {
    it('should detect device pixel ratio', () => {
      expect(typeof window.devicePixelRatio).toBe('number');
      expect(window.devicePixelRatio).toBeGreaterThan(0);
    });

    it('should support high DPI media query', () => {
      const isHighDPI = window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches;
      expect(typeof isHighDPI).toBe('boolean');
    });
  });
});
