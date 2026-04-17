import { useState } from 'react';

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  /** Required: use personal profile URLs; see `teamSocialDefaults` helpers for fallbacks while you gather links */
  socialLinks: {
    linkedin: string;
    instagram: string;
  };
}

interface TeamSectionProps {
  members: TeamMember[];
}

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  const [imageError, setImageError] = useState(false);

  const linkedin = member.socialLinks.linkedin.trim();
  const instagram = member.socialLinks.instagram.trim();

  return (
    <article className="relative group" tabIndex={-1}>
      <div className="bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover border border-primary/10">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary-soft to-slate-100">
          {!imageError ? (
            <img
              src={member.photo}
              alt={`${member.name}, ${member.role}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200">
              <div className="text-center text-slate-600 px-4">
                <div className="text-4xl mb-2" aria-hidden="true">
                  👤
                </div>
                <div className="text-sm">Photo not available</div>
              </div>
            </div>
          )}

          <div
            className="absolute inset-0 bg-primary-dark/88 flex items-center justify-center gap-4 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
          >
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:bg-primary-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark shadow-md"
              aria-label={`${member.name} on LinkedIn`}
            >
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:bg-primary-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark shadow-md"
              aria-label={`${member.name} on Instagram`}
            >
              <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="p-5 sm:p-7 text-center border-t border-primary/5">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-snug">{member.role}</p>
        </div>
      </div>
    </article>
  );
}

function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="team-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3 sm:mb-4"
        >
          Meet Our Team
        </h2>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
          Passionate individuals dedicated to creating meaningful impact in communities
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {members.map((member) => (
            <div key={member.name} role="listitem">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
