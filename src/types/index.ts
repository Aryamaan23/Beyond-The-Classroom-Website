// Common types for the application

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface NavigationProps {
  currentPath: string;
}

export interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'education' | 'women' | 'sustainability' | 'leadership';
  image: string;
  impactSummary: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
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

export interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
}

export interface Article {
  title: string;
  thumbnail: string;
  excerpt: string;
  url: string;
  publishDate: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterSignupData {
  email: string;
  name?: string;
}

export interface ContactSubmission extends ContactFormData {
  timestamp: Date;
  userAgent: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  studentName: string;
  program: string;
  summary: string;
  submittedAt: string;
  fileId: string;
  fileUrl: string;
  fileName: string;
  attachments?: CaseStudyAttachment[];
}

export interface CaseStudyAttachment {
  id: string;
  name: string;
  url: string;
  mimeType: string;
}
