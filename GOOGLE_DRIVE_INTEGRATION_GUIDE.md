# Google Drive Integration Guide

This guide explains how to integrate Google Drive with your Beyond the Classroom website for dynamic content management.

## 🎯 **Your Implementation Plan**

### ✅ **What We've Built:**
1. **Project Navigation** - Next/Previous arrows in project modals
2. **Newsletter Section** - Grid layout with modal previews
3. **Placeholder System** - Ready for Google Drive data
4. **Dynamic Content Structure** - Easy to update from external sources

---

## 📁 **Google Drive Setup**

### **Step 1: Organize Your Google Drive**

Create this folder structure in Google Drive:

```
Beyond the Classroom - Website Content/
├── Projects/
│   ├── Education/
│   │   ├── digital-literacy-clinic.jpg
│   │   ├── career-readiness-bootcamp.jpg
│   │   └── project-data.json
│   ├── Women/
│   │   ├── women-empowerment-program.jpg
│   │   └── project-data.json
│   ├── Sustainability/
│   │   ├── sustainability-drives.jpg
│   │   └── project-data.json
│   └── Leadership/
│       ├── youth-leadership-circles.jpg
│       ├── communication-skills.jpg
│       └── project-data.json
├── Programs/
│   ├── upskilling-workshops.jpg
│   ├── leadership-development.jpg
│   └── programs-data.json
├── Newsletter/
│   ├── 2024-01-newsletter.jpg
│   ├── 2024-02-newsletter.jpg
│   ├── 2024-03-newsletter.jpg
│   ├── 2024-04-newsletter.jpg
│   ├── newsletter-pdfs/
│   │   ├── 2024-01-newsletter.pdf
│   │   ├── 2024-02-newsletter.pdf
│   │   └── ...
│   └── newsletter-data.json
└── Team/
    ├── team-member-1.jpg
    ├── team-member-2.jpg
    └── team-data.json
```

### **Step 2: Create Data Files**

#### **Projects Data (project-data.json)**
```json
{
  "education": [
    {
      "id": "1",
      "title": "Digital Literacy Clinic",
      "category": "education",
      "image": "https://drive.google.com/uc?id=YOUR_IMAGE_FILE_ID",
      "impactSummary": "Teaching essential computer skills, online safety, and digital tools to first-generation learners",
      "description": "Detailed description of the project...",
      "objectives": [
        "Improve digital literacy rates",
        "Provide hands-on training",
        "Bridge the digital divide"
      ],
      "metrics": {
        "participants": 500,
        "sessions": 50,
        "successRate": "85%"
      },
      "testimonials": [
        {
          "name": "Priya Sharma",
          "quote": "Before the clinic, I was afraid to touch a computer..."
        }
      ]
    }
  ]
}
```

#### **Newsletter Data (newsletter-data.json)**
```json
{
  "newsletters": [
    {
      "id": "1",
      "title": "Monthly Impact Report - January 2024",
      "description": "Highlights from our digital literacy workshops and community outreach programs.",
      "image": "https://drive.google.com/uc?id=YOUR_IMAGE_FILE_ID",
      "date": "2024-01-15",
      "downloadUrl": "https://drive.google.com/uc?id=YOUR_PDF_FILE_ID"
    }
  ]
}
```

---

## 🔗 **Google Drive API Integration**

### **Option 1: Simple Public Links (Recommended for Start)**

1. **Make files public**:
   - Right-click file → Share → Change to "Anyone with the link"
   - Copy the sharing link

2. **Convert to direct links**:
   - Original: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
   - Direct: `https://drive.google.com/uc?id=FILE_ID`

3. **Update your content.ts**:
```typescript
export const projects = [
  {
    id: '1',
    title: 'Digital Literacy Clinic',
    category: 'education' as const,
    image: 'https://drive.google.com/uc?id=1ABC123XYZ', // Your Google Drive image
    impactSummary: 'Teaching essential computer skills...'
  }
];
```

### **Option 2: Google Drive API (Advanced)**

1. **Enable Google Drive API**:
   - Go to Google Cloud Console
   - Create new project or select existing
   - Enable Google Drive API
   - Create credentials (API key)

2. **Install Google APIs**:
```bash
npm install googleapis
```

