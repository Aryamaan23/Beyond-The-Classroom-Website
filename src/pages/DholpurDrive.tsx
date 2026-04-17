import { LazyImage, PageTransition } from '../components/common';

const dholpurDriveGallery = [
  '/images/programs/dholpur-drive/01.png',
  '/images/programs/dholpur-drive/02.png',
  '/images/programs/dholpur-drive/03.png',
  '/images/programs/dholpur-drive/04.png',
];

function DholpurDrive() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-cream to-white">
        <section className="relative py-10 sm:py-14 md:py-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-35" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-dark font-bold text-sm tracking-wider uppercase mb-3">
                Programme Spotlight
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Dholpur Drive and District Immersion
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
                A district-level experiential programme connecting youth with governance institutions, community realities,
                and local leadership ecosystems.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-card border-2 border-primary/15 border-t-4 border-t-secondary p-6 sm:p-8 md:p-10 space-y-6 mb-8 sm:mb-10">
              <p className="text-gray-700 leading-relaxed">
                Dholpur Drive is designed to move learning beyond classrooms into real districts, where participants engage
                directly with local systems, stakeholders, and implementation realities.
              </p>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">What Participants Experience</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <li>District Office and Panchayat Exposure</li>
                  <li>Field Problem Mapping and Documentation</li>
                  <li>Community Conversations with Stakeholders</li>
                  <li>Policy Observation and Reflection Notes</li>
                  <li>Action Plan Presentation and Feedback</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The initiative builds practical understanding, confidence, and problem-solving orientation for youth who
                want to create meaningful change at grassroots level.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/15 bg-white shadow-card p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">Immersion Gallery</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Highlights from community interactions, district exposure, and on-ground learning moments.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {dholpurDriveGallery.map((image, index) => (
                  <div key={image} className="overflow-hidden rounded-2xl border border-primary/10 bg-slate-100">
                    <LazyImage
                      src={image}
                      alt={`Dholpur Drive photo ${index + 1}`}
                      className="h-64 sm:h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
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

export default DholpurDrive;
