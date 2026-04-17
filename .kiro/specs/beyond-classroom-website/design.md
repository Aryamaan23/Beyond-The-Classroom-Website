# Design Document

## Overview

The Beyond the Classroom website is a modern, responsive web application built to showcase the organization's mission, programs, and impact. The design emphasizes accessibility, visual appeal, and user engagement through a clean, modular interface that balances youthful energy with professional credibility.

### Technology Stack

- **Frontend Framework**: React with TypeScript for type safety and component reusability
- **Styling**: Tailwind CSS for utility-first styling and responsive design
- **Animations**: Framer Motion for smooth transitions and counter animations
- **Routing**: React Router for client-side navigation
- **Form Handling**: React Hook Form with validation
- **Build Tool**: Vite for fast development and optimized production builds

### Design Principles

1. **Mobile-First**: Design and develop for mobile devices first, then scale up
2. **Accessibility**: WCAG 2.1 AA compliance for inclusive user experience
3. **Performance**: Optimize images, lazy load content, minimize bundle size
4. **Modularity**: Reusable components with consistent props and styling
5. **Progressive Enhancement**: Core functionality works without JavaScript

## Architecture

### Application Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── HighlightsSection.tsx
│   │   ├── ImpactSnapshot.tsx
│   │   └── PortfolioSection.tsx
│   ├── about/
│   │   ├── MissionVision.tsx
│   │   ├── Timeline.tsx
│   │   └── TeamSection.tsx
│   ├── programs/
│   │   └── ProgramCard.tsx
│   ├── media/
│   │   ├── PodcastEmbed.tsx
│   │   └── ArticleGrid.tsx
│   └── contact/
│       ├── ContactForm.tsx
│       └── ContactInfo.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Programs.tsx
│   ├── Media.tsx
│   └── Contact.tsx
├── hooks/
│   ├── useCounterAnimation.ts
│   └── useIntersectionObserver.ts
├── types/
│   └── index.ts
├── assets/
│   ├── images/
│   └── icons/
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

### Routing Structure

- `/` - Home page
- `/about` - About page
- `/programs` - Programs page
- `/media` - Media page
- `/contact` - Contact page

## Components and Interfaces

### Common Components

#### Navigation Component

**Purpose**: Provides consistent navigation across all pages with responsive mobile menu.

**Props**:
```typescript
interface NavigationProps {
  currentPath: string;
}
```

**Features**:
- Desktop: Horizontal menu with logo on left, links on right
- Mobile: Hamburger menu with slide-in drawer
- Active link highlighting
- Smooth scroll to top on navigation

#### Button Component

**Purpose**: Reusable button with consistent styling and variants.

**Props**:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}
```

**Variants**:
- Primary: Blue background (#2563EB), white text
- Secondary: Yellow background (#FCD34D), dark text
- Outline: Transparent background, border, hover fill

#### Card Component

**Purpose**: Flexible container for content with consistent styling.

**Props**:
```typescript
interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

### Home Page Components

#### HeroSection Component

**Purpose**: Full-width hero banner with background image and CTAs.

**Features**:
- Background image with overlay for text readability
- Centered content with tagline and subtext
- Two CTA buttons with hover animations
- Responsive text sizing

**Layout**:
```
┌─────────────────────────────────────┐
│   [Background Image with Overlay]   │
│                                     │
│        Main Tagline (Large)         │
│         Subtext (Medium)            │
│                                     │
│   [Join Button] [View Programs]     │
│                                     │
└─────────────────────────────────────┘
```

#### HighlightsSection Component

**Purpose**: Display three key program areas with icons.

**Features**:
- Three-column grid (responsive to single column on mobile)
- Icon, title, and description for each highlight
- Hover effect with subtle lift animation

**Data Structure**:
```typescript
interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}
```

#### ImpactSnapshot Component

**Purpose**: Showcase organizational metrics with animated counters.

**Features**:
- Animated number counters using Intersection Observer
- Video embed or image carousel
- Two-column layout (counters left, media right)
- Counter animation triggers when section enters viewport

**Counter Hook**:
```typescript
const useCounterAnimation = (
  end: number,
  duration: number = 2000
): number => {
  // Animates from 0 to end value over duration
}
```

