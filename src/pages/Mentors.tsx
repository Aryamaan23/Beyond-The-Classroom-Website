import { PageHero, PageTransition } from '../components/common';

function Mentors() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PageHero
            title="Our Mentors"
            description="Mentors and institutional advisors who guide our students with practical insight, policy awareness, and real-world problem solving."
          />

          <section className="max-w-3xl mx-auto">
            <article className="rounded-2xl border border-primary/15 bg-white p-8 sm:p-10 shadow-card text-center">
              <p className="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary-soft text-primary-dark">
                Update
              </p>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">Mentors to be added soon</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We are currently curating our mentor network details and will update this section shortly.
              </p>
            </article>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default Mentors;
