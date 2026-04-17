import React from 'react';
import { Link } from 'react-router-dom';

export interface PageHeroProps {
  title: string;
  description?: string;
  /** Overrides default “Where ambition meets direction” when logo is shown */
  eyebrow?: string;
  showLogo?: boolean;
  className?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  eyebrow,
  showLogo = true,
  className = '',
  primaryCta,
  secondaryCta,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-primary-soft/70 to-amber-50/60 px-6 py-10 sm:py-14 mb-10 sm:mb-12 text-center shadow-xl shadow-primary/10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.35]"
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
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {primaryCta &&
              (primaryCta.href.startsWith('#') ? (
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary to-primary-light shadow-md hover:shadow-lg hover:from-primary-dark hover:to-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-primary-dark/10"
                >
                  {primaryCta.label}
                </a>
              ) : (
                <Link
                  to={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary to-primary-light shadow-md hover:shadow-lg hover:from-primary-dark hover:to-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-primary-dark/10"
                >
                  {primaryCta.label}
                </Link>
              ))}
            {secondaryCta &&
              (secondaryCta.href.startsWith('#') ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm sm:text-base font-semibold text-primary bg-white/90 border-2 border-primary/35 hover:bg-primary hover:text-white hover:border-primary shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  to={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm sm:text-base font-semibold text-primary bg-white/90 border-2 border-primary/35 hover:bg-primary hover:text-white hover:border-primary shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {secondaryCta.label}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHero;
