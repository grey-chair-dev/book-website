import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';
import { books } from '../data/books';
import Header from './Header';
import Footer from './Footer';

const BooksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                The Heirs of Eleusa
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
                An epic fantasy series where heroes must claim their destinies to fulfill the Great Prophecy and save their kingdoms
              </p>
            </div>
          </div>
        </section>

        {/* Books Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                Complete Series
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                Follow the journey of heroes as they discover their destinies and unite to save the world of Eleusa
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {books.map((book, index) => (
                <div key={book.id} className="group">
                  <Link
                    to={`/book/${book.id}`}
                    className="block"
                    tabIndex={0}
                    aria-label={`View details for ${book.title}`}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                      {/* Book Cover */}
                      <div className="relative h-80 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <div className="book-shape">
                          <div className="book-cover-image">
                            <img
                              src={`/images/covers/${book.cover}.avif`}
                              alt={`${book.title} book cover`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="book-spine"></div>
                          <div className="book-pages"></div>
                        </div>
                        
                        {book.featured && (
                          <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            FEATURED
                          </div>
                        )}
                      </div>

                      {/* Book Details */}
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-primary-600 font-medium">
                              {book.series} • Book {book.bookNumber}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-secondary-400" aria-hidden="true" />
                              <span className="text-sm text-secondary-500">{book.year}</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-serif font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                            {book.title}
                          </h3>

                          <p className="text-secondary-700 leading-relaxed">
                            {book.description}
                          </p>

                          <div className="flex items-center justify-end pt-2">
                            <div className="flex items-center gap-2 text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
                              <span className="text-sm font-medium">Read More</span>
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </div>
                          </div>

                          {/* Genres */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {book.genre.slice(0, 3).map((genre, genreIndex) => (
                              <span
                                key={genreIndex}
                                className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Series Overview */}
        <section className="py-20 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900">
                  About the Series
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-secondary-700 leading-relaxed">
                    The Heirs of Eleusa is an epic fantasy series that follows the journey of heroes who must claim their destinies to fulfill the Great Prophecy and save their kingdoms. Set in the rich world of Eleusa, the series explores themes of destiny, heroism, magic, and the power of unity.
                  </p>
                  
                  <p className="text-secondary-700 leading-relaxed">
                    Each book builds upon the last, weaving together the stories of multiple characters as they discover their true identities and learn to work together against the forces of darkness. The series is perfect for fans of classic fantasy literature and those seeking stories with depth, meaning, and adventure.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/about"
                    className="btn-primary inline-flex items-center gap-2"
                    tabIndex={0}
                    aria-label="Learn more about the author"
                  >
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                    Meet the Author
                  </Link>
                  
                  <Link
                    to="/books"
                    className="btn-secondary inline-flex items-center gap-2"
                    tabIndex={0}
                    aria-label="View all books"
                  >
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    View All Books
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold text-secondary-900 text-center">
                      Series Statistics
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          {books.length}
                        </div>
                        <div className="text-secondary-600 text-sm">
                          Books in Series
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          5★
                        </div>
                        <div className="text-secondary-600 text-sm">
                          Average Rating
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          3
                        </div>
                        <div className="text-secondary-600 text-sm">
                          Kingdoms
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          Epic
                        </div>
                        <div className="text-secondary-600 text-sm">
                          Fantasy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Begin the Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Start with the first book and discover the epic world of Eleusa, where heroes rise and destinies are fulfilled.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book/heir-of-cebola"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 inline-flex items-center gap-2"
                tabIndex={0}
                aria-label="Start reading The Heir of Cebola"
              >
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                Start Reading
              </Link>
              <Link
                to="/#contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
                tabIndex={0}
                aria-label="Contact the author"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BooksPage;
