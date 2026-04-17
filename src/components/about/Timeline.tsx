import { useMemo, useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const CHECKPOINT_COLORS = ['#f59e0b', '#22c55e', '#60a5fa', '#e879f9', '#fb7185', '#14b8a6'];

function Timeline({ events }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const points = useMemo(() => {
    if (!events.length) return [];
    const startX = 10;
    const endX = 90;
    const baselineY = 80;
    const amplitude = 40;
    const span = endX - startX;

    return events.map((_, index) => {
      const t = events.length === 1 ? 0.5 : index / (events.length - 1);
      const x = startX + t * span;
      // Rising semicircular-style growth arc (monotonic: no descending section)
      const y = baselineY - amplitude * Math.sqrt(Math.max(0, 1 - (1 - t) * (1 - t)));
      return { x, y };
    });
  }, [events]);

  const arcPath = useMemo(() => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i += 1) {
      const prev = points[i - 1];
      const curr = points[i];
      const cx = (prev.x + curr.x) / 2;
      d += ` Q ${cx} ${prev.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [points]);

  return (
    <section className="relative py-16 sm:py-20 md:py-24" aria-labelledby="timeline-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-soft/25 to-amber-50/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-35" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-8 left-[12%] h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-[8%] h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">Our Story</span>
          <h2
            id="timeline-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight"
          >
            Our Journey
          </h2>
          <div
            className="w-20 h-1.5 rounded-full mx-auto mt-4 bg-gradient-to-r from-secondary via-primary to-teal-500"
            aria-hidden="true"
          />
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-5">
            Our trajectory from classroom beginnings to on-ground impact. Each milestone remains editable from the
            `timelineEvents` list in `About`.
          </p>
        </div>

        {/* Desktop: trajectory arc */}
        <div className="hidden lg:block relative">
          <div className="relative h-[560px]">
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.1]" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full bg-secondary/16 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-primary/14 blur-3xl" aria-hidden="true" />

            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
              {/* Broad ribbon-like trajectory */}
              <path d={arcPath} fill="none" stroke="rgba(23,90,156,0.18)" strokeWidth="12" strokeLinecap="round" />
              <path d={arcPath} fill="none" stroke="rgba(23,90,156,0.62)" strokeWidth="5.2" strokeLinecap="round" />
              <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeDasharray="1.6 1.8" />
            </svg>

            <ol className="relative h-full w-full" aria-label="Organization trajectory timeline">
              {events.map((event, index) => {
                const point = points[index];
                if (!point) return null;
                const color = CHECKPOINT_COLORS[index % CHECKPOINT_COLORS.length];
                const isActive = activeIndex === index;
                const showBelow = index === 1 || index === events.length - 1 ? false : point.y < 50;
                const horizontalNudge =
                  index === 0 ? -54 : index === 2 ? 34 : index === events.length - 1 ? 54 : 0;
                const verticalNudge = index === 1 || index === events.length - 1 ? -28 : 0;

                return (
                  <li key={index}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      aria-label={`Milestone ${event.date}: ${event.title}`}
                    >
                      <span
                        className="block h-5 w-5 rounded-full border-2 border-white animate-pulse transition-transform duration-200"
                        style={{
                          backgroundColor: color,
                          boxShadow: `0 0 0 7px rgba(23,90,156,0.26), 0 0 28px ${color}`,
                          transform: isActive ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                    </button>

                    <article
                      className={`absolute -translate-x-1/2 w-[320px] min-h-[180px] rounded-2xl border p-5 backdrop-blur-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-white/96 border-primary/20 shadow-[0_16px_36px_-18px_rgba(23,90,156,0.5)] opacity-100'
                          : 'bg-white/90 border-primary/10 shadow-[0_10px_24px_-18px_rgba(23,90,156,0.35)] opacity-95'
                      }`}
                      style={{
                        left: `calc(${point.x}% + ${horizontalNudge}px)`,
                        top: showBelow ? `calc(${point.y + 12}% + ${verticalNudge}px)` : `calc(${point.y - 40}% + ${verticalNudge}px)`,
                      }}
                    >
                      <time
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-white mb-2"
                        style={{ backgroundColor: color }}
                      >
                        {event.date}
                      </time>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-[15px] text-gray-700 leading-relaxed">{event.description}</p>
                    </article>
                  </li>
                );
              })}
            </ol>

            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-slate-600/95">
              Hover or tap each glowing milestone to explore the trajectory
            </p>
          </div>
        </div>

        {/* Mobile/tablet fallback */}
        <div className="lg:hidden relative">
          <div className="absolute left-4 top-2 bottom-2 w-[3px] rounded-full bg-primary/25" aria-hidden="true" />
          <ol className="space-y-5" aria-label="Organization timeline">
            {events.map((event, index) => {
              const color = CHECKPOINT_COLORS[index % CHECKPOINT_COLORS.length];
              return (
                <li key={index} className="relative pl-10">
                  <span
                    className="absolute left-4 top-4 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-white animate-pulse"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 0 5px rgba(23,90,156,0.20), 0 0 16px ${color}`,
                    }}
                    aria-hidden="true"
                  />
                  <article className="rounded-2xl border border-primary/12 bg-white/90 p-4 shadow-card">
                    <time
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-white mb-2"
                      style={{ backgroundColor: color }}
                    >
                      {event.date}
                    </time>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
