import { useEffect, useMemo, useState } from 'react';
import Button from './Button';
import LazyImage from './LazyImage';

export interface SlideshowProgram {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  features: string[];
}

interface ProgramsSlideshowProps {
  programs: SlideshowProgram[];
  autoPlayMs?: number;
}

function ProgramsSlideshow({
  programs,
  autoPlayMs = 2000,
}: ProgramsSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safePrograms = useMemo(() => programs.filter((program) => Boolean(program.title)), [programs]);

  useEffect(() => {
    if (safePrograms.length <= 1) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safePrograms.length);
    }, autoPlayMs);
    return () => window.clearInterval(intervalId);
  }, [autoPlayMs, safePrograms.length]);

  useEffect(() => {
    if (activeIndex > safePrograms.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, safePrograms.length]);

  if (safePrograms.length === 0) return null;
  const activeProgram = safePrograms[activeIndex];

  return (
    <section className="relative py-0" aria-label="Programmes slideshow">
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] w-full overflow-hidden">
        <LazyImage
          src={activeProgram.image}
          alt={activeProgram.title}
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16 flex items-end">
          <article className="max-w-2xl text-white">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{activeProgram.title}</h3>
            <p className="mt-4 text-white/90 leading-relaxed text-sm sm:text-base">{activeProgram.description}</p>

            <ul className="mt-5 space-y-2" aria-label={`${activeProgram.title} highlights`}>
              {activeProgram.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start text-sm sm:text-base text-white/95">
                  <span className="mt-1 mr-2 h-2.5 w-2.5 rounded-full bg-secondary flex-shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button href={activeProgram.ctaLink} variant="secondary" size="lg">
                {activeProgram.ctaText}
              </Button>
            </div>
          </article>
        </div>

        <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 lg:right-12 flex items-center gap-2" aria-hidden="true">
          {safePrograms.map((program, index) => (
            <span
              key={program.title}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSlideshow;
