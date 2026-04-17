import { PageHero, PageTransition } from '../components/common';
import { founderMessages } from '../data/content';

function LeadershipMessages() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PageHero
            title="Leadership Messages"
            description="Messages from our Founder, Co-founder, and Executive Director on building impact-driven youth leadership."
          />

          <section className="space-y-10 sm:space-y-14">
            {founderMessages.map((person, index) => (
              <article key={person.name} className="border-b border-primary/10 pb-8 sm:pb-12 last:border-b-0">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                  }`}
                >
                  <div className="lg:col-span-5">
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full max-w-md mx-auto h-[360px] sm:h-[430px] object-cover object-top rounded-3xl border border-primary/20 shadow-card"
                    />
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-secondary">
                      {person.role}
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-1">{person.name}</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">{person.message}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default LeadershipMessages;