#### PortfolioSection Component

**Purpose**: Grid display of past projects with category filtering.

**Features**:
- Filter buttons for categories (All, Education, Women, Sustainability, Leadership)
- 6-8 project cards in responsive grid
- Hover overlay with "View Details" text
- Smooth filter transitions

**Data Structure**:
```typescript
interface Project {
  id: string;
  title: string;
  category: 'education' | 'women' | 'sustainability' | 'leadership';
  image: string;
  impactSummary: string;
}
```

### About Page Components

#### MissionVision Component

**Purpose**: Display organization's mission and vision statement.

**Features**:
- Large, centered text with organization logo
- Two-section layout for mission and vision
- Background accent color for visual interest

#### Timeline Component

**Purpose**: Visual representation of organization's journey.

**Features**:
- Vertical timeline with alternating left/right content
- Milestone markers with dates
- Images for each milestone
- Responsive to vertical-only layout on mobile

**Data Structure**:
```typescript
interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}
```

#### TeamSection Component

**Purpose**: Display team member profiles.

**Features**:
- Grid of profile cards (3-4 columns, responsive)
- Photo, name, role, and social links for each member
- Hover effect revealing social media icons

**Data Structure**:
```typescript
interface TeamMember {
  name: string;
  role: string;
  photo: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
```

### Programs Page Components

#### ProgramCard Component

**Purpose**: Display program information with image and CTA.

**Props**:
```typescript
interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
}
```

**Layout**:
- Two large vertical cards
- Image at top, content below
- Feature list with checkmarks
- CTA button at bottom

### Media Page Components

#### PodcastEmbed Component

**Purpose**: Embed podcast episodes from Spotify/YouTube.

**Features**:
- Responsive iframe embed
- Episode title and description
- Platform-specific styling

#### ArticleGrid Component

**Purpose**: Display media coverage and articles.

**Features**:
- Grid layout with thumbnail images
- "Read More" overlay on hover
- External link handling
- Lazy loading for images

**Data Structure**:
```typescript
interface Article {
  title: string;
  thumbnail: string;
  excerpt: string;
  url: string;
  publishDate: string;
}
```

### Contact Page Components

#### ContactForm Component

**Purpose**: Allow users to submit inquiries.

**Features**:
- Form validation (required fields, email format)
- Error messages below fields
- Success message on submission
- Loading state during submission

**Validation Rules**:
- Name: Required, min 2 characters
- Email: Required, valid email format
- Message: Required, min 10 characters

**Form Handling**:
```typescript
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const onSubmit = async (data: ContactFormData) => {
  // Send to backend API or email service
}
```

#### ContactInfo Component

**Purpose**: Display contact details and social links.

**Features**:
- Email address with mailto link
- Location text
- Social media icon links
- Embedded Google Map

## Data Models

### Static Content

Most content will be stored as static data in TypeScript files for easy updates:

```typescript
// src/data/content.ts

export const highlights = [
  {
    icon: 'globe',
    title: 'Grassroots Projects',
    description: 'Monthly community impact drives'
  },
  // ...
];

export const impactMetrics = {
  livesTouched: 1000,
  workshops: 50,
  partners: 20
};

export const teamMembers = [
  {
    name: '[Name]',
    role: '[Role]',
    photo: '/images/team/[photo].jpg',
    socialLinks: { /* ... */ }
  },
  // ...
];

export const projects = [
  {
    id: '1',
    title: '[Project Title]',
    category: 'education',
    image: '/images/projects/[image].jpg',
    impactSummary: '[One-line summary]'
  },
  // ...
];
```

### Form Submission

Contact form submissions will be handled via a serverless function or email service:

```typescript
interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  userAgent: string;
}
```

## Error Handling

### Form Validation Errors

- Display inline error messages below form fields
- Highlight invalid fields with red border
- Prevent submission until all validations pass
- Clear errors when user corrects input

### Network Errors

- Show user-friendly error messages for failed submissions
- Provide retry mechanism
- Log errors to console for debugging

### 404 Handling

- Create NotFound component for invalid routes
- Provide navigation back to home page
- Maintain consistent layout with navigation

