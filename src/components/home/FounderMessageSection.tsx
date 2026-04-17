import { founderMessages } from '../../data/content';

function FounderMessageSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white to-cream" aria-labelledby="founder-message-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">
            From Our Leadership
          </span>
          <h2 id="founder-message-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Message from Our Leadership
          </h2>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mt-4" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {founderMessages.map((person, index) => (
            <article
              key={person.name}
              className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cream to-primary-soft/30 border border-primary/5 shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animation: `fadeInUp 500ms ease-out ${index * 120}ms both` }}
            >
              <div className="flex-shrink-0 mb-5">
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 overflow-hidden ring-4 ring-white shadow-lg ${
                    'portraitRound' in person && person.portraitRound ? 'rounded-full' : 'rounded-2xl'
                  }`}
                >
                  <img
                    src={person.photo}
                    alt={person.name}
                    className={`w-full h-full object-cover ${
                      'photoPosition' in person && person.photoPosition === 'top' ? 'object-top' : 'object-center'
                    }`}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-primary-dark mb-1">
                  {person.name}
                </h3>
                <p className="text-secondary font-semibold text-sm sm:text-base mb-4">
                  {person.role}
                </p>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  &ldquo;{person.message}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FounderMessageSection;
