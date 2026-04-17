import {
  HeroSection,
  FounderMessageSection,
  HighlightsSection,
  FootprintMapSection,
  ImpactSnapshot,
  CollaborationsSection,
  ActionHubSection,
  PortfolioSection,
} from '../components/home';
import { PageTransition, ProgramsSlideshow } from '../components/common';
import { programs } from '../data/content';

function Home() {
  return (
    <PageTransition>
      <div className="Home">
        <HeroSection />
        <ProgramsSlideshow programs={programs} autoPlayMs={2000} />
        <FounderMessageSection />
        <HighlightsSection />
        <FootprintMapSection />
        <ImpactSnapshot />
        <CollaborationsSection />
        <ActionHubSection />
        <PortfolioSection />
      </div>
    </PageTransition>
  );
}

export default Home;
