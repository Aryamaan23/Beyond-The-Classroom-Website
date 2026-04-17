import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, PageHero, PageTransition } from '../components/common';
import PublishedCaseStudiesList from '../components/home/PublishedCaseStudiesList';
import {
  uploadCaseStudy,
  fetchCaseStudies,
  authenticateCaseStudyEditor,
  deleteCaseStudy,
} from '../services/caseStudyService';
import type { CaseStudy } from '../types';

const FALLBACK_PROGRAM = 'Dholpur District Immersion Plan';
const EDITOR_AUTH_STORAGE_KEY = 'btc_editor_logged_in';
const EDITOR_EMAIL_STORAGE_KEY = 'btc_editor_email';
const EDITOR_AUTH_EVENT = 'btc-editor-auth-changed';

function CaseStudyEditor() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const [editorEmail, setEditorEmail] = useState('');
  const [editorPassword, setEditorPassword] = useState('');
  const [form, setForm] = useState({
    title: '',
    studentName: '',
    program: FALLBACK_PROGRAM,
    summary: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

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
      setItems(result.caseStudies || []);
    } else {
      setLoadError(result.error || 'Could not load case studies right now.');
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem(EDITOR_EMAIL_STORAGE_KEY);
    if (savedEmail) {
      setEditorEmail(savedEmail);
    }

    const syncFromStorage = () => {
      const stillLoggedIn = localStorage.getItem(EDITOR_AUTH_STORAGE_KEY) === 'true';
      if (!stillLoggedIn) {
        setIsAuthenticated(false);
        setEditorPassword('');
      }
    };

    window.addEventListener('storage', syncFromStorage);
    window.addEventListener(EDITOR_AUTH_EVENT, syncFromStorage);
    return () => {
      window.removeEventListener('storage', syncFromStorage);
      window.removeEventListener(EDITOR_AUTH_EVENT, syncFromStorage);
    };
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
    localStorage.setItem(EDITOR_AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(EDITOR_EMAIL_STORAGE_KEY, editorEmail.trim());
    window.dispatchEvent(new Event(EDITOR_AUTH_EVENT));
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
      attachments,
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
    setAttachments([]);
    setSubmitMessage('Case study uploaded successfully.');
    await load();
  };

  const handleDeleteCaseStudy = async (caseStudyId: string, caseStudyTitle: string) => {
    if (!isAuthenticated) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${caseStudyTitle}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setSubmitError('');
    setSubmitMessage('');
    setDeletingId(caseStudyId);
    const result = await deleteCaseStudy({
      caseStudyId,
      editorEmail: editorEmail.trim(),
      editorPassword,
    });
    setDeletingId('');

    if (!result.success) {
      setSubmitError(result.error || 'Delete failed. Please try again.');
      return;
    }

    setSubmitMessage('Case study deleted successfully.');
    await load();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-slate-50/90 via-white to-primary-soft/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6">
          <PageHero
            eyebrow="Editors only"
            title="Case study workspace"
            description="Sign in to upload case studies and attachments. Published items appear on Publications the same way for readers — full articles, downloads, and optional delete."
            className="mb-8"
          />
          <p className="text-center text-sm text-gray-600 mb-8">
            <Link to="/publications" className="font-semibold text-primary hover:underline">
              ← Back to Publications
            </Link>
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-primary/20 bg-cream p-6 sm:p-8 shadow-xl ring-1 ring-primary/10">
                {!isAuthenticated ? (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Editor login</h2>
                    <p className="text-sm text-gray-600 mb-6">
                      Only authorized editors can upload or remove case studies.
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
                          placeholder="Username"
                          autoComplete="username"
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
                          autoComplete="current-password"
                          required
                        />
                      </div>
                      {authError ? <p className="text-sm text-red-600">{authError}</p> : null}
                      <Button type="submit" size="md" variant="primary" disabled={authenticating}>
                        {authenticating ? 'Signing in...' : 'Login'}
                      </Button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                      Signed in as <span className="font-semibold">{editorEmail}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload a case study</h2>
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
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="case-file" className="block text-sm font-medium text-gray-700 mb-1">
                          Main file (PDF / DOC / DOCX)
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
                      <div>
                        <label htmlFor="case-attachments" className="block text-sm font-medium text-gray-700 mb-1">
                          Attachments (optional)
                        </label>
                        <input
                          id="case-attachments"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.webp"
                          onChange={(e) => setAttachments(Array.from(e.target.files || []))}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-secondary/20 file:px-3 file:py-1.5 file:text-primary-dark file:font-semibold hover:file:bg-secondary/30"
                        />
                        {attachments.length > 0 ? (
                          <p className="mt-1 text-xs text-gray-500">
                            {attachments.length} attachment{attachments.length === 1 ? '' : 's'} selected
                          </p>
                        ) : null}
                      </div>
                      {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
                      {submitMessage ? <p className="text-sm text-green-700">{submitMessage}</p> : null}
                      <Button type="submit" size="md" variant="primary" disabled={submitting || !canSubmit}>
                        {submitting ? 'Uploading...' : 'Upload case study'}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <PublishedCaseStudiesList
                variant="featured"
                items={items}
                loading={loading}
                loadError={loadError}
                onRefresh={() => void load()}
                showDelete={isAuthenticated}
                onDelete={handleDeleteCaseStudy}
                deletingId={deletingId}
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default CaseStudyEditor;
