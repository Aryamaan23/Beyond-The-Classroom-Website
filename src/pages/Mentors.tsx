import { PageHero, PageTransition } from '../components/common';
import { mentors } from '../data/content';

function Mentors() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PageHero
            title="Our Mentors"
            description="Organizations and experts who guide our students with practical insight, policy awareness, and real-world problem solving."
          />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {mentors.map((mentor) => (
              <article
                key={mentor.name}
                className="rounded-2xl border border-primary/15 bg-white p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="h-24 sm:h-28 flex items-center justify-start mb-4">
                  <img
                    src={mentor.logo}
                    alt={mentor.name}
                    className="max-h-full w-auto max-w-[220px] object-contain"
                  />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{mentor.role}</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">{mentor.name}</h2>
                <p className="mt-3 text-gray-700 leading-relaxed">{mentor.description}</p>
                <a
                  href={mentor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  Visit partner →
                </a>
              </article>
            ))}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default Mentors;
