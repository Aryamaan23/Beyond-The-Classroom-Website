import { useEffect, useState } from 'react';
import { fetchCaseStudies } from '../../services/caseStudyService';
import type { CaseStudy } from '../../types';
import PublishedCaseStudiesList from './PublishedCaseStudiesList';

export type CaseStudiesSectionProps = {
  /** Larger cards and richer layout for the Publications page */
  variant?: 'default' | 'featured';
};

function CaseStudiesSection({ variant = 'default' }: CaseStudiesSectionProps) {
  const isFeatured = variant === 'featured';
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const load = async () => {
    setLoading(true);
    setLoadError('');
    const result = await fetchCaseStudies();
    if (result.success) {
      setItems(result.caseStudies || []);
    } else {
      setLoadError(result.error || 'Could not load case studies right now.');
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <section
      className={`relative overflow-hidden ${
        isFeatured
          ? 'pt-8 sm:pt-10 md:pt-12 pb-20 sm:pb-24 md:pb-28 bg-gradient-to-b from-white via-primary-soft/30 to-cream-dark/80'
          : 'py-16 sm:py-20 md:py-28 bg-white'
      }`}
      aria-labelledby="case-studies-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
        <div
          className="absolute top-8 left-4 w-56 h-40 rounded-2xl bg-cover bg-center shadow-lg hidden md:block"
          style={{ backgroundImage: "url('/images/projects/project-1.jpg')" }}
        />
        <div
          className="absolute top-24 right-6 w-52 h-36 rounded-2xl bg-cover bg-center shadow-lg hidden lg:block"
          style={{ backgroundImage: "url('/images/projects/project-3.jpg')" }}
        />
        <div
          className="absolute bottom-10 left-10 w-60 h-40 rounded-2xl bg-cover bg-center shadow-lg hidden lg:block"
          style={{ backgroundImage: "url('/images/projects/project-5.jpg')" }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isFeatured ? 'mb-8 sm:mb-10' : 'mb-10 sm:mb-12'}`}>
          <span
            className={`inline-block text-secondary font-semibold tracking-wider uppercase mb-3 ${
              isFeatured ? 'text-sm sm:text-base' : 'text-sm'
            }`}
          >
            Student Submissions
          </span>
          <h2
            id="case-studies-heading"
            className={`font-bold text-gray-900 tracking-tight ${
              isFeatured ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl md:text-4xl'
            }`}
          >
            Case Studies
          </h2>
          <p
            className={`text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed ${
              isFeatured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          >
            Programme-wise student case studies and field reflections — read full articles on-site and download
            original files. Editors upload and manage content from the navbar (Editor login).
          </p>
        </div>

        <PublishedCaseStudiesList
          variant={variant}
          items={items}
          loading={loading}
          loadError={loadError}
          onRefresh={() => void load()}
        />
      </div>
    </section>
  );
}

export default CaseStudiesSection;
