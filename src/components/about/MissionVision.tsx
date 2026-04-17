interface MissionVisionProps {
  logo?: string;
  mission: string;
  vision?: string;
  description: string;
}

function MissionVision({ logo, mission, vision, description }: MissionVisionProps) {
  const coreIdeologyLeft = [
    {
      title: 'Grounded Leadership',
      text: 'We nurture leaders who understand real community needs before proposing solutions.',
    },
    {
      title: 'Learning by Doing',
      text: 'Our approach moves beyond theory into field immersion, dialogue, and action.',
    },
    {
      title: 'Inclusive Opportunity',
      text: 'We create pathways for youth and women across diverse social and regional backgrounds.',
    },
  ];

  const coreIdeologyRight = [
    {
      title: 'Policy to Practice',
      text: 'We connect governance understanding with practical execution at grassroots level.',
    },
    {
      title: 'Collaboration First',
      text: 'Partnerships with institutions and communities help us scale long-term impact.',
    },
    {
      title: 'Sustainable Change',
      text: 'We focus on confidence, capability, and continuity so impact lasts beyond interventions.',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden" aria-labelledby="mission-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/50 via-white to-amber-50/30" aria-hidden="true" />
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 xl:px-2 relative">
        <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_minmax(0,2.8fr)_1.25fr] gap-7 lg:gap-10 items-start">
          <aside className="hidden xl:flex flex-col gap-5 pt-6" aria-label="Core ideology highlights">
            {coreIdeologyLeft.map((item) => (
              <div key={item.title} className="rounded-3xl border border-primary/20 bg-gradient-to-br from-[#fff9ef] via-white to-[#f5fbff] backdrop-blur-sm p-6 shadow-[0_16px_40px_-20px_rgba(29,78,216,0.35)]">
                <h3 className="text-lg font-extrabold text-primary-dark">{item.title}</h3>
                <p className="mt-2.5 text-[15px] text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </aside>

          <div className="text-center xl:px-2">
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

          <aside className="hidden xl:flex flex-col gap-5 pt-6" aria-label="Core ideology pillars">
            {coreIdeologyRight.map((item) => (
              <div key={item.title} className="rounded-3xl border border-secondary/30 bg-gradient-to-br from-[#f2f8ff] via-white to-[#fff7eb] backdrop-blur-sm p-6 shadow-[0_16px_40px_-20px_rgba(180,83,9,0.35)]">
                <h3 className="text-lg font-extrabold text-primary-dark">{item.title}</h3>
                <p className="mt-2.5 text-[15px] text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
