import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { axe } from '../../test/accessibility.setup';
import Home from '../Home';

describe('Home Page - Accessibility Tests', () => {
  it('should not have any automatically detectable accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have a main landmark', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('should have proper heading hierarchy', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
  });

  it('should have alt text for all images', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });
});