3. **Create Drive Service**:
```typescript
// src/services/googleDriveService.ts
import { google } from 'googleapis';

const drive = google.drive({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY
});

export async function getProjectData() {
  try {
    const response = await drive.files.get({
      fileId: 'YOUR_PROJECT_DATA_FILE_ID',
      alt: 'media'
    });
    return JSON.parse(response.data as string);
  } catch (error) {
    console.error('Error fetching project data:', error);
    return null;
  }
}
```

---

## 🖼️ **Image Management**

### **Image Requirements**
- **Projects**: 800x600px, JPG/PNG
- **Newsletter**: 400x300px for thumbnails
- **Team**: 400x400px, professional headshots
- **Programs**: 800x600px, action shots

### **Image Optimization Tips**
1. **Compress images** before uploading (use TinyPNG)
2. **Use consistent naming** (project-name-category.jpg)
3. **Maintain aspect ratios** for consistent layout
4. **Test loading speeds** with Google Drive links

---

## 📝 **Content Update Workflow**

### **For Content Team:**

1. **Upload new images** to appropriate Google Drive folders
2. **Update JSON data files** with new content
3. **Get shareable links** for new images
4. **Test links** to ensure they work
5. **Notify development team** of updates

### **For Development Team:**

1. **Pull latest data** from Google Drive
2. **Update content.ts** with new links and data
3. **Test website** with new content
4. **Deploy updates** to production

---

## 🔄 **Automatic Updates (Future Enhancement)**

### **Option 1: Webhook Integration**
- Set up Google Drive webhooks
- Automatically update website when files change
- Requires server-side implementation

### **Option 2: Scheduled Updates**
- Run daily/weekly scripts to fetch latest data
- Update content files automatically
- Deploy changes via CI/CD pipeline

### **Option 3: CMS Integration**
- Use headless CMS (Strapi, Contentful)
- Sync with Google Drive
- Provide admin interface for content updates

---

## 🎨 **Current Implementation**

### **Projects Section Features:**
- ✅ **Navigation arrows** - Browse through projects
- ✅ **Project counter** - "1 of 6 projects"
- ✅ **Category filtering** - Filter by Education, Women, etc.
- ✅ **Modal details** - Full project information
- ✅ **Responsive design** - Works on all devices

### **Newsletter Section Features:**
- ✅ **Grid layout** - 4 newsletters per row
- ✅ **Date badges** - Month/year display
- ✅ **Modal preview** - Full newsletter details
- ✅ **Download links** - Direct PDF downloads
- ✅ **Subscription CTA** - Links to contact form

---

## 📋 **Content Team Checklist**

### **For Projects:**
- [ ] High-quality project images (800x600px)
- [ ] Compelling project titles (max 50 characters)
- [ ] Impact summaries (max 150 characters)
- [ ] Detailed descriptions (200-300 words)
- [ ] Success metrics and numbers
- [ ] Testimonials and quotes

### **For Newsletter:**
- [ ] Newsletter cover images (400x300px)
- [ ] PDF files of newsletters
- [ ] Descriptive titles and summaries
- [ ] Publication dates
- [ ] Consistent branding and design

### **For Programs:**
- [ ] Program images showing activities
- [ ] Clear program descriptions
- [ ] Feature lists and benefits
- [ ] Call-to-action text

---

## 🚀 **Next Steps**

1. **Set up Google Drive folders** with the structure above
2. **Upload your content** (images, PDFs, data files)
3. **Get shareable links** for all files
4. **Update the website** with your Google Drive links
5. **Test everything** to ensure it works
6. **Train your content team** on the update process

---

## 💡 **Benefits of This Approach**

### **For Content Team:**
- ✅ **Easy updates** - Just upload to Google Drive
- ✅ **No technical skills** required
- ✅ **Familiar interface** - Everyone knows Google Drive
- ✅ **Version control** - Google Drive keeps file history
- ✅ **Collaboration** - Multiple people can update content

### **For Website:**
- ✅ **Always fresh content** - Updates reflect immediately
- ✅ **Reduced maintenance** - No need to rebuild for content changes
- ✅ **Scalable** - Easy to add more projects/newsletters
- ✅ **Professional** - High-quality images and content
- ✅ **Fast loading** - Google Drive CDN is reliable

This system gives you the best of both worlds - easy content management for your team and a professional, dynamic website for your visitors! 🎉