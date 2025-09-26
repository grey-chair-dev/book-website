import React from 'react';
import { ArrowRight, BookOpen, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

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
                <span className="block text-primary-600">Heirs of Eleusa</span>
                <span className="block text-2xl md:text-3xl font-normal text-secondary-600 mt-2">
                  Epic Fantasy Series
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-secondary-700 max-w-2xl">
                Step into a world where heroes must claim their destinies to fulfill the Great Prophecy and save the kingdoms of Eleusa. An ancient prophecy foretells of chosen ones who will rise when the world needs them most.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLearnMore}
                onKeyDown={handleKeyDown}
                className="btn-primary inline-flex items-center gap-2"
                tabIndex={0}
                aria-label="Learn more about the Heirs of Eleusa series"
              >
                Explore Books
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              
              <Link
                to="/map"
                className="btn-secondary inline-flex items-center gap-2"
                aria-label="Explore the interactive map"
              >
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Explore Map
              </Link>
            </div>
          </div>
          <div className="relative animate-slide-up">
            {/* Book Details Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-16 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm font-medium text-primary-600">Latest Release</span>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-secondary-900">
                  The Storm-Veiled Light
                </h3>
                
                <p className="text-secondary-700 leading-relaxed">
                  The epic conclusion of the Heirs of Eleusa series, where heroes unite against the sorcerer king to save their world.
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <span className="text-primary-600 font-medium">Available Now</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Book Icon */}
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