import { Button } from '../common';

const actionCards = [
  {
    title: 'Support Our Work',
    description: 'Support youth leadership, grassroots learning, and community impact initiatives.',
    cta: 'Contact Us',
    href: '/contact',
  },
  {
    title: 'Become a Volunteer',
    description: 'Contribute your time and skills to guide young changemakers and local communities.',
    cta: 'Volunteer',
    href: '/contact',
  },
  {
    title: 'Partner With Us',
    description: 'Collaborate with us on government and UN partnerships to scale youth leadership and capacity building.',
    cta: 'Partner',
    href: '/partner',
  },
  {
    title: 'Work With Us',
    description: 'Join our mission-driven network and help shape the next generation of leaders.',
    cta: 'Work With Us',
    href: '/contact',
  },
];

function ActionHubSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-primary-soft/30 to-amber-50/40" aria-labelledby="action-hub-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-sm tracking-wider uppercase mb-3">
            Get Involved
          </span>
          <h2 id="action-hub-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Join The Movement
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary via-secondary to-teal-500 rounded-full mx-auto mt-4" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {actionCards.map((card, index) => (
            <article
              key={card.title}
              className="rounded-2xl border-2 border-primary/10 bg-white/90 hover:border-secondary/40 p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animation: `fadeInUp 450ms ease-out ${index * 80}ms both` }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{card.description}</p>
              <Button variant="outline" size="sm" href={card.href} className="w-full">
                {card.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActionHubSection;
