import React from 'react';
import { Calendar, ExternalLink, BookOpen, PenTool } from 'lucide-react';

const NewsUpdates: React.FC = () => {
  const blogPosts = [
    {
      title: 'The Inspiration Behind The Heirs of Eleusa',
      description: 'Exploring the mythological roots and creative process that brought this epic fantasy series to life.',
      date: '2024-12-15',
      type: 'Behind the Scenes',
      featured: true
    },
    {
      title: 'Character Development: Creating Memorable Protagonists',
      description: 'A deep dive into how I craft characters that readers connect with and remember long after finishing the book.',
      date: '2024-11-28',
      type: 'Writing Process'
    },
    {
      title: 'World-Building in Fantasy Fiction',
      description: 'Tips and techniques for creating immersive fantasy worlds that feel real and lived-in.',
      date: '2024-11-10',
      type: 'Writing Tips'
    },
    {
      title: 'The Journey from First Draft to Publication',
      description: 'Sharing the ups and downs of the publishing process and what I\'ve learned along the way.',
      date: '2024-10-22',
      type: 'Publishing'
    }
  ];

  return (
    <section id="blog" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            Author Blog
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Insights into the writing process, behind-the-scenes stories, and thoughts on fantasy literature
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className={`card p-6 ${
                post.featured ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm text-secondary-500">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  {post.featured && (
                    <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.type === 'Behind the Scenes' ? 'bg-purple-100 text-purple-800' :
                      post.type === 'Writing Process' ? 'bg-blue-100 text-blue-800' :
                      post.type === 'Writing Tips' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {post.type}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-secondary-900 text-xl leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-secondary-600">
                    {post.description}
                  </p>
                </div>

                <button
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 transition-colors duration-200"
                  tabIndex={0}
                  aria-label={`Read more about ${post.title}`}
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
                Follow the Journey
              </h3>
              <p className="text-secondary-700">
                Subscribe to receive updates about new blog posts, writing insights, and exclusive content.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  aria-label="Email address for blog subscription"
                />
                <button
                  className="btn-primary whitespace-nowrap"
                  tabIndex={0}
                  aria-label="Subscribe to blog updates"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                <PenTool className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-secondary-900">
                Join the Conversation
              </h4>
              <p className="text-secondary-600 text-sm">
                Get insights into the writing process and behind-the-scenes stories from C.E. Scott.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates; 