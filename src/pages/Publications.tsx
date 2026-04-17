import { CaseStudiesSection } from '../components/home';
import { PageHero, PageTransition } from '../components/common';

function Publications() {
  return (
    <PageTransition>
      <div className="Publications">
        <PageHero
          title="Publications"
          subtitle="Programme-wise student case studies and field documentation."
          primaryCta={{
            label: 'Upload Case Study',
            href: '#case-studies-heading',
          }}
          secondaryCta={{
            label: 'Contact Team',
            href: '/contact',
          }}
        />
        <CaseStudiesSection />
      </div>
    </PageTransition>
  );
}

export default Publications;
