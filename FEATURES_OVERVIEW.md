# Beyond the Classroom — High-Level Feature Documentation

## 1) Public Website Experience

- **Responsive website navigation** with About dropdown, mobile drawer, and quick access to key pages.
- **Home page storytelling flow** with hero, auto-running programmes slideshow, founder message, highlights, footprint map, impact snapshot, collaborations, and action hub.
- **About section depth** including Mission/Vision/About narrative, interactive journey timeline, team profiles with social links, mentors/messages sub-pages.
- **Programs showcase** with visually rich cards and dedicated detail pages for:
  - Dholpur Drive and District Immersion
  - Bharat Yuva Capacity Building Programme
  - Udayan Care Initiative
  - 180 Degrees Consulting SRMIST KTR Chennai Summit
- **Media section coverage** with categorized Instagram embeds (Bharat Yuva, 180 DC Chennai Summit, Udayan Care, Dholpur Drive) and podcast placeholder.
- **Publications section** for student case studies in article format with document download support.

## 2) Case Study Publishing Workflow

- **Editor login workspace** for authorized users.
- **Upload utility** for case studies with:
  - title, student name, programme, summary
  - main file upload
  - multiple optional attachments
- **Published rendering**: uploaded case studies appear as readable on-site article pages.
- **Download utility** for original file and all attachments.
- **Delete utility with confirmation** for editors to remove published case studies and associated files.

## 3) Backend & Storage Capabilities

- **Serverless API endpoints** for contact/case-study/image handling.
- **Google Drive integration** for storing uploaded case-study files and metadata.
- **Metadata-driven retrieval** to list, open, download, and delete case studies.
- **Development fallback mechanisms** for local setup and testing.

## 4) Security & Access Controls (Current)

- **Editor credential verification on server-side API** only.
- **Hashed username and hashed password validation** (no plaintext comparison in runtime auth checks).
- **Role-restricted operations** for upload/delete actions.
- **Session-style UX state** in frontend for showing login/logout controls in navigation.

## 5) Contact & Engagement

- **Contact form validation** and action flow integrated with WhatsApp handoff for direct outreach.
- **Social links integration** (Instagram, LinkedIn, Gmail) across footer/contact/team areas.
- **Partner With Us** and **Get Involved** conversion pathways across the site.

## 6) UX & Design Enhancements Implemented

- Strong visual identity with gradients, glow accents, animated indicators, and section-specific layouts.
- Mobile-first readability improvements, including contrast-safe navigation drawer styling.
- Program and media galleries using real field photographs for authenticity and audience trust.
- Consistent card system, typography hierarchy, and transitions across major sections.

## 7) Suggested Next Enhancements

- Add server-issued editor session tokens with expiry/refresh and logout invalidation.
- Add brute-force protection (rate limits + temporary lockout) for editor auth attempts.
- Add analytics events for key interactions (program clicks, downloads, contact conversions).
- Add CMS-style content admin panel for non-technical updates.

