import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { AdminProvider } from './contexts/AdminContext';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BookGallery from './components/BookGallery';
import Blog from './components/Blog'; 
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BookPage from './components/BookPage';
import AboutPage from './components/AboutPage';
import BooksPage from './components/BooksPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import ContactPage from './components/ContactPage';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-secondary-50">
            {/* Skip to content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
              tabIndex={0}
            >
              Skip to main content
            </a>
            
            <Routes>
              <Route path="/" element={
                <>
                  <Header />
                  <main id="main-content">
                    <Hero />
                    <About />
                    <BookGallery />
                    <Blog />
                    <ContactForm />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/book/:bookId" element={<BookPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ErrorBoundary>
                  <AdminLogin />
                </ErrorBoundary>
              } />
              <Route path="/admin/dashboard" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
            </Routes>
          </div>
        </Router>
      </AdminProvider>
    </ErrorBoundary>
  );
};

export default App; 