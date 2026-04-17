import { Button, PageTransition } from '../components/common';
import { partnerVision } from '../data/content';

function Partner() {
  return (
    <PageTransition>
      <div className="Partner min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-primary-soft/60 to-amber-50/50 px-6 py-10 sm:py-14 mb-12 sm:mb-16 text-center shadow-xl shadow-primary/10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/25 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-teal-400/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-sm tracking-wider uppercase mb-3">
                Strategic Collaboration
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Partner With Us
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                Our vision is to partner with government bodies and UN agencies to scale youth leadership and capacity building across India.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-primary/15 p-8 sm:p-10 mb-12 shadow-card hover:shadow-card-hover transition-shadow">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-dark mb-4">
              {partnerVision.subheading}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
              {partnerVision.vision}
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {partnerVision.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {partnerVision.partnershipTypes.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl bg-white border-2 border-primary/10 hover:border-secondary/40 p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
                style={{ animation: `fadeInUp 450ms ease-out ${index * 90}ms both` }}
              >
                <h3 className="text-lg font-bold text-primary-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              Interested in partnering with Beyond the Classroom? We would love to explore how we can work together.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Get in Touch to Partner
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Partner;
