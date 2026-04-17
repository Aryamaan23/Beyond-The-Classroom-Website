# Implementation Plan

- [x] 1. Initialize project and setup development environment
  - Create new Vite + React + TypeScript project
  - Install dependencies: React Router, Tailwind CSS, Framer Motion, React Hook Form
  - Configure Tailwind CSS with custom design tokens (colors, fonts, spacing)
  - Setup project folder structure (components, pages, hooks, types, assets, styles)
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 2. Create common reusable components
  - [x] 2.1 Implement Button component with variants (primary, secondary, outline) and sizes
    - Create TypeScript interface for ButtonProps
    - Implement styling with Tailwind classes for each variant
    - Add hover and focus states
    - Support both button and link (anchor) rendering
    - _Requirements: 1.4, 4.5, 4.6, 6.3_
  
  - [x] 2.2 Implement Card component with flexible content slots
    - Create TypeScript interface for CardProps
    - Implement base card styling with shadows and rounded corners
    - Add hover animation (scale and shadow increase)
    - Support optional image, icon, title, and description
    - _Requirements: 1.5, 4.2, 7.3, 10.2, 10.3_
  
  - [x] 2.3 Implement Navigation component with responsive menu
    - Create desktop horizontal navigation with logo and links
    - Implement mobile hamburger menu with slide-in drawer
    - Add active link highlighting based on current route
    - Ensure keyboard accessibility (Tab navigation, Escape to close)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [x] 2.4 Implement Footer component with social links and copyright
    - Display organization name and tagline
    - Add social media icon links
    - Include copyright text
    - _Requirements: 6.4_

- [x] 3. Setup routing and page structure
  - Configure React Router with routes for Home, About, Programs, Media, Contact
  - Create page components with basic layout structure
  - Implement scroll-to-top behavior on route changes
  - Add 404 Not Found page with navigation back to home
  - _Requirements: 8.1, 8.4_

- [x] 4. Implement Home page components
  - [x] 4.1 Create HeroSection component
    - Implement full-width background image with overlay
    - Add tagline and subtext with responsive typography
    - Create two CTA buttons ("Join the Movement", "View Programs")
    - Ensure text readability over background image
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 4.2 Create HighlightsSection component
    - Implement three-column grid (responsive to single column on mobile)
    - Create highlight cards with icons for Grassroots Projects, Leadership Development, Youth Voice
    - Add descriptions for each highlight
    - Implement hover lift animation
    - _Requirements: 1.5_
  
  - [x] 4.3 Create ImpactSnapshot component with animated counters
    - Implement useCounterAnimation custom hook
    - Create counter displays for "1000+ lives touched", "50+ workshops", "20+ partners"
    - Add Intersection Observer to trigger animation when section enters viewport
    - Implement video embed or image carousel placeholder
    - Create two-column layout (counters left, media right, responsive)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [x] 4.4 Create PortfolioSection component with filtering
    - Implement project grid layout (6-8 cards, responsive)
    - Create filter buttons for categories (All, Education, Women, Sustainability, Leadership)
    - Add filter logic to show/hide projects based on selected category
    - Implement hover overlay with "View Details" text
    - Add smooth transitions when filtering
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 5. Implement About page components
  - [x] 5.1 Create MissionVision component
    - Display organization logo
    - Show mission statement with prominent typography
    - Add organization description text
    - Implement centered layout with background accent
    - _Requirements: 3.2, 3.5_
  
  - [x] 5.2 Create Timeline component
    - Implement vertical timeline layout with alternating content
    - Create milestone markers with dates
    - Add images for each timeline event
    - Make responsive (vertical-only on mobile)
    - _Requirements: 3.3_
  
  - [x] 5.3 Create TeamSection component
    - Implement grid layout for team member cards (3-4 columns, responsive)
    - Display photo, name, and role for each member
    - Add social media links (LinkedIn, Twitter, Instagram)
    - Implement hover effect to reveal social icons
    - _Requirements: 3.4_

