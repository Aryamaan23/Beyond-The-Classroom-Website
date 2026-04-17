import { Button } from '../common';
import type { CaseStudy } from '../../types';

export type PublishedCaseStudiesVariant = 'default' | 'featured';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export type PublishedCaseStudiesListProps = {
  variant?: PublishedCaseStudiesVariant;
  items: CaseStudy[];
  loading: boolean;
  loadError: string;
  onRefresh: () => void;
  showDelete?: boolean;
  onDelete?: (caseStudyId: string, caseStudyTitle: string) => void;
  deletingId?: string;
};

function PublishedCaseStudiesList({
  variant = 'default',
  items,
  loading,
  loadError,
  onRefresh,
  showDelete = false,
  onDelete,
  deletingId = '',
}: PublishedCaseStudiesListProps) {
  const isFeatured = variant === 'featured';

  return (
    <div>
      <div className={`flex items-center justify-between ${isFeatured ? 'mb-6' : 'mb-4'}`}>
        <h3
          className={`font-semibold text-gray-900 ${isFeatured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}
        >
          Published case studies
        </h3>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div
          className={`rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 ${
            isFeatured ? 'p-12 text-base' : 'p-8'
          }`}
        >
          Loading case studies...
        </div>
      ) : loadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{loadError}</div>
      ) : items.length === 0 ? (
        <div
          className={`rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 ${
            isFeatured ? 'p-12 text-base' : 'p-8'
          }`}
        >
          No submissions yet. Case studies will appear here once editors publish them.
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 ${
            isFeatured ? 'sm:grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10' : 'md:grid-cols-2 gap-5'
          }`}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className={`group block rounded-2xl border bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${
                isFeatured
                  ? 'border-primary/15 p-7 sm:p-9 md:min-h-[320px] flex flex-col border-2 rounded-3xl bg-gradient-to-br from-white via-white to-primary-soft/40 ring-1 ring-primary/5'
                  : 'border-primary/10 p-5'
              }`}
            >
              <p
                className={`font-semibold uppercase tracking-wide text-secondary mb-2 ${
                  isFeatured ? 'text-xs sm:text-sm' : 'text-xs'
                }`}
              >
                {item.program}
              </p>
              <h4
                className={`font-bold text-gray-900 leading-snug ${
                  isFeatured ? 'text-xl sm:text-2xl md:text-[1.65rem]' : 'text-base sm:text-lg font-semibold'
                }`}
              >
                {item.title}
              </h4>
              <p className={`text-gray-500 mt-2 ${isFeatured ? 'text-sm sm:text-base' : 'text-sm'}`}>
                By {item.studentName} · {formatDate(item.submittedAt)}
              </p>
              <p
                className={`text-gray-700 mt-4 flex-1 ${
                  isFeatured ? 'text-base sm:text-lg leading-relaxed line-clamp-6' : 'text-sm line-clamp-4'
                }`}
              >
                {item.summary}
              </p>
              {item.attachments?.length ? (
                <p className="text-xs text-gray-500 mt-2">
                  {item.attachments.length} downloadable attachment{item.attachments.length === 1 ? '' : 's'}
                </p>
              ) : null}
              <div className={`mt-auto flex flex-wrap gap-2 ${isFeatured ? 'pt-6 gap-3' : 'mt-4'}`}>
                <Button
                  size={isFeatured ? 'md' : 'sm'}
                  variant="primary"
                  href={`/publications/${item.id}`}
                  className={isFeatured ? 'min-w-[8rem]' : ''}
                >
                  Read more
                </Button>
                <Button
                  size={isFeatured ? 'md' : 'sm'}
                  variant="outline"
                  href={item.fileUrl}
                  className={isFeatured ? 'min-w-[8rem]' : ''}
                >
                  View original file
                </Button>
                {showDelete && onDelete ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(item.id, item.title)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? 'Deleting...' : 'Delete'}
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublishedCaseStudiesList;
