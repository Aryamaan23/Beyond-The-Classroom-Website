import { Link } from 'react-router-dom';
import { Button, PageTransition } from '../components/common';

function NotFound() {
  return (
    <PageTransition>
      <div className="NotFound">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-soft/80 via-white to-amber-50/60 border border-primary/15 shadow-xl shadow-primary/10">
          <div className="absolute -top-20 right-10 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative">
          <img 
            src="/images/logo.png" 
            alt="Beyond the Classroom" 
            className="h-16 sm:h-20 w-auto mx-auto mb-6 drop-shadow-md"
          />
          <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-teal-600 mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto font-medium">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default NotFound;
