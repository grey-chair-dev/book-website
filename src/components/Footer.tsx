import React, { useState, useEffect } from 'react';
import { Mail, Globe, ExternalLink } from 'lucide-react';
import DataService from '../services/dataService';

interface Author {
  id: number;
  name: string;
  full_name: string;
  bio: string;
  image: string;
  location: string;
  social_media?: {
    email?: string;
    books_email?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    goodreads?: string;
    youtube?: string;
    tiktok?: string;
    newsletter?: string;
  };
  stats?: {
    books_in_series?: number;
    kingdoms?: string;
    heroes?: string;
    prophecy?: string;
  };
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorData = await DataService.getAuthor();
        setAuthor(authorData);
      } catch (error) {
        console.error('Error fetching author data for footer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, []);

  const footerLinks = {
    books: [
      { name: 'The Heir of Cebola', href: '/book/heir-of-cebola' },
      { name: 'The Fox Prince', href: '/book/fox-prince' },
      { name: 'The Storm-Veiled Light', href: '/book/storm-veiled-light' },
      { name: 'All Books', href: '/books' }
    ],
    about: [
      { name: 'Author Biography', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' }
    ]
  };

  // Generate social links from author data
  const getSocialLinks = () => {
    if (!author?.social_media) return [];
    
    const socialLinks: Array<{
      name: string;
      href: string;
      icon: React.ComponentType<any> | (() => JSX.Element);
    }> = [];
    
    if (author.social_media.website) {
      socialLinks.push({
        name: 'Website',
        href: author.social_media.website,
        icon: ExternalLink
      });
    }
    
    if (author.social_media.twitter) {
      socialLinks.push({
        name: 'Twitter/X',
        href: author.social_media.twitter,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        )
      });
    }
    
    if (author.social_media.instagram) {
      socialLinks.push({
        name: 'Instagram',
        href: author.social_media.instagram,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
          </svg>
        )
      });
    }
    
    if (author.social_media.facebook) {
      socialLinks.push({
        name: 'Facebook',
        href: author.social_media.facebook,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      });
    }
    
    if (author.social_media.linkedin) {
      socialLinks.push({
        name: 'LinkedIn',
        href: author.social_media.linkedin,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      });
    }
    
    if (author.social_media.goodreads) {
      socialLinks.push({
        name: 'Goodreads',
        href: author.social_media.goodreads,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.5 0C5.149 0 0 5.149 0 11.5S5.149 23 11.5 23 23 17.851 23 11.5 17.851 0 11.5 0zm0 20C6.262 20 2 15.738 2 11.5S6.262 3 11.5 3 21 7.262 21 11.5 16.738 20 11.5 20z"/>
            <path d="M8.5 7.5h6v1h-6v-1zm0 2h6v1h-6v-1zm0 2h6v1h-6v-1z"/>
          </svg>
        )
      });
    }
    
    if (author.social_media.youtube) {
      socialLinks.push({
        name: 'YouTube',
        href: author.social_media.youtube,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        )
      });
    }
    
    if (author.social_media.tiktok) {
      socialLinks.push({
        name: 'TikTok',
        href: author.social_media.tiktok,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        )
      });
    }
    
    if (author.social_media.newsletter) {
      socialLinks.push({
        name: 'Newsletter',
        href: author.social_media.newsletter,
        icon: () => (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        )
      });
    }
    
    return socialLinks;
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleLinkClick(href);
    }
  };

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Author Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">
              {loading ? 'Loading...' : (author?.name || 'C.E. Scott')}
            </h3>
            <p className="text-secondary-300 mb-4">
              {loading ? 'Loading author information...' : (author?.bio || 'Fantasy author and creator of the Heirs of Eleusa series. Wife, high school campus minister, and writer from Cincinnati, OH.')}
            </p>
            <div className="flex items-center gap-2 text-secondary-300">
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">
                {author?.location ? `${author.location} • Epic Fantasy Series` : 'Epic Fantasy Series'}
              </span>
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
                    onClick={() => handleLinkClick(link.href)}
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
                    onClick={() => handleLinkClick(link.href)}
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
            <div className="flex flex-wrap items-center gap-4">
              {loading ? (
                <div className="text-secondary-300 text-sm">Loading social links...</div>
              ) : (
                getSocialLinks().map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                    tabIndex={0}
                    aria-label={`Visit ${link.name}`}
                  >
                    {React.createElement(link.icon, { className: "h-4 w-4", "aria-hidden": true })}
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))
              )}
            </div>

            <div className="flex items-center gap-4">
              {author?.social_media?.email && (
                <a
                  href={`mailto:${author.social_media.email}`}
                  className="text-secondary-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                  tabIndex={0}
                  aria-label={`Send email to ${author.social_media.email}`}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">Contact</span>
                </a>
              )}
              {author?.social_media?.books_email && author.social_media.books_email !== author.social_media.email && (
                <a
                  href={`mailto:${author.social_media.books_email}`}
                  className="text-secondary-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                  tabIndex={0}
                  aria-label={`Send email to ${author.social_media.books_email}`}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">Books</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-secondary-300 text-sm">
            <div>
              <p>&copy; {currentYear} C.E. Scott. All rights reserved.</p>
              <p className="mt-1">Heirs of Eleusa Series</p>
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