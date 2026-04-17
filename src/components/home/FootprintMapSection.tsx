/**
 * Footprint map: India outline with glowing markers for Dholpur, Delhi NCR, Gurgaon (Haryana), Uttar Pradesh, and Chennai.
 */
import { FOOTPRINT_MARKERS, INDIA_MAINLAND_PATH, INDIA_MAP_VIEWBOX } from '../../data/indiaMapOutline';

const MARKER_ORDER = ['rajasthan', 'delhiNcr', 'gurgaonHaryana', 'uttarPradesh', 'chennai'] as const;

function FootprintMapSection() {
  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-gradient-to-b from-slate-50 via-primary-soft/40 to-amber-50/50"
      aria-labelledby="footprint-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-50" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <span className="inline-block text-secondary font-bold text-sm tracking-wider uppercase mb-3">
            Beyond the Classroom
          </span>
          <h2
            id="footprint-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Our footprint across India
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Field programmes, district immersions, and youth leadership work across our core regions — with active
            presence in Dholpur (Rajasthan), Delhi NCR, Gurgaon (Haryana), Uttar Pradesh, and Chennai (Tamil Nadu).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            {[
              {
                title: 'Dholpur, Rajasthan',
                subtitle: 'District immersions & grassroots capacity building',
                color: 'from-amber-500/90 to-secondary-dark',
                delay: '0ms',
              },
              {
                title: 'Uttar Pradesh',
                subtitle: 'Youth leadership & institutional collaboration',
                color: 'from-primary to-primary-light',
                delay: '120ms',
              },
              {
                title: 'Delhi NCR',
                subtitle: 'Policy dialogue, partnerships & programme hub',
                color: 'from-teal-600 to-emerald-500',
                delay: '240ms',
              },
              {
                title: 'Gurgaon, Haryana',
                subtitle: 'Youth engagement, institutional exposure & community collaboration',
                color: 'from-emerald-500 to-teal-500',
                delay: '300ms',
              },
              {
                title: 'Chennai, Tamil Nadu',
                subtitle: 'Southern hub — institutions, youth programmes & partnerships',
                color: 'from-pink-500 to-rose-600',
                delay: '360ms',
              },
            ].map((region) => (
              <div
                key={region.title}
                className="group relative rounded-2xl border border-white/80 bg-white/85 backdrop-blur-sm p-5 sm:p-6 shadow-soft hover:shadow-card-hover transition-all duration-300 animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: region.delay }}
              >
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-16 rounded-r-full bg-gradient-to-b ${region.color} shadow-lg`}
                  aria-hidden="true"
                />
                <div className="pl-5">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br ${region.color} shadow-[0_0_12px_rgba(212,160,23,0.85)] animate-pulse`}
                      aria-hidden="true"
                    />
                    {region.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{region.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl border-2 border-primary/15 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark p-6 sm:p-8 md:p-10 shadow-2xl shadow-primary/25 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-30 bg-grid-pattern bg-grid" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-secondary/25 blur-[80px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -left-10 bottom-0 w-48 h-48 rounded-full bg-teal-500/20 blur-3xl"
                aria-hidden="true"
              />

              <p className="relative text-center text-xs font-semibold uppercase tracking-[0.2em] text-secondary/90 mb-4">
                India — programme presence
              </p>

              <div className="relative mx-auto max-w-xl w-full">
                <svg
                  viewBox={INDIA_MAP_VIEWBOX}
                  className="w-full h-auto drop-shadow-xl"
                  role="img"
                  aria-label="Map of India with highlighted regions including Dholpur, Delhi NCR, Gurgaon in Haryana, Uttar Pradesh, and Chennai"
                >
                  <defs>
                    <linearGradient id="indiaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a5f" />
                      <stop offset="50%" stopColor="#175a9c" />
                      <stop offset="100%" stopColor="#0f3d6b" />
                    </linearGradient>
                    <filter id="glowRaj" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glowUP" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glowDelhi" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glowChennai" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    fill="url(#indiaFill)"
                    stroke="rgba(212,160,23,0.4)"
                    strokeWidth="1.25"
                    d={INDIA_MAINLAND_PATH}
                  />

                  {MARKER_ORDER.map((id) => {
                    const m = FOOTPRINT_MARKERS[id];
                    const isDelhi = id === 'delhiNcr';
                    const isGurgaon = id === 'gurgaonHaryana';
                    const isUp = id === 'uttarPradesh';
                    const dur = isUp ? '3s' : isDelhi ? '2.2s' : id === 'chennai' ? '2.5s' : '2.8s';
                    const rMain = isDelhi ? 10 : 13;
                    const rPulse = isDelhi ? 22 : 28;
                    const pulseValues = isDelhi ? '16;28;16' : '22;34;22';
                    const labelX = isGurgaon ? m.cx - 34 : m.cx;
                    const labelY = isDelhi ? m.cy - 18 : isGurgaon ? m.cy + 18 : m.cy > 500 ? -18 + m.cy : m.cy + 30;
                    const labelFontSize = isDelhi || isGurgaon ? 10 : m.cy > 500 ? 10 : 11;
                    return (
                      <g key={id} filter={`url(#${m.filter})`}>
                        <circle cx={m.cx} cy={m.cy} r={rMain} fill={m.fill} className="animate-pulse" />
                        <circle
                          cx={m.cx}
                          cy={m.cy}
                          r={rPulse}
                          fill="none"
                          stroke={m.fill}
                          strokeOpacity="0.45"
                          strokeWidth="2"
                        >
                          <animate attributeName="r" values={pulseValues} dur={dur} repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.9;0.35;0.9" dur={dur} repeatCount="indefinite" />
                        </circle>
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          fill="#f8fafc"
                          fontSize={labelFontSize}
                          fontWeight="600"
                          className="select-none"
                        >
                          {m.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <p className="relative mt-6 text-center text-xs text-slate-300/90 max-w-md mx-auto leading-relaxed">
                Outline based on India’s national boundary (simplified). Markers: Dholpur (Rajasthan), Delhi NCR,
                Gurgaon (Haryana), Uttar Pradesh, and Chennai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FootprintMapSection;
