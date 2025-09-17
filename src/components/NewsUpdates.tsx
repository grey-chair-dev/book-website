import React from 'react';
import { Calendar, ExternalLink, BookOpen } from 'lucide-react';

const NewsUpdates: React.FC = () => {
  const news = [
    {
      title: 'Sunrise on the Reaping Now Available',
      description: 'The highly anticipated new novel in The Hunger Games series is now available worldwide.',
      date: '2025-01-15',
      type: 'Release',
      featured: true
    },
    {
      title: 'New Movie Adaptation Announced',
      description: 'The Ballad of Songbirds and Snakes movie adaptation receives critical acclaim and box office success.',
      date: '2024-12-01',
      type: 'Movie'
    },
    {
      title: 'Educational Resources Updated',
      description: 'New discussion guides and lesson plans available for educators and book clubs.',
      date: '2024-11-20',
      type: 'Resources'
    },
    {
      title: 'International Book Tour',
      description: 'Suzanne Collins announces upcoming international book tour dates for 2025.',
      date: '2024-10-15',
      type: 'Events'
    }
  ];

  return (
    <section id="news" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            News & Updates
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Stay up to date with the latest releases, events, and announcements
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {news.map((item, index) => (
            <div
              key={index}
              className={`card p-6 ${
                item.featured ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm text-secondary-500">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  {item.featured && (
                    <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'Release' ? 'bg-green-100 text-green-800' :
                      item.type === 'Movie' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'Resources' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-secondary-900 text-xl leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-secondary-600">
                    {item.description}
                  </p>
                </div>

                <button
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 transition-colors duration-200"
                  tabIndex={0}
                  aria-label={`Read more about ${item.title}`}
                >
                  Read More
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary-50 to-secondary-100 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-secondary-900">
                Stay Connected
              </h3>
              <p className="text-secondary-700">
                Subscribe to receive updates about new releases, events, and exclusive content.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  aria-label="Email address for newsletter subscription"
                />
                <button
                  className="btn-primary whitespace-nowrap"
                  tabIndex={0}
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-secondary-900">
                Never Miss an Update
              </h4>
              <p className="text-secondary-600 text-sm">
                Be the first to know about new releases, events, and exclusive content from Suzanne Collins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates; 