// Central export for all content data
export {
  highlights,
  impactMetrics,
  teamMembers,
  timelineEvents,
  projects,
  articles,
  podcastEpisodes,
  programs,
  missionStatement,
  organizationDescription
} from './content';

// Type definitions for content data
export type ProjectCategory = 'education' | 'women' | 'sustainability' | 'leadership';

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface ImpactMetrics {
  livesTouched: number;
  workshops: number;
  partners: number;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  impactSummary: string;
}

export interface Article {
  title: string;
  thumbnail: string;
  excerpt: string;
  url: string;
  publishDate: string;
}

export interface PodcastEpisode {
  title: string;
  description: string;
  embedUrl: string;
  publishDate: string;
}

export interface Program {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
}
