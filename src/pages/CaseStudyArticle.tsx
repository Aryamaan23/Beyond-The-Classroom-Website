import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, PageTransition } from '../components/common';
import { fetchCaseStudies } from '../services/caseStudyService';
import type { CaseStudy } from '../types';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function CaseStudyArticle() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [article, setArticle] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        setError('Invalid case study link.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      const result = await fetchCaseStudies();

      if (!result.success || !result.caseStudies) {
        setError(result.error || 'Could not load this article right now.');
        setLoading(false);
        return;
      }

      const matched = result.caseStudies.find((item) => item.id === id);
      if (!matched) {
        setError('Case study not found.');
        setLoading(false);
        return;
      }

      setArticle(matched);
      setLoading(false);
    };

    void loadArticle();
  }, [id]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white via-primary-soft/20 to-amber-50/30">
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                Loading article...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                <p>{error}</p>
                <div className="mt-4">
                  <Button size="sm" variant="outline" href="/publications">
                    Back to publications
                  </Button>
                </div>
              </div>
            ) : article ? (
              <article className="rounded-2xl border border-primary/10 bg-white shadow-card p-6 sm:p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary mb-3">{article.program}</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{article.title}</h1>
                <p className="text-sm text-gray-600 mt-3">
                  By {article.studentName} | Published on {formatDate(article.submittedAt)}
                </p>

                <div className="my-6 h-px bg-gradient-to-r from-primary/30 to-transparent" aria-hidden="true" />

                <section className="prose prose-sm sm:prose-base max-w-none text-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Article</h2>
                  <p className="leading-relaxed whitespace-pre-line">{article.summary}</p>
                </section>

                {article.attachments && article.attachments.length > 0 ? (
                  <section className="mt-8 rounded-xl border border-primary/15 bg-primary-soft/30 p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Attachments</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.attachments.map((attachment) => (
                        <Button key={attachment.id} size="sm" variant="outline" href={attachment.url}>
                          Download {attachment.name}
                        </Button>
                      ))}
                    </div>
                  </section>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="sm" variant="primary" href="/publications">
                    Back to all case studies
                  </Button>
                  <Button size="sm" variant="outline" href={article.fileUrl}>
                    View original uploaded file
                  </Button>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default CaseStudyArticle;
