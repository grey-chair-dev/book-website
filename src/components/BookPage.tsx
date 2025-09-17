import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, BookOpen, Users, Award, Quote } from 'lucide-react';
import { getBookById } from '../data/books';
import Header from './Header';
import Footer from './Footer';

const BookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = bookId ? getBookById(bookId) : null;

  if (!book) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
            Book Not Found
          </h1>
          <p className="text-lg text-secondary-600 mb-8">
            The book you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to Series
          </Link>
        </div>

        {/* Book Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-primary-600 font-medium">
                  {book.series} • Book {book.bookNumber}
                </span>
                <span className="text-sm text-secondary-500">
                  {book.year}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900">
                {book.title}
              </h1>
              
              <p className="text-xl text-secondary-700 leading-relaxed">
                {book.fullDescription}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-secondary-600">
                <Calendar className="h-5 w-5" aria-hidden="true" />
                <span>{book.year}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {book.genre.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="book-shape">
              <div className="book-cover-image">
                <img
                  src={`/images/covers/${book.cover}.avif`}
                  alt={`${book.title} book cover`}
                  loading="lazy"
                />
              </div>
              <div className="book-spine"></div>
              <div className="book-pages"></div>
            </div>
            
            {book.featured && (
              <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                FEATURED
              </div>
            )}
          </div>
        </div>

        {/* Book Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Characters */}
          <div className="card p-6">
            <h3 className="text-xl font-serif font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary-600" aria-hidden="true" />
              Key Characters
            </h3>
            <ul className="space-y-2">
              {book.characters.map((character, index) => (
                <li key={index} className="text-secondary-700">
                  {character}
                </li>
              ))}
            </ul>
          </div>

          {/* Themes */}
          <div className="card p-6">
            <h3 className="text-xl font-serif font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary-600" aria-hidden="true" />
              Themes
            </h3>
            <div className="flex flex-wrap gap-2">
              {book.themes.map((theme, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="card p-6">
            <h3 className="text-xl font-serif font-bold text-secondary-900 mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary-600" aria-hidden="true" />
              Recognition
            </h3>
            <ul className="space-y-2">
              {book.awards?.map((award, index) => (
                <li key={index} className="text-secondary-700">
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quotes Section */}
        <div className="card p-8 mb-16">
          <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6 flex items-center gap-2">
            <Quote className="h-6 w-6 text-primary-600" aria-hidden="true" />
            Memorable Quotes
          </h3>
          <div className="space-y-6">
            {book.quotes.map((quote, index) => (
              <blockquote
                key={index}
                className="text-lg text-secondary-700 italic border-l-4 border-primary-500 pl-6"
              >
                "{quote}"
              </blockquote>
            ))}
          </div>
        </div>

        {/* Author Info */}
        <div className="card p-8 mb-16">
          <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-6">
            About the Author
          </h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-secondary-900 mb-2">
                C.E. Scott
              </h4>
              <p className="text-secondary-700 mb-4">
                Wife, high school campus minister, and fantasy author from Cincinnati, OH. 
                She graduated from Purdue University in 2019 and earned a master's in Theology 
                from the University of Notre Dame in 2021.
              </p>
              <p className="text-secondary-700">
                Inspired by the works of J.R.R. Tolkien, C.S. Lewis, and Andrew Peterson, 
                C.E. Scott writes fantasy that captures beauty, wonder, depth, and truth.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white" aria-hidden="true" />
              </div>
              <p className="text-sm text-secondary-600">
                Fantasy Author
              </p>
            </div>
          </div>
        </div>

        {/* Navigation to Other Books */}
        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold text-secondary-900 mb-8">
            Continue the Journey
          </h3>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="btn-primary inline-flex items-center gap-2"
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              View All Books
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookPage;
