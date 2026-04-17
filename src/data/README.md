# Content Data Documentation

This directory contains all static content data for the Beyond the Classroom website.

## Usage

Import the content data in your components:

```typescript
import { 
  highlights, 
  impactMetrics, 
  projects,
  teamMembers,
  articles 
} from '@/data';
```

Or import specific items:

```typescript
import { highlights } from '@/data/content';
```

## Available Data

### Highlights
Three key program areas displayed on the home page:
- Grassroots Projects
- Leadership Development
- Youth Voice

### Impact Metrics
Numerical statistics for the impact snapshot:
- Lives Touched: 1000+
- Workshops: 50+
- Partners: 20+

### Team Members
Array of team member profiles with:
- Name
- Role
- Photo path
- Social media links (LinkedIn, Twitter, Instagram)

### Timeline Events
Organization history milestones with:
- Date
- Title
- Description
- Image path

### Projects
Portfolio of past projects with:
- ID
- Title
- Category (education, women, sustainability, leadership)
- Image path
- Impact summary

### Articles
Media coverage and articles with:
- Title
- Thumbnail path
- Excerpt
- External URL
- Publish date

### Podcast Episodes
Podcast content with:
- Title
- Description
- Embed URL (Spotify/YouTube)
- Publish date

### Programs
Two main program offerings:
- On-Ground Upskilling Projects
- Leadership Development

Each includes:
- Title
- Description
- Image path
- CTA text and link
- Features list

### Mission & Description
- `missionStatement`: Organization's mission statement
- `organizationDescription`: Brief description of the organization

## Example Component Usage

```typescript
import { projects } from '@/data';
import { useState } from 'react';

function PortfolioSection() {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);
  
  return (
    <div>
      {filteredProjects.map(project => (
        <div key={project.id}>
          <img src={project.image} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.impactSummary}</p>
        </div>
      ))}
    </div>
  );
}
```

## Updating Content

To update content:
1. Edit `src/data/content.ts`
2. Ensure TypeScript types match in `src/data/index.ts`
3. Update corresponding images in `public/images/` if needed

## Type Safety

All content data is fully typed. Import types from the index:

```typescript
import type { Project, TeamMember, Article } from '@/data';
```
