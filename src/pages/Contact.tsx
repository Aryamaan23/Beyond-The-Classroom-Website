import { ContactForm, ContactInfo } from '../components/contact';
import { PageHero, PageTransition } from '../components/common';

function Contact() {
  return (
    <PageTransition>
      <div className="Contact min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PageHero
            title="Contact Us"
            description="Get in touch with us to learn more about our programs, partnerships, or how you can get involved in creating grassroots impact."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;
