import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavigationProps {
  currentPath?: string;
}

const Navigation: React.FC<NavigationProps> = () => {
  const EDITOR_AUTH_STORAGE_KEY = 'btc_editor_logged_in';
  const EDITOR_AUTH_EVENT = 'btc-editor-auth-changed';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isAboutDesktopOpen, setIsAboutDesktopOpen] = useState(false);
  const [isEditorLoggedIn, setIsEditorLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const aboutMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/programs', label: 'Programs' },
    { path: '/publications', label: 'Publications' },
    { path: '/media', label: 'Media' },
    { path: '/partner', label: 'Partner With Us' },
  ];
  const aboutLinks = [
    { path: '/about', label: 'About Overview' },
    { path: '/about/mentors', label: 'Our Mentors' },
    { path: '/about/messages', label: 'Founders / Co-founder / ED Message' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAboutMenuOpen(false);
    setIsAboutDesktopOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        setIsAboutDesktopOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!aboutMenuRef.current) return;
      if (!aboutMenuRef.current.contains(event.target as Node)) {
        setIsAboutDesktopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const syncEditorAuthState = () => {
      setIsEditorLoggedIn(localStorage.getItem(EDITOR_AUTH_STORAGE_KEY) === 'true');
    };

    syncEditorAuthState();

    const handleStorage = () => syncEditorAuthState();
    const handleEditorAuthEvent = () => syncEditorAuthState();

    window.addEventListener('storage', handleStorage);
    window.addEventListener(EDITOR_AUTH_EVENT, handleEditorAuthEvent);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EDITOR_AUTH_EVENT, handleEditorAuthEvent);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isAboutActive = location.pathname.startsWith('/about');

  const handleEditorLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout from the editor workspace?');
    if (!confirmed) return;
    localStorage.removeItem(EDITOR_AUTH_STORAGE_KEY);
    localStorage.removeItem('btc_editor_email');
    window.dispatchEvent(new Event(EDITOR_AUTH_EVENT));
    setIsMenuOpen(false);
  };

  const navShell = scrolled
    ? 'bg-white shadow-[0_1px_0_0_rgba(15,61,107,0.08),0_10px_30px_-10px_rgba(15,61,107,0.18)]'
    : 'bg-white shadow-[0_1px_0_0_rgba(15,61,107,0.08),0_8px_24px_-12px_rgba(15,61,107,0.16)]';

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-slate-200 transition-all duration-300 ${navShell}`}
      aria-label="Main navigation"
    >
      <div className="absolute inset-0 bg-white -z-10" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-[4.5rem]">
          <Link
            to="/"
            className="flex items-center rounded-lg p-1 -m-1 transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Beyond the Classroom - Home"
          >
            <img
              src="/images/logo.png"
              alt="Beyond the Classroom - Where ambition meets direction"
              className="h-11 sm:h-[3.25rem] w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            <div className="relative group" ref={aboutMenuRef}>
              <button
                type="button"
                onClick={() => setIsAboutDesktopOpen((prev) => !prev)}
                onMouseEnter={() => setIsAboutDesktopOpen(true)}
                className={`px-3.5 py-2 rounded-lg text-[14px] lg:text-[15px] font-medium tracking-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isAboutActive
                    ? 'text-primary bg-primary-soft/90 border border-primary/15 shadow-sm'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50/90 border border-transparent'
                }`}
                aria-haspopup="menu"
                aria-expanded={isAboutDesktopOpen}
              >
                About
                <span className="ml-1.5 text-xs">▾</span>
              </button>
              <div
                className={`absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white/98 p-2 shadow-xl transition-all duration-200 ${
                  isAboutDesktopOpen
                    ? 'visible opacity-100 pointer-events-auto'
                    : 'pointer-events-none invisible opacity-0'
                }`}
              >
                {aboutLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsAboutDesktopOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-soft text-primary font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-[14px] lg:text-[15px] font-medium tracking-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive(link.path)
                    ? 'text-primary bg-primary-soft/90 border border-primary/15 shadow-sm'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50/90 border border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-3 lg:ml-4 h-6 w-px bg-slate-200/90" aria-hidden="true" />
            {isEditorLoggedIn ? (
              <button
                type="button"
                onClick={handleEditorLogout}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] xl:text-[14px] font-semibold text-rose-700 border-2 border-rose-300 bg-rose-50 hover:bg-rose-100 hover:border-rose-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                title="Logout from editor workspace"
              >
                <svg className="w-4 h-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
                </svg>
                Logout
              </button>
            ) : (
              <Link
                to="/publications/editor"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] xl:text-[14px] font-semibold text-primary border-2 border-primary/30 bg-primary-soft/50 hover:bg-primary-soft hover:border-primary/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                title="Editor login for case study uploads"
              >
                <svg className="w-4 h-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Editor login
              </Link>
            )}
            <Link
              to="/contact"
              className="ml-1 lg:ml-2 px-5 py-2.5 rounded-lg text-[14px] lg:text-[15px] font-semibold text-white bg-primary hover:bg-primary-dark shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-primary-dark/10"
            >
              Get Involved
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-black bg-white border border-slate-300 shadow-sm hover:bg-slate-100 hover:border-slate-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-[3px]"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute right-0 top-0 h-full w-[min(100%,20rem)] max-w-[85vw] bg-gradient-to-b from-[#081523] via-[#0b2340] to-[#081523] text-white shadow-2xl border-l border-white/15 transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-white/5">
            <img src="/images/logo.png" alt="" className="h-9 w-auto" />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-white/90 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-3 py-4 space-y-1">
            <button
              type="button"
              onClick={() => setIsAboutMenuOpen((prev) => !prev)}
              className={`w-full text-left px-4 py-3 rounded-lg text-[15px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-inset ${
                isAboutActive
                  ? 'text-white bg-secondary/20 border border-secondary/40'
                  : 'text-white/90 hover:bg-white/10 border border-white/10'
              }`}
              aria-expanded={isAboutMenuOpen}
              aria-controls="mobile-about-submenu"
            >
              <span className="flex items-center justify-between">
                <span>About</span>
                <span className="text-xs">{isAboutMenuOpen ? '▴' : '▾'}</span>
              </span>
            </button>
            {isAboutMenuOpen ? (
              <div id="mobile-about-submenu" className="ml-3 mt-1 space-y-1 border-l border-white/20 pl-2">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive(link.path)
                        ? 'text-white bg-secondary/25 border border-secondary/45'
                        : 'text-white/85 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-[15px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-inset ${
                  isActive(link.path)
                    ? 'text-white bg-secondary/20 border border-secondary/40'
                    : 'text-white/90 hover:bg-white/10 border border-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isEditorLoggedIn ? (
              <button
                type="button"
                onClick={handleEditorLogout}
                className="w-full flex items-center justify-center gap-2 mx-0 mt-3 py-3 rounded-lg text-[15px] font-semibold text-rose-700 border-2 border-rose-300 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
                </svg>
                Logout
              </button>
            ) : (
              <Link
                to="/publications/editor"
                className="flex items-center justify-center gap-2 mx-0 mt-3 py-3 rounded-lg text-[15px] font-semibold text-white border-2 border-secondary/55 bg-secondary/30 hover:bg-secondary/40 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Editor login
              </Link>
            )}
            <Link
              to="/contact"
              className="block mx-0 mt-3 py-3 rounded-lg text-center text-[15px] font-semibold text-primary-dark bg-secondary hover:bg-secondary-light shadow-sm transition-colors border border-secondary-dark/30"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
