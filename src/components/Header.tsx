import React, { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminPanel from '../cms/AdminPanel';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdminToggle = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleMenu();
    }
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Book 1', href: '/book/the-heir-of-cebola' },
    { name: 'Book 2', href: '/book/the-fox-prince' },
    { name: 'Book 3', href: '/book/the-storm-veiled-light' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold text-primary-700">
              Heirs of Eleusa
            </h1>
            <p className="text-xs text-secondary-500 -mt-1">Epic Fantasy Series</p>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className="text-secondary-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      tabIndex={0}
                      aria-label={`Navigate to ${item.name}`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-secondary-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      tabIndex={0}
                      aria-label={`Navigate to ${item.name} section`}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:hidden">
            <button
              onClick={handleToggleMenu}
              onKeyDown={handleKeyDown}
              className="text-secondary-700 hover:text-primary-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              tabIndex={0}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-secondary-200">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className="text-secondary-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      tabIndex={0}
                      aria-label={`Navigate to ${item.name}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-secondary-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      tabIndex={0}
                      aria-label={`Navigate to ${item.name} section`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Admin Button */}
      <button
        onClick={handleAdminToggle}
        className="fixed bottom-4 right-4 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-40"
        title="Content Management"
        aria-label="Open content management panel"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Admin Panel */}
      {isAdminOpen && (
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      )}
    </header>
  );
};

export default Header; 