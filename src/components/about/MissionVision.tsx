interface MissionVisionProps {
  logo?: string;
  mission: string;
  vision?: string;
  description: string;
}

function MissionVision({ logo, mission, vision, description }: MissionVisionProps) {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden" aria-labelledby="mission-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/50 via-white to-amber-50/30" aria-hidden="true" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {logo && (
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img 
              src={logo} 
              alt="Beyond the Classroom - Where ambition meets direction" 
              className="h-20 sm:h-24 w-auto"
            />
          </div>
        )}
        
        <div className="mb-8 sm:mb-12">
          <h1 id="mission-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Our Mission
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
            {mission}
          </p>
        </div>

        {vision && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              Our Vision
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
              {vision}
            </p>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-card border-2 border-primary/10 border-t-4 border-t-secondary p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-dark mb-3 sm:mb-4">
            About Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
