import { useRef } from 'react';
import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { impactMetrics as impactData } from '../../data/content';

interface ImpactMetric {
  value: number;
  label: string;
  suffix?: string;
}

const impactMetrics: ImpactMetric[] = [
  { value: impactData.livesTouched, label: 'Students Impacted', suffix: '+' },
  { value: impactData.partners, label: 'Partnerships', suffix: '+' },
  { value: impactData.programs, label: 'Core Programs' },
  { value: impactData.sdgsFocused, label: 'SDGs Focused' },
];

function ImpactSnapshot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-28 bg-white/80 backdrop-blur-[1px]" aria-labelledby="impact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">By the Numbers</span>
          <h2 id="impact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Our Impact
          </h2>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-4" aria-hidden="true" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
          {/* Counters - 2x2 grid on larger screens */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6" role="list" aria-label="Impact metrics">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                role="listitem"
                className="bg-primary-soft/50 rounded-xl p-6 sm:p-8 border border-primary/5 hover:border-primary/15 hover:bg-primary-soft/70 transition-all duration-300"
                style={{
                  animation: isVisible ? `fadeInUp 600ms ease-out ${index * 100}ms both` : 'none',
                }}
              >
                <CounterDisplay
                  value={metric.value}
                  label={metric.label}
                  suffix={metric.suffix}
                  animate={isVisible}
                />
              </div>
            ))}
          </div>

          {/* Media Placeholder */}
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-card border border-primary/5 bg-primary-soft/30" role="img" aria-label="Impact story video placeholder">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6 py-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-soft flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Impact Story Video</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Your video or image carousel will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CounterDisplayProps {
  value: number;
  label: string;
  suffix?: string;
  animate: boolean;
}

function CounterDisplay({ value, label, suffix = '', animate }: CounterDisplayProps) {
  const count = useCounterAnimation(value, 2000, animate);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 tabular-nums tracking-tight" aria-live="polite" aria-atomic="true">
        <span aria-label={`${value}${suffix} ${label}`}>
          {count}{suffix}
        </span>
      </div>
      <div className="text-sm sm:text-base text-gray-600 font-medium">{label}</div>
    </div>
  );
}

export default ImpactSnapshot;
