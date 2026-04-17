/** Organization Instagram — replace per-person `instagram` in About `teamMembers` when you have personal handles. */
export const ORG_INSTAGRAM = 'https://www.instagram.com/beyondtheclassroom';

/** LinkedIn people search (useful until each `/in/...` URL is added). */
export function linkedinSearchUrl(fullName: string): string {
  const q = encodeURIComponent(`${fullName} Beyond the Classroom`);
  return `https://www.linkedin.com/search/results/people/?keywords=${q}`;
}
