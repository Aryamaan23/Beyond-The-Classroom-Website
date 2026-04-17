import { LazyImage, PageTransition } from '../components/common';

const udayanCareGallery = [
  '/images/programs/udayan-care/01.png',
  '/images/programs/udayan-care/02.png',
  '/images/programs/udayan-care/03.png',
  '/images/programs/udayan-care/04.png',
  '/images/programs/udayan-care/05.png',
  '/images/programs/udayan-care/06.png',
  '/images/programs/udayan-care/07.png',
  '/images/programs/udayan-care/08.png',
  '/images/programs/udayan-care/09.png',
];

function UdayanCareInitiative() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-cream to-white">
        <section className="relative py-10 sm:py-14 md:py-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-40" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-dark font-bold text-sm tracking-wider uppercase mb-3">
                Programme Spotlight
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Udayan Care Initiative
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
                A focused initiative designed to strengthen youth readiness through mentorship, life-skills, and career
                direction support.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-card border-2 border-primary/15 border-t-4 border-t-secondary p-6 sm:p-8 md:p-10 space-y-6 mb-8 sm:mb-10">
              <p className="text-gray-700 leading-relaxed">
                Udayan Care Initiative creates meaningful spaces where young participants build confidence, discover their
                strengths, and gain practical direction for their futures.
              </p>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Core Focus Areas</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <li>Mentorship and Personal Guidance</li>
                  <li>Career and Employability Readiness</li>
                  <li>Life Skills and Decision-Making Support</li>
                  <li>Leadership Orientation Workshops</li>
                  <li>Community Participation and Reflection</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Through interactive facilitation, peer conversations, and structured learning, the programme helps youth
                transition from uncertainty to clarity with confidence and purpose.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/15 bg-white shadow-card p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">Programme Gallery</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Moments from workshops, group activities, facilitation sessions, and participant engagement.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {udayanCareGallery.map((image, index) => (
                  <div key={image} className="overflow-hidden rounded-2xl border border-primary/10 bg-slate-100">
                    <LazyImage
                      src={image}
                      alt={`Udayan Care initiative photo ${index + 1}`}
                      className="h-64 sm:h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default UdayanCareInitiative;
