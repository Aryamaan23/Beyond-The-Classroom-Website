import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavigationProps {
  currentPath?: string;
}

const Navigation: React.FC<NavigationProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/publications', label: 'Publications' },
    { path: '/media', label: 'Media' },
    { path: '/partner', label: 'Partner With Us' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navShell = scrolled
    ? 'bg-white/98 shadow-[0_1px_0_0_rgba(15,61,107,0.06),0_8px_24px_-8px_rgba(15,61,107,0.12)]'
    : 'bg-white/90';

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-slate-200/80 transition-all duration-300 ${navShell} backdrop-blur-xl`}
      aria-label="Main navigation"
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent opacity-80"
        aria-hidden="true"
      />

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
            <Link
              to="/contact"
              className="ml-2 lg:ml-3 px-5 py-2.5 rounded-lg text-[14px] lg:text-[15px] font-semibold text-white bg-primary hover:bg-primary-dark shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-primary-dark/10"
            >
              Get Involved
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute right-0 top-0 h-full w-[min(100%,20rem)] max-w-[85vw] bg-white shadow-xl border-l border-slate-200 transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 bg-slate-50/50">
            <img src="/images/logo.png" alt="" className="h-9 w-auto" />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-3 py-4 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                  isActive(link.path)
                    ? 'text-primary bg-primary-soft border border-primary/10'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block mx-0 mt-4 py-3 rounded-lg text-center text-[15px] font-semibold text-white bg-primary hover:bg-primary-dark shadow-sm transition-colors border border-primary-dark/10"
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
