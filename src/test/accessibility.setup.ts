import { configureAxe } from 'jest-axe';

/**
 * Configure axe-core for accessibility testing
 * This setup ensures consistent accessibility testing across all components
 */
export const axe = configureAxe({
  rules: {
    // Ensure WCAG 2.1 AA compliance
    'color-contrast': { enabled: true },
    'valid-lang': { enabled: true },
    'html-has-lang': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
  },
});
