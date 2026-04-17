# Local Setup Guide - Beyond the Classroom Website

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

To check if you have Node.js installed:
```bash
node --version
npm --version
```

## Step-by-Step Setup

### 1. Navigate to Project Directory

Open your terminal and navigate to the project folder:
```bash
cd /path/to/beyond-classroom-website
```

### 2. Install Dependencies

Install all required packages:
```bash
npm install
```

This will install:
- React 18 + React DOM
- React Router for navigation
- Framer Motion for animations
- React Hook Form for form handling
- Tailwind CSS for styling
- Vite for development and building
- TypeScript and all dev dependencies

**Expected time**: 1-3 minutes depending on your internet connection

### 3. Start Development Server

Run the development server:
```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 4. Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

You should see the Beyond the Classroom website running!

## Available Commands

### Development
```bash
npm run dev          # Start development server (hot reload enabled)
```

### Building
```bash
npm run build        # Build for production (creates dist/ folder)
npm run preview      # Preview production build locally
```

### Testing
```bash
npm run test         # Run all tests once
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Open Vitest UI for interactive testing
npm run test:coverage # Generate test coverage report
```

### Code Quality
```bash
npm run lint         # Check code for linting errors
```

## Project Features

### 🏠 Home Page
- Hero section with background image
- Highlights cards (Grassroots Projects, Leadership Development, Youth Voice)
- Animated impact counters (1000+ lives touched, 50+ workshops, 20+ partners)
- Portfolio grid with category filtering

### ℹ️ About Page
- Mission & Vision statement
- Visual timeline of organization's journey
- Team member profiles with social links

### 📚 Programs Page
- On-Ground Upskilling Projects card
- Leadership Development card
- Call-to-action buttons for each program

### 🎙️ Media Page
- Podcast embeds (Spotify/YouTube)
- Articles grid with thumbnails
- "Read More" hover overlays

### 📧 Contact Page
- Contact form with validation
- Email and location information
- Social media links
- Google Maps embed

## Development Features

### Hot Module Replacement (HMR)
Changes to your code will automatically update in the browser without full page reload.

### Mock API for Contact Form
The development server includes a mock API endpoint at `/api/contact` that:
- Validates form submissions
- Logs submissions to console
- Returns success/error responses
- Simulates real API behavior

When you submit the contact form, check your terminal to see the logged submission.

### Responsive Design
The website is fully responsive. Test it by:
1. Resizing your browser window
2. Using browser DevTools (F12) → Device Toolbar
3. Testing on actual mobile devices

### Accessibility Features
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader support
- ARIA labels
- Focus indicators
- Color contrast compliance

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.)

### Dependencies Installation Fails
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Build Errors
Make sure you're using Node.js 18 or higher:
```bash
node --version
```

### TypeScript Errors
If you see TypeScript errors, try:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Build

To create a production-ready build:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder with:
- Minified JavaScript and CSS
- Code splitting for better caching
- Optimized images
- Source maps removed
- Console logs removed

To test the production build locally:
```bash
npm run preview
```

The production build will be available at `http://localhost:4173`

## Deployment

The `dist/` folder can be deployed to any static hosting service:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **AWS S3**: Upload `dist/` contents to S3 bucket

## File Structure Overview

```
beyond-classroom-website/
├── src/
│   ├── components/          # React components
│   │   ├── common/         # Reusable components
│   │   ├── home/           # Home page components
│   │   ├── about/          # About page components
│   │   ├── programs/       # Programs page components
│   │   ├── media/          # Media page components
│   │   └── contact/        # Contact page components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types
│   ├── data/               # Static content data
│   ├── assets/             # Images, icons
│   ├── styles/             # Global CSS
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static files (copied to dist/)
├── .kiro/                  # Kiro specs and documentation
├── dist/                   # Production build (generated)
├── node_modules/           # Dependencies (generated)
├── package.json            # Project dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Next Steps

1. **Customize Content**: Edit `src/data/content.ts` to update text, metrics, and team information
2. **Add Images**: Place your images in `src/assets/images/` and update component imports
3. **Update Styling**: Modify `tailwind.config.js` for custom colors and design tokens
4. **Configure Contact Form**: Set up a real backend API or email service for form submissions
5. **Add Analytics**: Integrate Google Analytics or similar tracking

## Need Help?

- Check the [README.md](./README.md) for project overview
- Review the [Design Document](./.kiro/specs/beyond-classroom-website/design.md) for architecture details
- See [Requirements](./.kiro/specs/beyond-classroom-website/requirements.md) for feature specifications
- Check [Testing Guide](./TESTING_GUIDE.md) for testing instructions

## Performance Tips

- Images are lazy-loaded below the fold
- Code is split by route for faster initial load
- Tailwind CSS is purged of unused styles in production
- Animations use GPU-accelerated properties (transform, opacity)

Enjoy building with Beyond the Classroom! 🚀
