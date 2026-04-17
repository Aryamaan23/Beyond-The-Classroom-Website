import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { axe } from '../../../test/accessibility.setup';
import Navigation from '../Navigation';

describe('Navigation - Accessibility Tests', () => {
  it('should not have any automatically detectable accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels for mobile menu button', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const menuButton = getByRole('button', { name: /toggle navigation menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-label');
  });

  it('should have keyboard accessible navigation links', () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const links = getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('should have proper semantic HTML structure', () => {
    const { container } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});
