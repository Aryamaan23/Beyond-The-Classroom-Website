import { LazyImage, PageTransition } from '../components/common';

const chennaiSummitGallery = [
  '/images/programs/180dc-chennai/01.png',
  '/images/programs/180dc-chennai/02.png',
  '/images/programs/180dc-chennai/03.png',
  '/images/programs/180dc-chennai/04.png',
  '/images/programs/180dc-chennai/05.png',
  '/images/programs/180dc-chennai/06.png',
  '/images/programs/180dc-chennai/07.png',
];

function ChennaiSummit180dc() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-cream to-white">
        <section className="relative py-10 sm:py-14 md:py-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-35" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-primary font-bold text-sm tracking-wider uppercase mb-3">
                Programme Spotlight
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                180 Degrees Consulting SRMIST KTR Chennai Summit
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
                A high-energy summit experience connecting youth with consulting practice, collaboration, and leadership
                for real-world impact.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-card border-2 border-primary/15 border-t-4 border-t-emerald-600 p-6 sm:p-8 md:p-10 space-y-6 mb-8 sm:mb-10">
              <p className="text-gray-700 leading-relaxed">
                The Chennai Summit brought together participants, mentors, and partner organisations for a day of learning,
                dialogue, and execution-focused engagement in the consulting ecosystem.
              </p>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Summit Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <li>Leadership sessions and collaborative forums</li>
                  <li>Consulting-oriented problem-solving exposure</li>
                  <li>Pitch and networking activities for participants</li>
                  <li>Partner showcases and sponsor engagement</li>
                  <li>Youth-led participation with cross-team learning</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                As a knowledge partner, Beyond the Classroom contributed to creating an atmosphere where young people could
                build confidence, present ideas, and connect with peers and professionals.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/15 bg-white shadow-card p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">Summit Gallery</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Moments from the 180 DC SRMIST KTR Chennai Summit and partnership activities.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {chennaiSummitGallery.map((image, index) => (
                  <div key={image} className="overflow-hidden rounded-2xl border border-primary/10 bg-slate-100">
                    <LazyImage
                      src={image}
                      alt={`180 DC Chennai Summit photo ${index + 1}`}
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

export default ChennaiSummit180dc;
