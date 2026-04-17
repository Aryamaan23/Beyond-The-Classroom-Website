interface PodcastEmbedProps {
  title: string;
  description: string;
  embedUrl: string;
  platform: 'spotify' | 'youtube';
}

function PodcastEmbed({ title, description, embedUrl, platform }: PodcastEmbedProps) {
  return (
    <article className="podcast-embed bg-white rounded-xl shadow-card border border-primary/5 p-4 sm:p-6 mb-6">
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4">{description}</p>
      
      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: platform === 'spotify' ? '152px' : '56.25%' }}>
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title={`${title} podcast episode on ${platform}`}
          aria-label={`Listen to ${title}: ${description}`}
        />
      </div>
    </article>
  );
}

export default PodcastEmbed;
