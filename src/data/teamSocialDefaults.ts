/** Organization Instagram — replace per-person `instagram` in About `teamMembers` when you have personal handles. */
export const ORG_INSTAGRAM = 'https://www.instagram.com/beyond._the._classroom?igsh=MXc4ZjJlMzJ4ODV5NQ==';
export const ORG_LINKEDIN = 'https://www.linkedin.com/company/beyond-the-classroom09/?originalSubdomain=in';

/** LinkedIn people search (useful until each `/in/...` URL is added). */
export function linkedinSearchUrl(fullName: string): string {
  return ORG_LINKEDIN;
}
