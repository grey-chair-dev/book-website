import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar } from 'lucide-react';
import { books } from '../data/books';

const BookGallery: React.FC = () => {

  const handleKeyDown = (event: React.KeyboardEvent, bookId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Navigation will be handled by the Link component
    }
  };

  return (
    <section id="books" className="bg-secondary-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            The Heirs of Eleusa Series
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Step into the world of Eleusa, where heroes must claim their destinies to fulfill the Great Prophecy and save their kingdoms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              onKeyDown={(e) => handleKeyDown(e, book.id)}
              tabIndex={0}
              aria-label={`View details for ${book.title}`}
            >
              <div className="space-y-4">
                <div className="relative flex justify-center">
                  <div className="book-card-shape">
                    <div className="book-card-cover">
                      <img
                        src={`/images/covers/${book.cover}.avif`}
                        alt={`${book.title} book cover`}
                        loading="lazy"
                      />
                    </div>
                    <div className="book-card-spine"></div>
                    <div className="book-card-pages"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-600 font-medium">
                      {book.series}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-secondary-400" aria-hidden="true" />
                      <span className="text-xs text-secondary-500">{book.year}</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-secondary-900 text-lg leading-tight">
                    {book.title}
                  </h3>

                  <p className="text-secondary-600 text-sm line-clamp-3">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-end">
                    <ExternalLink className="h-4 w-4 text-secondary-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => document.getElementById('series')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary inline-flex items-center gap-2"
            tabIndex={0}
            aria-label="Learn more about book series"
          >
            Explore Series
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookGallery; 