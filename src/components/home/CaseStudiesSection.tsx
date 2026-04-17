import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Button } from '../common';
import {
  uploadCaseStudy,
  fetchCaseStudies,
  authenticateCaseStudyEditor,
} from '../../services/caseStudyService';
import type { CaseStudy } from '../../types';

const FALLBACK_PROGRAM = 'Dholpur District Immersion Plan';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function CaseStudiesSection() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [editorEmail, setEditorEmail] = useState('');
  const [editorPassword, setEditorPassword] = useState('');
  const [form, setForm] = useState({
    title: '',
    studentName: '',
    program: FALLBACK_PROGRAM,
    summary: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(
      form.title.trim() &&
        form.studentName.trim() &&
        form.program.trim() &&
        form.summary.trim() &&
        file
    );
  }, [file, form]);

  const load = async () => {
    setLoading(true);
    setLoadError('');
    const result = await fetchCaseStudies();
    if (result.success) {
      setItems(result.caseStudies);
    } else {
      setLoadError(result.error || 'Could not load case studies right now.');
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const handleEditorLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!editorEmail.trim() || !editorPassword.trim()) {
      setAuthError('Enter username and password to continue.');
      return;
    }

    setAuthenticating(true);
    const result = await authenticateCaseStudyEditor({
      editorEmail: editorEmail.trim(),
      editorPassword: editorPassword,
    });
    setAuthenticating(false);

    if (!result.success) {
      setAuthError(result.error || 'Invalid login credentials.');
      return;
    }

    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    if (!canSubmit || !file) {
      setSubmitError('Please fill all fields and attach the case study file.');
      return;
    }

    setSubmitting(true);

    const result = await uploadCaseStudy({
      title: form.title.trim(),
      studentName: form.studentName.trim(),
      program: form.program.trim(),
      summary: form.summary.trim(),
      file,
      editorEmail: editorEmail.trim(),
      editorPassword,
    });

    setSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error || 'Upload failed. Please try again.');
      return;
    }

    setForm({
      title: '',
      studentName: '',
      program: FALLBACK_PROGRAM,
      summary: '',
    });
    setFile(null);
    setSubmitMessage('Case study uploaded successfully.');
    await load();
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white" aria-labelledby="case-studies-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">
            Student Submissions
          </span>
          <h2 id="case-studies-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Case Studies
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-sm sm:text-base">
            Upload programme-wise student case studies (for example, Dholpur District Immersion Plan). Submissions are
            stored in Google Drive and displayed here as report cards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-primary/10 bg-cream p-5 sm:p-6 shadow-card">
              {!isAuthenticated ? (
                <>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Editor login required</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Only authorized editors can upload case studies. Published case studies remain public.
                  </p>
                  <form onSubmit={handleEditorLogin} className="space-y-4" noValidate>
                    <div>
                      <label htmlFor="editor-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        id="editor-email"
                        type="text"
                        value={editorEmail}
                        onChange={(e) => setEditorEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="AryamaanED@BTC"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="editor-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        id="editor-password"
                        type="password"
                        value={editorPassword}
                        onChange={(e) => setEditorPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        required
                      />
                    </div>
                    {authError ? <p className="text-sm text-red-600">{authError}</p> : null}
                    <Button type="submit" size="md" variant="primary" disabled={authenticating}>
                      {authenticating ? 'Signing in...' : 'Login to upload'}
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                    Logged in as <span className="font-semibold">{editorEmail}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Upload a case study</h3>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label htmlFor="case-title" className="block text-sm font-medium text-gray-700 mb-1">
                        Case study title
                      </label>
                      <input
                        id="case-title"
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="District governance exposure reflections"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="case-student" className="block text-sm font-medium text-gray-700 mb-1">
                        Student name
                      </label>
                      <input
                        id="case-student"
                        type="text"
                        value={form.studentName}
                        onChange={(e) => setForm((prev) => ({ ...prev, studentName: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="Student name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="case-program" className="block text-sm font-medium text-gray-700 mb-1">
                        Programme
                      </label>
                      <input
                        id="case-program"
                        type="text"
                        value={form.program}
                        onChange={(e) => setForm((prev) => ({ ...prev, program: e.target.value }))}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="case-summary" className="block text-sm font-medium text-gray-700 mb-1">
                        Summary
                      </label>
                      <textarea
                        id="case-summary"
                        value={form.summary}
                        onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
                        rows={4}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="What was learned, observed, and proposed?"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="case-file" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload file (PDF / DOC / DOCX)
                      </label>
                      <input
                        id="case-file"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-primary file:font-semibold hover:file:bg-primary/20"
                        required
                      />
                      {file ? <p className="mt-1 text-xs text-gray-500">Selected: {file.name}</p> : null}
                    </div>
                    {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
                    {submitMessage ? <p className="text-sm text-green-700">{submitMessage}</p> : null}
                    <Button type="submit" size="md" variant="primary" disabled={submitting || !canSubmit}>
                      {submitting ? 'Uploading...' : 'Upload Case Study'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Published case studies</h3>
              <Button variant="outline" size="sm" onClick={() => void load()}>
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                Loading case studies...
              </div>
            ) : loadError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{loadError}</div>
            ) : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                No submissions yet. Upload the first case study using the form.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-primary/10 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary mb-2">{item.program}</p>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      By {item.studentName} · {formatDate(item.submittedAt)}
                    </p>
                    <p className="text-sm text-gray-700 mt-3 line-clamp-4">{item.summary}</p>
                    <div className="mt-4">
                      <span className="inline-flex items-center rounded-lg border border-primary/30 px-3 py-1.5 text-sm font-semibold text-primary">
                        View submission
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
