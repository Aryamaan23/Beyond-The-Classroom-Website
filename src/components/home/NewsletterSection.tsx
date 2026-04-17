import { useState } from 'react';
import { Button, LazyImage } from '../common';
import { useNewsletters } from '../../hooks/useGoogleDriveContent';
import { newsletterConfig } from '../../data/content';
import { submitNewsletterSignup, validateNewsletterSignup } from '../../services/contactService';

// Fallback newsletter data
const fallbackNewsletterData = [
  {
    id: '1',
    title: 'Monthly Impact Report - January 2024',
    description: 'Highlights from our digital literacy workshops and community outreach programs.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    date: '2024-01-15',
    downloadUrl: '#', // This will be Google Drive link
  },
  {
    id: '2',
    title: 'Women Empowerment Success Stories',
    description: 'Inspiring stories from our women empowerment program participants.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    date: '2024-02-15',
    downloadUrl: '#',
  },
  {
    id: '3',
    title: 'Youth Leadership Summit Recap',
    description: 'Key takeaways and moments from our annual youth leadership summit.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    date: '2024-03-15',
    downloadUrl: '#',
  },
  {
    id: '4',
    title: 'Sustainability Drive Results',
    description: 'Environmental impact and community participation in our sustainability initiatives.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
    date: '2024-04-15',
    downloadUrl: '#',
  },
];

interface Newsletter {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  downloadUrl: string;
}

