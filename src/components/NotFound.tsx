import React from 'react';
import { Home, ArrowLeft, BookOpen } from 'lucide-react';

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-8 w-8 text-primary-600" aria-hidden="true" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-secondary-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="btn-primary inline-flex items-center gap-2 w-full justify-center"
            tabIndex={0}
            aria-label="Go to homepage"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            Go to Homepage
          </button>
          
          <button
            onClick={handleGoBack}
            className="btn-secondary inline-flex items-center gap-2 w-full justify-center"
            tabIndex={0}
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Go Back
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">
            Popular Pages
          </h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <a
              href="#books"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              tabIndex={0}
              aria-label="View books"
            >
              Books
            </a>
            <a
              href="#about"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              tabIndex={0}
              aria-label="About the Heirs of Eleusa"
            >
              About
            </a>
            <a
              href="#resources"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              tabIndex={0}
              aria-label="Educational resources"
            >
              Resources
            </a>
            <a
              href="#contact"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              tabIndex={0}
              aria-label="Contact us"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 