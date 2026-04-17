import { ProgramCard } from '../components/programs';
import { PageHero, PageTransition } from '../components/common';
import { programs } from '../data/content';

function Programs() {
  return (
    <PageTransition>
      <div className="Programs min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PageHero
            title="Our Programs"
            description="Discover our flagship initiatives including Dholpur Drive, Bharat Yuva Capacity Building Programme, Udayan Care Initiative, and the 180 Degrees Consulting SRMIST KTR Chennai Summit."
          />

          {/* Program Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 items-stretch">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                title={program.title}
                description={program.description}
                image={program.image}
                ctaText={program.ctaText}
                ctaLink={program.ctaLink}
                features={program.features}
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Programs;
