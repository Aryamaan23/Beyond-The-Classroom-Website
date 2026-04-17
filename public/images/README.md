# Image Assets Guide

This directory contains all image assets for the Beyond the Classroom website.

## Image Optimization Requirements

All images should follow these guidelines:
- **Format**: WebP (with JPEG/PNG fallback for older browsers)
- **Size**: Compressed to under 200KB per image
- **Quality**: Balance between file size and visual quality (typically 80-85% quality)

## Image Dimensions

### Hero Background
- **Path**: `/images/hero-bg.jpg`
- **Dimensions**: 1920x1080px
- **Usage**: Full-width hero section background

### Team Photos
- **Path**: `/images/team/member-*.jpg`
- **Dimensions**: 400x400px (square)
- **Usage**: Team member profile cards

### Project Images
- **Path**: `/images/projects/project-*.jpg`
- **Dimensions**: 800x600px (4:3 ratio)
- **Usage**: Portfolio grid cards

### Program Images
- **Path**: `/images/programs/*.jpg`
- **Dimensions**: 1200x800px (3:2 ratio)
- **Usage**: Program cards on Programs page

### Timeline Images
- **Path**: `/images/timeline/event-*.jpg`
- **Dimensions**: 600x400px (3:2 ratio)
- **Usage**: Timeline milestone images

### Media/Article Thumbnails
- **Path**: `/images/media/article-*.jpg`
- **Dimensions**: 600x400px (3:2 ratio)
- **Usage**: Article grid thumbnails

## Optimization Tools

Recommended tools for image optimization:
- **Squoosh**: https://squoosh.app/ (web-based)
- **ImageOptim**: https://imageoptim.com/ (Mac)
- **TinyPNG**: https://tinypng.com/ (web-based)
- **Sharp**: npm package for automated optimization

## Converting to WebP

Using Sharp (Node.js):
```bash
npm install sharp
```

```javascript
const sharp = require('sharp');

sharp('input.jpg')
  .webp({ quality: 80 })
  .toFile('output.webp');
```

## Responsive Images

When implementing, use responsive image techniques:

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```

Or with React:
```jsx
<img 
  src="/images/hero-bg.jpg"
  srcSet="/images/hero-bg-800.jpg 800w, /images/hero-bg-1200.jpg 1200w, /images/hero-bg-1920.jpg 1920w"
  sizes="100vw"
  alt="Hero background"
/>
```

## Current Status

All placeholder files have been created with comments indicating:
- Recommended dimensions
- Format requirements
- File size limits

Replace these placeholder files with actual optimized images before deployment.
