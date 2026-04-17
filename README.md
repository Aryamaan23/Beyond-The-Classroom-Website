# Beyond the Classroom Website

A modern, responsive web application showcasing Beyond the Classroom's mission, programs, and impact.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Framer Motion** for animations
- **React Hook Form** for form handling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable components (Button, Card, Navigation, Footer)
│   ├── home/         # Home page components
│   ├── about/        # About page components
│   ├── programs/     # Programs page components
│   ├── media/        # Media page components
│   └── contact/      # Contact page components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── assets/           # Static assets (images, icons)
├── styles/           # Global styles
├── App.tsx           # Main app component
└── main.tsx          # Application entry point
```

## Design Tokens

The project uses custom design tokens defined in Tailwind config and CSS variables:

- **Colors**: Primary blue (#2563EB), Secondary yellow (#FCD34D)
- **Typography**: Poppins font family
- **Spacing**: Consistent spacing scale
- **Shadows**: Soft shadow system

## Development

The application follows a component-based architecture with:

- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Performance optimization (lazy loading, code splitting)
- Type-safe development with TypeScript

## License

Private - Beyond the Classroom
