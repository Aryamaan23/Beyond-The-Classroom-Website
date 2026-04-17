import React from 'react';

export interface PageHeroProps {
  title: string;
  description?: string;
  /** Overrides default “Where ambition meets direction” when logo is shown */
  eyebrow?: string;
  showLogo?: boolean;
  className?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  eyebrow,
  showLogo = true,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-primary-soft/70 to-amber-50/60 px-6 py-10 sm:py-12 mb-10 sm:mb-12 text-center shadow-xl shadow-primary/10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        {showLogo && (
          <img
            src="/images/logo.png"
            alt="Beyond the Classroom"
            className="h-14 sm:h-16 w-auto mx-auto mb-4 drop-shadow-md"
          />
        )}
        <p className="text-sm sm:text-base font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-secondary-dark via-secondary to-amber-600">
          {eyebrow ?? 'Where ambition meets direction'}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
