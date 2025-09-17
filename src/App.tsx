import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BookGallery from './components/BookGallery';
import SeriesOverview from './components/SeriesOverview';
import EducationalResources from './components/EducationalResources';
import NewsUpdates from './components/NewsUpdates';
import Testimonials from './components/Testimonials';
import AudioBooks from './components/AudioBooks';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-secondary-50">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
          tabIndex={0}
        >
          Skip to main content
        </a>
        
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <BookGallery />
          <SeriesOverview />
          <EducationalResources />
          <NewsUpdates />
          <Testimonials />
          <AudioBooks />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App; 