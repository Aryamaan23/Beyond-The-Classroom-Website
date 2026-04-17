import { PodcastEmbed, ArticleGrid } from '../components/media';
import { PageHero, PageTransition } from '../components/common';
import { podcastEpisodes, articles } from '../data/content';

function Media() {
  return (
    <PageTransition>
      <div className="Media min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PageHero
            title="Media & Content"
            description="Listen to our podcasts and read our latest articles and press coverage."
          />

          {/* Podcast Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 inline-flex flex-col gap-2">
              <span>Podcast</span>
              <span className="h-1 w-16 rounded-full bg-gradient-to-r from-secondary to-primary" aria-hidden />
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Tune in to conversations with changemakers, leaders, and community members.
            </p>
            {podcastEpisodes.map((episode, index) => (
              <PodcastEmbed
                key={index}
                title={episode.title}
                description={episode.description}
                embedUrl={episode.embedUrl}
                platform="spotify"
              />
            ))}
          </section>

          {/* Articles Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 inline-flex flex-col gap-2">
              <span>Articles & Press</span>
              <span className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-teal-500" aria-hidden />
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Read about our work, impact stories, and media coverage.
            </p>
            <ArticleGrid articles={articles} />
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default Media;
