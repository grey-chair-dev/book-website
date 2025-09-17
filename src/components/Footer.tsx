import React from 'react';
import { Mail, Globe, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    books: [
      { name: 'The Hunger Games', href: '#books' },
      { name: 'The Underland Chronicles', href: '#series' },
      { name: 'Latest Releases', href: '#news' },
      { name: 'Audio Books', href: '#audiobooks' }
    ],
    resources: [
      { name: 'Educational Materials', href: '#resources' },
      { name: 'Discussion Guides', href: '#resources' },
      { name: 'Lesson Plans', href: '#resources' },
      { name: 'Download Center', href: '#resources' }
    ],
    about: [
      { name: 'Author Biography', href: '#about' },
      { name: 'Awards & Recognition', href: '#testimonials' },
      { name: 'Press & Media', href: '#news' },
      { name: 'Contact', href: '#contact' }
    ]
  };

  const socialLinks = [
    { name: 'Publisher Website', href: 'https://www.scholastic.com', icon: ExternalLink },
    { name: 'Goodreads', href: 'https://www.goodreads.com/author/show/153394.Suzanne_Collins', icon: ExternalLink },
    { name: 'Amazon Author Page', href: 'https://www.amazon.com/Suzanne-Collins/e/B001H6U7G0', icon: ExternalLink }
  ];

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (href.startsWith('#')) {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Author Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">
              Suzanne Collins
            </h3>
            <p className="text-secondary-300 mb-4">
              Internationally bestselling author of The Hunger Games trilogy, 
              The Underland Chronicles, and other acclaimed works for young readers.
            </p>
            <div className="flex items-center gap-2 text-secondary-300">
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">Available in 55+ languages</span>
            </div>
          </div>

          {/* Books */}
          <div>
            <h4 className="font-semibold mb-4">Books</h4>
            <ul className="space-y-2">
              {footerLinks.books.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors duration-200 text-sm"
                    tabIndex={0}
                    aria-label={`Navigate to ${link.name}`}
                    onKeyDown={(e) => handleKeyDown(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors duration-200 text-sm"
                    tabIndex={0}
                    aria-label={`Navigate to ${link.name}`}
                    onKeyDown={(e) => handleKeyDown(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Contact */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors duration-200 text-sm"
                    tabIndex={0}
                    aria-label={`Navigate to ${link.name}`}
                    onKeyDown={(e) => handleKeyDown(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-secondary-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                  tabIndex={0}
                  aria-label={`Visit ${link.name}`}
                >
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">{link.name}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:contact@suzannecollins.com"
                className="text-secondary-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                tabIndex={0}
                aria-label="Send email to contact@suzannecollins.com"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm">Contact</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-secondary-300 text-sm">
            <div>
              <p>&copy; {currentYear} Suzanne Collins. All rights reserved.</p>
              <p className="mt-1">Published by Scholastic Inc.</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="hover:text-white transition-colors duration-200"
                tabIndex={0}
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-white transition-colors duration-200"
                tabIndex={0}
                aria-label="Terms of Use"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 