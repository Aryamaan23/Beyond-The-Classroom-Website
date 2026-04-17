import { useState } from 'react';
import { LazyImage } from '../common';

interface Article {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  url: string;
  publishDate: string;
}

interface ArticleGridProps {
  articles: Article[];
}

function ArticleGrid({ articles }: ArticleGridProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <div className="article-grid">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Articles and press coverage">
        {articles.map((article) => (
          <article key={article.id} role="listitem">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card group bg-white rounded-xl shadow-card border border-primary/5 overflow-hidden hover:shadow-card-hover hover:border-primary/10 transition-all duration-300 ease-out transform hover:scale-[1.01] block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Read article: ${article.title}`}
            >
              <div className="relative overflow-hidden aspect-video">
                <LazyImage
                  src={article.thumbnail}
                  alt={`${article.title} article thumbnail`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 ease-in-out flex items-center justify-center" aria-hidden="true">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Read More
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {article.excerpt}
                </p>
                <time className="text-gray-500 text-xs" dateTime={article.publishDate}>
                  {new Date(article.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ArticleGrid;
