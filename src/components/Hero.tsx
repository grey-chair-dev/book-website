import React from 'react';
import { ArrowRight, BookOpen, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const handleLearnMore = () => {
    const element = document.getElementById('books');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleLearnMore();
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-50 to-secondary-100 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary-900 leading-tight">
                The Official
                <span className="block text-primary-600">Suzanne Collins</span>
                <span className="block text-2xl md:text-3xl font-normal text-secondary-600 mt-2">
                  Website
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-secondary-700 max-w-2xl">
                Discover the worlds of The Hunger Games, The Underland Chronicles, and more bestselling young adult literature that has captivated readers worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLearnMore}
                onKeyDown={handleKeyDown}
                className="btn-primary inline-flex items-center gap-2"
                tabIndex={0}
                aria-label="Learn more about Suzanne Collins' books"
              >
                Explore Books
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              
              <button
                onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary inline-flex items-center gap-2"
                tabIndex={0}
                aria-label="View educational resources"
              >
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                Resources
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm text-secondary-600">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" aria-hidden="true" />
                <span>55+ Languages</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-primary-500" aria-hidden="true" />
                <span>Millions of Readers</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-4">
                <div className="w-16 h-2 bg-primary-500 rounded-full"></div>
                <h3 className="text-xl font-serif font-bold text-secondary-900">
                  Latest Release
                </h3>
                <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                    Sunrise on the Reaping
                  </h4>
                  <p className="text-secondary-700 text-sm mb-4">
                    The highly anticipated new novel in The Hunger Games series, exploring the origins of the Games and the world of Panem.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-medium">Available Now</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-secondary-900 text-white rounded-full p-3 shadow-lg">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 