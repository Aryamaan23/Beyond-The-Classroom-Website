import { PageTransition } from '../components/common';

function BharatYuva2026() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-cream to-white">
        <section className="relative py-10 sm:py-14 md:py-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-hero-pattern opacity-40" aria-hidden="true" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-secondary-dark to-amber-500 font-bold text-sm tracking-wider uppercase mb-3">
                New Launch
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Bharat Yuva Capacity Building Programme 2026
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
                By Beyond the Classroom, in collaboration with Atal Community Innovation Center-SGT University and
                Government of Rajasthan. Official launch date: 16 February.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
              <div className="rounded-2xl overflow-hidden shadow-card border-2 border-primary/15 bg-white hover:border-secondary/30 transition-colors">
                <img
                  src="/images/programs/bharat-yuva-2026-1.png"
                  alt="Bharat Yuva Capacity Building Programme 2026 inaugural event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card border-2 border-primary/15 bg-white hover:border-secondary/30 transition-colors">
                <img
                  src="/images/programs/bharat-yuva-2026-2.png"
                  alt="Participants and collaborators at Bharat Yuva Capacity Building Programme 2026"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card border-2 border-primary/15 border-t-4 border-t-secondary p-6 sm:p-8 md:p-10 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                This is not just another youth program. This is a movement to build India's next generation of grounded,
                policy-aware, action-oriented leaders.
              </p>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">At Beyond the Classroom, we believe</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>Capacity building does not begin in conference rooms.</li>
                  <li>It begins on the ground - in districts, panchayats, classrooms, and communities.</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                After engaging with youth, government officials, SHG leaders, and grassroots changemakers across regions
                like Dholpur, we realized one thing clearly: India does not lack talent. India lacks structured exposure.
                India lacks leadership pathways for young people outside elite circles.
              </p>

              <p className="text-gray-700 leading-relaxed font-medium">
                Bharat Yuva Capacity Building Programme 2026 is designed to bridge that gap.
              </p>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">What to Expect</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <li>Governance and Public Policy Foundations</li>
                  <li>District Administration Exposure</li>
                  <li>Grassroots Problem Solving</li>
                  <li>Leadership and Communication Mastery</li>
                  <li>Real-world Case Simulations</li>
                  <li>Direct Engagement with Practitioners</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Who This Is For</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>Youth leaders</li>
                  <li>Student changemakers</li>
                  <li>Aspiring policy professionals</li>
                  <li>Social impact enthusiasts</li>
                  <li>Anyone who believes leadership is responsibility</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                If you have ever felt that India's future needs stronger district-level leadership, stronger institutional
                capacity, and youth who understand governance beyond textbooks - this is for you.
              </p>

              <div className="bg-primary-soft rounded-xl p-5 sm:p-6 border border-primary/10">
                <p className="text-gray-800 font-medium mb-2">Dates officially go live next week.</p>
                <p className="text-gray-800 font-medium mb-2">Applications open immediately after announcement.</p>
                <p className="text-gray-800">
                  This is your opportunity to move from building to bridging to becoming.
                </p>
              </div>

              <p className="text-gray-800 font-semibold">
                Building capacity. Bridging systems. Becoming the leaders Bharat needs.
              </p>

              <p className="text-primary font-semibold">Stay tuned. Jai Hind.</p>

            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default BharatYuva2026;
