import { Button } from '../common';

function HeroSection() {
  return (
    <section 
      className="relative w-full min-h-[640px] sm:min-h-[720px] md:min-h-[820px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-primary-soft/40"
      aria-label="Hero section"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-hero-pattern" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50" aria-hidden="true" />
      
      {/* Decorative shapes - floating elements */}
      <div className="absolute top-24 right-[8%] w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-float" aria-hidden="true" />
      <div className="absolute bottom-40 left-[6%] w-80 h-80 rounded-full bg-secondary/25 blur-3xl" style={{ animation: 'float 8s ease-in-out 1s infinite' }} aria-hidden="true" />
      <div className="absolute top-1/2 right-[12%] w-40 h-40 rounded-full bg-teal-400/15 blur-2xl" aria-hidden="true" />
      <div className="absolute top-1/2 right-[15%] w-3 h-3 rounded-full bg-secondary" aria-hidden="true" />
      <div className="absolute top-1/3 left-[12%] w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
      <div className="absolute bottom-1/3 right-[25%] w-2 h-2 rounded-full bg-teal-500/80" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className="flex justify-center mb-6 sm:mb-8"
          style={{ animation: 'fadeInUp 700ms ease-out both' }}
        >
          <img 
            src="/images/logo.png" 
            alt="Beyond the Classroom" 
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto"
          />
        </div>
        <p 
          className="text-base sm:text-lg md:text-xl font-bold tracking-[0.18em] uppercase mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-teal-600"
          style={{ animation: 'fadeInUp 700ms ease-out 100ms both' }}
        >
          Where ambition meets direction
        </p>
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-dark mb-6 sm:mb-8 leading-tight tracking-tight max-w-3xl mx-auto drop-shadow-sm"
          style={{ animation: 'fadeInUp 700ms ease-out 200ms both' }}
        >
          Empowering youth with confidence, skills, and opportunities beyond textbooks
        </h1>
        <p 
          className="text-base sm:text-lg text-gray-600/90 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ animation: 'fadeInUp 700ms ease-out 300ms both' }}
        >
          Building a community of young changemakers through leadership programs, upskilling workshops, and meaningful partnerships.
        </p>
        
        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'fadeInUp 700ms ease-out 400ms both' }}
        >
          <Button 
            variant="primary" 
            size="lg"
            href="/contact"
            className="shadow-md"
            aria-label="Join the movement - navigate to contact page"
          >
            Join the Movement
          </Button>
          <Button 
            variant="outline"
            size="lg"
            href="/programs"
            aria-label="View our programs - navigate to programs page"
          >
            View Programs
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-primary/60 z-10"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Discover</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;
