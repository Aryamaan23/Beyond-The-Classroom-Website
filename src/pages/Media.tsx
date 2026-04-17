import { PageHero, PageTransition } from '../components/common';

const bharatYuvaCoveragePosts = [
  { id: 'DVP91lMkWsx', type: 'reel' as const },
  { id: 'DV-sYbdERU3', type: 'reel' as const },
  { id: 'DWRThDXCddw', type: 'reel' as const },
  { id: 'DVioXN3k5jX', type: 'reel' as const },
  { id: 'DVshk0UEWYD', type: 'reel' as const },
  { id: 'DVsy2r4kbiU', type: 'reel' as const },
  { id: 'DWBPzbKkZPY', type: 'reel' as const },
  { id: 'DV-s5BDEUR3', type: 'reel' as const },
  { id: 'DVvzmkVEYWF', type: 'reel' as const },
];

const summitCoveragePosts = [
  { id: 'DWoR-trkgyC', type: 'post' as const },
  { id: 'DWZFafDimPF', type: 'post' as const },
];

const udayanCareCoveragePosts = [
  { id: 'DUvY8i1EpRQ', type: 'reel' as const },
  { id: 'DTsamJ8Eunj', type: 'reel' as const },
];

const dholpurDriveCoveragePosts = [
  { id: 'DUnqln_knJy', type: 'reel' as const },
];

function Media() {
  return (
    <PageTransition>
      <div className="Media min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PageHero
            title="Media & Content"
            description="Explore our media coverage and upcoming podcast updates."
          />

          {/* Media Coverage Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 inline-flex flex-col gap-2">
              <span>Media Coverage</span>
              <span className="h-1 w-16 rounded-full bg-gradient-to-r from-secondary to-primary" aria-hidden />
            </h2>
            <div className="rounded-2xl bg-white border border-primary/10 shadow-card overflow-hidden">
              <div className="p-5 sm:p-7 border-b border-primary/10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Bharat Yuva Capacity Building Programme
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  A wholesome Instagram coverage gallery from our on-ground programme moments.
                </p>
              </div>
              <div className="w-full bg-black/5 p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {bharatYuvaCoveragePosts.map((item) => (
                    <div key={item.id} className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <iframe
                        title={`Bharat Yuva Instagram ${item.type} ${item.id}`}
                        src={`https://www.instagram.com/${item.type === 'post' ? 'p' : 'reel'}/${item.id}/embed`}
                        className="w-full h-[680px]"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 sm:mb-16">
            <div className="rounded-2xl bg-white border border-primary/10 shadow-card overflow-hidden">
              <div className="p-5 sm:p-7 border-b border-primary/10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  180 Degrees Consulting SRMIST Chennai Summit
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Instagram highlights from the summit coverage.
                </p>
              </div>
              <div className="w-full bg-black/5 p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {summitCoveragePosts.map((item) => (
                    <div key={item.id} className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <iframe
                        title={`180 Degrees Consulting SRMIST Chennai Summit Instagram ${item.type} ${item.id}`}
                        src={`https://www.instagram.com/${item.type === 'post' ? 'p' : 'reel'}/${item.id}/embed`}
                        className="w-full h-[720px]"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 sm:mb-16">
            <div className="rounded-2xl bg-white border border-primary/10 shadow-card overflow-hidden">
              <div className="p-5 sm:p-7 border-b border-primary/10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Udayan Care Initiative
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Instagram highlights from the Udayan Care initiative.
                </p>
              </div>
              <div className="w-full bg-black/5 p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {udayanCareCoveragePosts.map((item) => (
                    <div key={item.id} className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <iframe
                        title={`Udayan Care Initiative Instagram ${item.type} ${item.id}`}
                        src={`https://www.instagram.com/${item.type === 'post' ? 'p' : 'reel'}/${item.id}/embed`}
                        className="w-full h-[720px]"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 sm:mb-16">
            <div className="rounded-2xl bg-white border border-primary/10 shadow-card overflow-hidden">
              <div className="p-5 sm:p-7 border-b border-primary/10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Dholpur Drive
                </h3>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Instagram coverage from Dholpur Drive and district immersion moments.
                </p>
              </div>
              <div className="w-full bg-black/5 p-4 sm:p-6">
                <div className="w-full">
                  {dholpurDriveCoveragePosts.map((item) => (
                    <div key={item.id} className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <iframe
                        title={`Dholpur Drive Instagram ${item.type} ${item.id}`}
                        src={`https://www.instagram.com/${item.type === 'post' ? 'p' : 'reel'}/${item.id}/embed`}
                        className="w-full h-[720px]"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Podcast Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 inline-flex flex-col gap-2">
              <span>Podcast</span>
              <span className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-teal-500" aria-hidden />
            </h2>
            <div className="rounded-2xl border border-primary/10 bg-white p-6 sm:p-8 shadow-card">
              <p className="text-lg sm:text-xl font-semibold text-gray-900">Launching Soon</p>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Our podcast section is under development and will be live shortly.
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default Media;
