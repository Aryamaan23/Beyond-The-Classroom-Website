import React from 'react';
import { highlights } from '../../data/content';

const iconMap: Record<string, React.ReactNode> = {
  globe: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  users: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  megaphone: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
};

function HighlightsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-amber-50/50 via-cream to-white" aria-label="Program highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-sm tracking-wider uppercase mb-3">What We Do</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Key Focus Areas
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-secondary via-amber-400 to-primary rounded-full mx-auto mt-4" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border-2 border-primary/10 hover:border-secondary/35 transition-all duration-300 ease-out"
              style={{
                animation: `fadeInUp 500ms ease-out ${index * 100}ms both`,
              }}
            >
              <div className="border-t-4 border-secondary p-6 sm:p-8 text-center h-full flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-soft to-amber-50 flex items-center justify-center text-primary mb-5 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-secondary/25 transition-all duration-300 shadow-md shadow-primary/10" role="img" aria-label={highlight.title}>
                  {iconMap[highlight.icon]}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HighlightsSection;
