import {
  HeroSection,
  FounderMessageSection,
  HighlightsSection,
  ImpactSnapshot,
  CollaborationsSection,
  ActionHubSection,
  PortfolioSection,
} from '../components/home';
import { PageTransition } from '../components/common';

function Home() {
  return (
    <PageTransition>
      <div className="Home">
        <HeroSection />
        <FounderMessageSection />
        <HighlightsSection />
        <ImpactSnapshot />
        <CollaborationsSection />
        <ActionHubSection />
        <PortfolioSection />
      </div>
    </PageTransition>
  );
}

export default Home;