### Image Loading Errors

- Provide fallback placeholder images
- Use alt text for accessibility
- Lazy load images below the fold

## Testing Strategy

### Component Testing

**Tools**: Vitest + React Testing Library

**Focus Areas**:
- Component rendering with different props
- User interactions (clicks, form inputs)
- Conditional rendering logic
- Accessibility attributes

**Example Test Cases**:
```typescript
describe('Button Component', () => {
  it('renders with correct variant styles', () => {});
  it('calls onClick handler when clicked', () => {});
  it('renders as link when href provided', () => {});
});

describe('ContactForm Component', () => {
  it('displays validation errors for invalid inputs', () => {});
  it('submits form with valid data', () => {});
  it('shows success message after submission', () => {});
});
```

### Integration Testing

**Focus Areas**:
- Navigation between pages
- Form submission flow
- Filter functionality in portfolio
- Counter animations triggering

### Accessibility Testing

**Tools**: axe-core, manual keyboard testing

**Checklist**:
- All interactive elements keyboard accessible
- Proper heading hierarchy
- Alt text for images
- ARIA labels where needed
- Color contrast ratios meet WCAG AA
- Focus indicators visible

### Performance Testing

**Metrics**:
- Lighthouse score > 90 for all categories
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Total bundle size < 300KB (gzipped)

**Optimization Strategies**:
- Image optimization (WebP format, responsive sizes)
- Code splitting by route
- Lazy loading for below-fold content
- Minimize third-party scripts

## Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles: 320px - 767px (mobile) */

/* Tablet: 768px - 1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px - 1279px */
@media (min-width: 1024px) { }

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) { }
```

### Layout Adjustments

**Mobile (< 768px)**:
- Single column layouts
- Stacked navigation (hamburger menu)
- Full-width cards
- Reduced padding/margins

**Tablet (768px - 1023px)**:
- Two-column grids
- Horizontal navigation
- Moderate spacing

**Desktop (1024px+)**:
- Three-column grids
- Maximum content width: 1280px
- Generous spacing
- Hover effects enabled

## Design Tokens

### Colors

```css
:root {
  /* Primary */
  --color-primary: #2563EB;
  --color-primary-dark: #1E40AF;
  
  /* Secondary */
  --color-secondary: #FCD34D;
  --color-secondary-dark: #F59E0B;
  
  /* Neutral */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  
  /* Semantic */
  --color-success: #10B981;
  --color-error: #EF4444;
}
```

### Typography

```css
:root {
  --font-family: 'Poppins', sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Spacing

```css
:root {
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## Animation Guidelines

### Transitions

- Duration: 200-300ms for most interactions
- Easing: ease-in-out for smooth feel
- Properties: transform, opacity (GPU-accelerated)

### Counter Animations

- Duration: 2000ms
- Easing: ease-out
- Trigger: When element enters viewport (Intersection Observer)

### Page Transitions

- Fade in new page content
- Duration: 300ms
- Maintain scroll position on navigation

### Hover Effects

- Scale: 1.02-1.05 for cards
- Shadow: Increase shadow on hover
- Color: Darken buttons slightly

## Accessibility Considerations

### Keyboard Navigation

- All interactive elements focusable via Tab
- Skip to main content link
- Escape key closes mobile menu
- Enter/Space activates buttons

### Screen Readers

- Semantic HTML elements (nav, main, article, etc.)
- ARIA labels for icon-only buttons
- Alt text for all images
- Form labels properly associated

### Visual Accessibility

- Minimum font size: 16px
- Color contrast ratio: 4.5:1 for text
- Focus indicators: 2px solid outline
- No information conveyed by color alone

## Performance Optimization

### Image Strategy

- Use WebP format with JPEG fallback
- Responsive images with srcset
- Lazy load images below fold
- Compress images to < 200KB each

### Code Splitting

- Split by route using React.lazy()
- Separate vendor bundle
- Preload critical routes

### Caching Strategy

- Static assets: Cache for 1 year
- HTML: No cache (or short cache with revalidation)
- API responses: Cache based on content type

### Third-Party Scripts

- Defer non-critical scripts
- Use facade pattern for embeds (load on interaction)
- Minimize external dependencies
