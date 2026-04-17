// Google Drive Dynamic Content Service
// This service automatically fetches content from Google Drive folders

interface GoogleDriveConfig {
  apiKey: string;
  folders: {
    projects: string;
    newsletter: string;
    programs: string;
    team: string;
  };
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink?: string;
  createdTime: string;
  modifiedTime: string;
}

interface ProjectData {
  id: string;
  title: string;
  category: 'education' | 'women' | 'sustainability' | 'leadership';
  image: string;
  impactSummary: string;
  description?: string;
  metrics?: any;
}

interface NewsletterData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  downloadUrl: string;
}

class GoogleDriveService {
  private config: GoogleDriveConfig;
  private baseUrl = 'https://www.googleapis.com/drive/v3';

  constructor(config: GoogleDriveConfig) {
    this.config = config;
  }

  /**
   * Get all files from a specific Google Drive folder
   */
  private async getFolderFiles(folderId: string): Promise<DriveFile[]> {
    try {
      // Check if API key and folder ID are configured
      if (!this.config.apiKey || !folderId) {
        console.warn('Google Drive API key or folder ID not configured');
        return [];
      }

      const url = `${this.baseUrl}/files?q='${folderId}'+in+parents&key=${this.config.apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink,thumbnailLink,createdTime,modifiedTime)`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.status}`);
      }

      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Error fetching folder files:', error);
      return [];
    }
  }

  /**
   * Convert Google Drive file to direct image URL with proxy fallback
   */
  private getDirectImageUrl(fileId: string): string {
    // Get the first fallback URL (CORS proxy)
    return this.getImageUrlWithFallbacks(fileId)[0];
  }

  /**
   * Get fallback image URLs for better reliability
   */
  private getImageUrlWithFallbacks(fileId: string): string[] {
    const googleCdnUrl = `https://lh3.googleusercontent.com/d/${fileId}=w400-h400-c`;
    
    return [
      // Try our own proxy first (most reliable)
      `/api/image-proxy?url=${encodeURIComponent(googleCdnUrl)}`,
      // Try external CORS proxies
      `https://api.allorigins.win/raw?url=${encodeURIComponent(googleCdnUrl)}`,
      `https://cors-anywhere.herokuapp.com/${googleCdnUrl}`,
      // Direct Google URLs (may fail due to CORS)
      googleCdnUrl,
      `https://lh3.googleusercontent.com/d/${fileId}=s400-c`,
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://drive.google.com/uc?id=${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`
    ];
  }

  /**
   * Extract category from filename or folder structure
   */
  private extractCategory(filename: string): 'education' | 'women' | 'sustainability' | 'leadership' {
    const name = filename.toLowerCase();
    if (name.includes('education') || name.includes('digital') || name.includes('career')) return 'education';
    if (name.includes('women') || name.includes('empowerment')) return 'women';
    if (name.includes('sustainability') || name.includes('environment') || name.includes('green')) return 'sustainability';
    return 'leadership'; // default
  }

  /**
   * Generate title from filename
   */
  private generateTitle(filename: string): string {
    return filename
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
  }

  /**
   * Generate impact summary based on category
   */
  private generateImpactSummary(category: string, title: string): string {
    const summaries = {
      education: `Empowering learners through ${title.toLowerCase()} initiatives that build essential skills for the digital age`,
      women: `Creating safe spaces and opportunities for women to build confidence and develop professional skills`,
      sustainability: `Environmental awareness and community-driven initiatives aligned with sustainable development goals`,
      leadership: `Developing the next generation of ethical, resilient leaders through hands-on experience and mentorship`
    };
    return summaries[category as keyof typeof summaries] || 'Making grassroots impact through community-driven programs';
  }