function NewsletterSection() {
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupHp, setSignupHp] = useState('');
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [signupGeneral, setSignupGeneral] = useState('');
  const [signupSubmitting, setSignupSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Fetch newsletters from Google Drive with fallback to static data
  const { data: newsletterData, loading, error } = useNewsletters(fallbackNewsletterData);

  const handleNewsletterClick = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
  };

  const handleCloseModal = () => {
    setSelectedNewsletter(null);
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupHp.trim()) {
      return;
    }

    const validation = validateNewsletterSignup({ email: signupEmail, name: signupName });
    if (!validation.valid) {
      setSignupErrors(validation.errors);
      setSignupGeneral('');
      return;
    }

    setSignupSubmitting(true);
    setSignupErrors({});
    setSignupGeneral('');

    const result = await submitNewsletterSignup({
      email: signupEmail.trim(),
      ...(signupName.trim() ? { name: signupName.trim() } : {}),
    });

    setSignupSubmitting(false);

    if (result.success) {
      setSignupSuccess(true);
      setSignupEmail('');
      setSignupName('');
      window.setTimeout(() => setSignupSuccess(false), 8000);
    } else {
      const fromApi = Array.isArray(result.errors)
        ? result.errors.join(' ')
        : result.error || 'Something went wrong. Please try again.';
      setSignupGeneral(fromApi);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-cream-dark" aria-labelledby="newsletter-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">Stay Connected</span>
          <h2 id="newsletter-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Newsletter
            {loading && <span className="text-sm font-normal text-gray-500 ml-2">(Loading...)</span>}
          </h2>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-4" aria-hidden="true" />
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest impact stories, program highlights, and community achievements through our monthly newsletters.
            {error && <span className="block text-red-500 text-xs mt-1">Using cached content</span>}
          </p>
        </div>

        {/* Substack Integration */}
        <div className="mb-10 sm:mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-card">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Read Our Latest On Substack</h3>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
              Follow our long-form stories, insights, and program reflections directly on Substack.
            </p>
            {newsletterConfig.substackEmbedUrl ? (
              <iframe
                src={newsletterConfig.substackEmbedUrl}
                title="Beyond the Classroom Substack Newsletter"
                className="w-full rounded-xl border border-primary/10 bg-white"
                style={{ minHeight: '320px' }}
              />
            ) : (
              <div className="rounded-xl border border-dashed border-primary/30 bg-primary-soft/30 p-6 text-center text-gray-600 text-sm sm:text-base">
                <p className="mb-2">
                  Add your Substack embed by setting <code className="text-xs sm:text-sm">VITE_SUBSTACK_EMBED_URL</code> in{' '}
                  <code className="text-xs sm:text-sm">.env</code> (see <code className="text-xs sm:text-sm">.env.example</code>).
                </p>
                {newsletterConfig.substackProfileUrl ? (
                  <Button variant="primary" size="md" href={newsletterConfig.substackProfileUrl}>
                    Open our Substack
                  </Button>
                ) : null}
              </div>
            )}
            <div className="text-center mt-5">
              <Button
                variant="outline"
                size="md"
                href={newsletterConfig.substackProfileUrl || '/contact'}
              >
                {newsletterConfig.substackProfileUrl ? 'Open Substack' : 'Share Substack Link'}
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newsletterData.map((newsletter, index) => (
            <div
              key={newsletter.id}
              style={{
                animation: `fadeInUp 400ms ease-out ${index * 100}ms both`,
              }}
            >
              <NewsletterCard 
                newsletter={newsletter} 
                onClick={() => handleNewsletterClick(newsletter)} 
              />
            </div>
          ))}
        </div>

        {/* Newsletter Modal */}
        {selectedNewsletter && (
          <NewsletterModal newsletter={selectedNewsletter} onClose={handleCloseModal} />
        )}

        {/* Newsletter Subscription */}
        <div className="mt-14 sm:mt-16">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-primary/5 shadow-card max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
              Subscribe to our updates
            </h3>
            <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
              Leave your email and we will add you to our mailing list for program news and impact stories.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-4" noValidate>
              <div className="absolute -left-[9999px] w-px h-px overflow-hidden opacity-0" aria-hidden="true">
                <label htmlFor="newsletter-hp">Company</label>
                <input
                  id="newsletter-hp"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={signupHp}
                  onChange={(e) => setSignupHp(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={signupEmail}
                  onChange={(e) => {
                    setSignupEmail(e.target.value);
                    if (signupErrors.email) setSignupErrors((p) => ({ ...p, email: '' }));
                    if (signupGeneral) setSignupGeneral('');
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="you@example.com"
                />
                {signupErrors.email ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {signupErrors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="newsletter-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="newsletter-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={signupName}
                  onChange={(e) => {
                    setSignupName(e.target.value);
                    if (signupErrors.name) setSignupErrors((p) => ({ ...p, name: '' }));
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  placeholder="Your name"
                />
                {signupErrors.name ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {signupErrors.name}
                  </p>
                ) : null}
              </div>
              {signupGeneral ? (
                <p className="text-sm text-red-600 text-center" role="alert">
                  {signupGeneral}
                </p>
              ) : null}
              {signupSuccess ? (
                <p className="text-sm text-center text-green-700 font-medium" role="status">
                  Thanks — you are on the list. We will be in touch soon.
                </p>
              ) : null}
              <div className="flex justify-center pt-1">
                <Button type="submit" variant="primary" size="lg" disabled={signupSubmitting}>
                  {signupSubmitting ? 'Sending…' : 'Subscribe'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface NewsletterCardProps {
  newsletter: Newsletter;
  onClick: () => void;
}

function NewsletterCard({ newsletter, onClick }: NewsletterCardProps) {
  return (
    <article 
      className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-gray-100 hover:border-primary/10 transition-all duration-300 ease-out transform hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${newsletter.title}`}
    >
      {/* Newsletter Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <LazyImage
          src={newsletter.image}
          alt={newsletter.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-white text-lg font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Newsletter
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
          <span className="text-xs font-semibold text-gray-700">
            {new Date(newsletter.date).toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Newsletter Info */}
      <div className="p-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
          {newsletter.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {newsletter.description}
        </p>
      </div>
    </article>
  );
}

interface NewsletterModalProps {
  newsletter: Newsletter;
  onClose: () => void;
}

function NewsletterModal({ newsletter, onClose }: NewsletterModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close newsletter preview"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Newsletter Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={newsletter.image}
            alt={newsletter.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Newsletter Details */}
        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {new Date(newsletter.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })}
            </span>
          </div>

          <h2 id="newsletter-modal-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            {newsletter.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            {newsletter.description}
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">In This Issue:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Program updates and achievements</li>
              <li>• Community impact stories</li>
              <li>• Upcoming events and opportunities</li>
              <li>• Volunteer spotlights</li>
              <li>• Partnership announcements</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/^https?:\/\//i.test(newsletter.downloadUrl) ? (
              <Button
                variant="primary"
                size="lg"
                href={newsletter.downloadUrl}
                className="flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </Button>
            ) : newsletterConfig.substackProfileUrl ? (
              <Button variant="primary" size="lg" href={newsletterConfig.substackProfileUrl}>
                Read on Substack
              </Button>
            ) : (
              <Button variant="primary" size="lg" href="/contact">
                Get in touch
              </Button>
            )}
            <Button variant="outline" size="lg" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterSection;