import React from 'react';
import { ExternalLink, Star, Calendar, BookOpen } from 'lucide-react';

const BookGallery: React.FC = () => {
  const books = [
    {
      title: 'The Hunger Games',
      series: 'The Hunger Games',
      year: '2008',
      description: 'In a dystopian future, Katniss Everdeen volunteers to take her sister\'s place in a televised battle to the death.',
      rating: 5,
      cover: 'hunger-games-1',
      featured: true
    },
    {
      title: 'Catching Fire',
      series: 'The Hunger Games',
      year: '2009',
      description: 'Katniss and Peeta must navigate the Quarter Quell, a special edition of the Hunger Games.',
      rating: 5,
      cover: 'hunger-games-2'
    },
    {
      title: 'Mockingjay',
      series: 'The Hunger Games',
      year: '2010',
      description: 'Katniss becomes the symbol of rebellion as the districts rise against the Capitol.',
      rating: 5,
      cover: 'hunger-games-3'
    },
    {
      title: 'The Ballad of Songbirds and Snakes',
      series: 'The Hunger Games',
      year: '2020',
      description: 'A prequel exploring the origins of the Hunger Games and the rise of President Snow.',
      rating: 4,
      cover: 'hunger-games-prequel'
    },
    {
      title: 'Sunrise on the Reaping',
      series: 'The Hunger Games',
      year: '2025',
      description: 'The highly anticipated new novel exploring the origins of the Games and the world of Panem.',
      rating: 5,
      cover: 'hunger-games-new',
      featured: true
    },
    {
      title: 'Gregor the Overlander',
      series: 'The Underland Chronicles',
      year: '2003',
      description: 'Gregor discovers a hidden world beneath New York City filled with giant creatures.',
      rating: 4,
      cover: 'underland-1'
    },
    {
      title: 'Gregor and the Prophecy of Bane',
      series: 'The Underland Chronicles',
      year: '2004',
      description: 'Gregor must fulfill a prophecy to save the Underland from destruction.',
      rating: 4,
      cover: 'underland-2'
    },
    {
      title: 'Gregor and the Curse of the Warmbloods',
      series: 'The Underland Chronicles',
      year: '2005',
      description: 'A plague threatens the Underland, and Gregor must find the cure.',
      rating: 4,
      cover: 'underland-3'
    },
    {
      title: 'Gregor and the Marks of Secret',
      series: 'The Underland Chronicles',
      year: '2006',
      description: 'Gregor discovers a secret that could change the fate of the Underland forever.',
      rating: 4,
      cover: 'underland-4'
    },
    {
      title: 'Gregor and the Code of Claw',
      series: 'The Underland Chronicles',
      year: '2007',
      description: 'The final battle for the Underland begins, and Gregor must make the ultimate choice.',
      rating: 5,
      cover: 'underland-5'
    }
  ];

  const handleBookClick = (bookTitle: string) => {
    // In a real implementation, this would navigate to a detailed book page
    console.log(`Viewing details for: ${bookTitle}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, bookTitle: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleBookClick(bookTitle);
    }
  };

  return (
    <section id="books" className="bg-secondary-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            Published Works
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Explore Suzanne Collins' complete collection of novels, from bestselling series to standalone works
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className={`card p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                book.featured ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => handleBookClick(book.title)}
              onKeyDown={(e) => handleKeyDown(e, book.title)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${book.title}`}
            >
              <div className="space-y-4">
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-secondary-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-2" aria-hidden="true" />
                      <p className="text-sm text-secondary-600 font-medium">
                        {book.cover.replace('-', ' ').toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {book.featured && (
                    <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < book.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-secondary-300'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <ExternalLink className="h-4 w-4 text-secondary-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
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