- [x] 6. Implement Programs page
  - [x] 6.1 Create ProgramCard component
    - Implement vertical card layout with image at top
    - Add program title, description, and features list
    - Include CTA button at bottom
    - Make responsive for mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 6.2 Create Programs page layout with two program cards
    - Add "On-Ground Upskilling Projects" card with "Join a Project" button
    - Add "Leadership Development" card with "Apply for Fellowship" button
    - Ensure proper spacing and alignment
    - _Requirements: 4.5, 4.6_

- [x] 7. Implement Media page components
  - [x] 7.1 Create PodcastEmbed component
    - Implement responsive iframe for Spotify/YouTube embeds
    - Add episode title and description
    - Create podcast section with episode listings
    - _Requirements: 5.2, 5.5_
  
  - [x] 7.2 Create ArticleGrid component
    - Implement grid layout with article thumbnails
    - Add "Read More" overlay on hover
    - Implement lazy loading for images
    - Handle external links properly
    - _Requirements: 5.1, 5.3, 5.4_

- [x] 8. Implement Contact page components
  - [x] 8.1 Create ContactForm component with validation
    - Implement form with Name, Email, and Message fields
    - Add validation rules (required fields, email format, minimum lengths)
    - Display inline error messages below fields
    - Show success message after submission
    - Add loading state during submission
    - _Requirements: 6.1, 6.6_
  
  - [x] 8.2 Create ContactInfo component
    - Display email address with mailto link
    - Add location text (Delhi NCR)
    - Create social media icon links (Instagram, LinkedIn, X, YouTube)
    - Embed Google Map for Delhi NCR region
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 9. Implement responsive design and mobile optimization
  - Add responsive breakpoints (mobile: <768px, tablet: 768-1023px, desktop: 1024px+)
  - Ensure all layouts adapt to single-column on mobile
  - Test all interactive elements on touch devices
  - Verify text readability at all screen sizes
  - Maintain visual hierarchy and spacing across breakpoints
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 10. Implement animations and transitions
  - Add smooth page transitions (fade in, 300ms)
  - Implement hover effects for cards (scale 1.02-1.05, shadow increase)
  - Add button hover animations (darken color)
  - Ensure counter animations work smoothly
  - Test all animations for performance (60fps)
  - _Requirements: 10.3_

- [x] 11. Add static content and assets
  - Create content data files (highlights, impact metrics, team members, projects, articles)
  - Add placeholder images for hero, team, projects, and programs
  - Include organization logo and icons
  - Optimize all images (WebP format, compress to <200KB)
  - _Requirements: 1.2, 1.3, 1.5, 2.2, 3.2, 3.3, 3.4, 4.3, 4.4, 7.2, 7.3_

- [x] 12. Implement accessibility features
  - Ensure all interactive elements are keyboard accessible (Tab, Enter, Escape)
  - Add ARIA labels for icon-only buttons
  - Verify proper heading hierarchy on all pages
  - Add alt text for all images
  - Test color contrast ratios (minimum 4.5:1)
  - Add visible focus indicators (2px solid outline)
  - Implement skip-to-main-content link
  - _Requirements: 8.4, 9.4_

- [x] 13. Setup form submission handling
  - Create API endpoint or serverless function for contact form
  - Implement form submission logic with error handling
  - Add email notification service integration
  - Test form submission with valid and invalid data
  - _Requirements: 6.6_

- [x] 14. Performance optimization
  - Implement lazy loading for below-fold images
  - Add code splitting by route using React.lazy()
  - Optimize bundle size (target <300KB gzipped)
  - Configure caching headers for static assets
  - Test Lighthouse scores (target >90 for all categories)
  - _Requirements: 9.3_

- [-] 15. Testing and quality assurance
  - [x] 15.1 Write component tests
    - Test Button component rendering and interactions
    - Test Card component with different props
    - Test ContactForm validation and submission
    - Test Navigation component menu behavior
    - Test counter animation hook
  
  - [x] 15.2 Perform accessibility testing
    - Run axe-core automated tests
    - Perform manual keyboard navigation testing
    - Test with screen reader (VoiceOver or NVDA)
    - Verify WCAG 2.1 AA compliance
  
  - [x] 15.3 Cross-browser and device testing
    - Test on Chrome, Firefox, Safari, Edge
    - Test on iOS and Android devices
    - Verify responsive behavior at all breakpoints
    - Test form submission on different browsers