  /**
   * Fetch all projects from Google Drive
   */
  async getProjects(): Promise<ProjectData[]> {
    try {
      const files = await this.getFolderFiles(this.config.folders.projects);
      
      // Filter only image files
      const imageFiles = files.filter(file => 
        file.mimeType.startsWith('image/') && 
        !file.name.toLowerCase().includes('thumb')
      );

      return imageFiles.map((file) => {
        const category = this.extractCategory(file.name);
        const title = this.generateTitle(file.name);
        
        return {
          id: file.id,
          title,
          category,
          image: this.getDirectImageUrl(file.id),
          impactSummary: this.generateImpactSummary(category, title),
          description: `This ${category} initiative represents our commitment to creating meaningful change through community engagement and skill development.`
        };
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  /**
   * Fetch all newsletters from Google Drive
   */
  async getNewsletters(): Promise<NewsletterData[]> {
    try {
      const files = await this.getFolderFiles(this.config.folders.newsletter);
      
      // Separate images and PDFs
      const imageFiles = files.filter(file => file.mimeType.startsWith('image/'));
      const pdfFiles = files.filter(file => file.mimeType === 'application/pdf');

      return imageFiles.map(imageFile => {
        // Try to find matching PDF
        const matchingPdf = pdfFiles.find(pdf => 
          pdf.name.toLowerCase().includes(imageFile.name.toLowerCase().split('.')[0]) ||
          imageFile.name.toLowerCase().includes(pdf.name.toLowerCase().split('.')[0])
        );

        const title = this.generateTitle(imageFile.name);
        const date = this.extractDateFromFilename(imageFile.name) || imageFile.createdTime;

        return {
          id: imageFile.id,
          title: title.includes('Newsletter') ? title : `${title} Newsletter`,
          description: `Monthly highlights and impact stories from Beyond the Classroom's community programs and initiatives.`,
          image: this.getDirectImageUrl(imageFile.id),
          date,
          downloadUrl: matchingPdf ? this.getDirectImageUrl(matchingPdf.id) : '#'
        };
      });
    } catch (error) {
      console.error('Error fetching newsletters:', error);
      return [];
    }
  }

  /**
   * Extract date from filename (supports formats like 2024-01, jan-2024, etc.)
   */
  private extractDateFromFilename(filename: string): string | null {
    const datePatterns = [
      /(\d{4})-(\d{1,2})/,  // 2024-01
      /(\d{1,2})-(\d{4})/,  // 01-2024
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec).*(\d{4})/i,  // jan-2024
      /(\d{4}).*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i   // 2024-jan
    ];

    for (const pattern of datePatterns) {
      const match = filename.match(pattern);
      if (match) {
        if (pattern.source.includes('jan|feb')) {
          // Handle month names
          const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
          const monthIndex = monthNames.findIndex(m => match[1].toLowerCase().includes(m) || match[2].toLowerCase().includes(m));
          const year = match.find(m => m.length === 4);
          if (monthIndex >= 0 && year) {
            return `${year}-${String(monthIndex + 1).padStart(2, '0')}-15`;
          }
        } else {
          // Handle numeric dates
          const year = match.find(m => m.length === 4);
          const month = match.find(m => m.length <= 2 && m !== year);
          if (year && month) {
            return `${year}-${month.padStart(2, '0')}-15`;
          }
        }
      }
    }
    return null;
  }

  /**
   * Fetch programs data
   */
  async getPrograms(): Promise<any[]> {
    try {
      const files = await this.getFolderFiles(this.config.folders.programs);
      const imageFiles = files.filter(file => file.mimeType.startsWith('image/'));

      return imageFiles.map(file => ({
        title: this.generateTitle(file.name),
        description: `Comprehensive program designed to empower participants with practical skills and knowledge for personal and professional growth.`,
        image: this.getDirectImageUrl(file.id),
        ctaText: 'Learn More',
        ctaLink: '/contact',
        features: [
          'Hands-on workshops and training',
          'Expert mentorship and guidance',
          'Community networking opportunities',
          'Practical skill development',
          'Certificate of completion'
        ]
      }));
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }

  /**
   * Fetch team data
   */
  async getTeam(): Promise<any[]> {
    try {
      console.log('🔍 Fetching team data from Google Drive...');
      const files = await this.getFolderFiles(this.config.folders.team);
      console.log('📁 Raw files from team folder:', files);
      
      const imageFiles = files.filter(file => file.mimeType.startsWith('image/'));
      console.log('🖼️ Filtered image files:', imageFiles);

      const teamMembers = imageFiles.map((file, index) => {
        const member = {
          name: this.generateTitle(file.name),
          role: this.generateRole(file.name, index),
          photo: this.getDirectImageUrl(file.id),
          socialLinks: {
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com'
          }
        };
        console.log(`👤 Generated team member:`, member);
        return member;
      });

      console.log('✅ Final team data:', teamMembers);
      return teamMembers;
    } catch (error) {
      console.error('❌ Error fetching team:', error);
      return [];
    }
  }

  /**
   * Generate role based on filename or index
   */
  private generateRole(filename: string, index: number): string {
    const name = filename.toLowerCase();
    if (name.includes('founder') || name.includes('director')) return 'Founder & Director';
    if (name.includes('manager') || name.includes('program')) return 'Program Manager';
    if (name.includes('lead') || name.includes('community')) return 'Community Lead';
    if (name.includes('coordinator')) return 'Partnerships Coordinator';
    
    const roles = ['Program Manager', 'Community Lead', 'Partnerships Coordinator', 'Communications Lead'];
    return roles[index % roles.length];
  }
}

// Configuration - these folder IDs need to be set up
const driveConfig: GoogleDriveConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || '',
  folders: {
    projects: import.meta.env.VITE_GOOGLE_DRIVE_PROJECTS_FOLDER || '',
    newsletter: import.meta.env.VITE_GOOGLE_DRIVE_NEWSLETTER_FOLDER || '',
    programs: import.meta.env.VITE_GOOGLE_DRIVE_PROGRAMS_FOLDER || '',
    team: import.meta.env.VITE_GOOGLE_DRIVE_TEAM_FOLDER || ''
  }
};

// Export singleton instance
export const googleDriveService = new GoogleDriveService(driveConfig);

// Export individual functions for easy use
export const {
  getProjects,
  getNewsletters,
  getPrograms,
  getTeam
} = googleDriveService;