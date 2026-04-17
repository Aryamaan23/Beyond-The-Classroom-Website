import { LazyImage } from '../common';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

function Timeline({ events }: TimelineProps) {
  return (
    <section className="py-16 sm:py-20 bg-white" aria-labelledby="timeline-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">Our Story</span>
          <h2 id="timeline-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Our Journey
          </h2>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-4" aria-hidden="true" />
        </div>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" aria-hidden="true" />
          
          <ol className="space-y-12" aria-label="Organization timeline">
            {events.map((event, index) => (
              <li 
                key={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8`}
              >
                {/* Timeline marker */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-soft transform md:-translate-x-1/2 z-10" aria-hidden="true" />
                
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'
                }`}>
                  <article className="bg-primary-soft/50 rounded-xl p-4 sm:p-6 shadow-card border border-primary/5 hover:shadow-card-hover transition-all duration-300">
                    <time className="inline-block px-2 sm:px-3 py-1 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full mb-2 sm:mb-3">
                      {event.date}
                    </time>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </article>
                </div>
                
                {/* Image */}
                <div className="flex-1 ml-12 md:ml-0">
                  {event.image && (
                    <div className="rounded-xl overflow-hidden shadow-card border border-primary/5">
                      <LazyImage 
                        src={event.image} 
                        alt={`${event.title} - ${event.description}`}
                        className="w-full h-48 sm:h-64 object-cover"
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
