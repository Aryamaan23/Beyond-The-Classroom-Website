import React from 'react';
import Button from '../common/Button';
import LazyImage from '../common/LazyImage';

export interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
  image,
  ctaText,
  ctaLink,
  features,
}) => {
  return (
    <article className="bg-white rounded-2xl shadow-card overflow-hidden transition-all duration-300 ease-out hover:shadow-card-hover border-2 border-primary/10 hover:border-secondary/40 transform hover:scale-[1.01] flex flex-col group">
      {/* Image at top */}
      <div className="w-full h-64 overflow-hidden">
        <LazyImage
          src={image}
          alt={`${title} program`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          {description}
        </p>

        {/* Features list */}
        {features.length > 0 && (
          <ul className="mb-6 space-y-2 flex-grow" aria-label={`${title} features`}>
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA button at bottom */}
        <div className="mt-auto">
          <Button
            variant="primary"
            size="md"
            href={ctaLink}
            className="w-full"
            aria-label={`${ctaText} for ${title}`}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProgramCard;
