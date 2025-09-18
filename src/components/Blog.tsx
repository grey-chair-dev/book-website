import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DataService from '../services/dataService';
import EmailSubscription from './EmailSubscription';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured: boolean;
  read_time: string;
  slug?: string;
  author?: string;
  author_image?: string;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const postsData = await DataService.getAllBlogPosts();
        setBlogPosts(postsData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-600">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {blogPosts.map((post) => (
            <div
              key={post.id}
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
                      post.category === 'Behind the Scenes' ? 'bg-purple-100 text-purple-800' :
                      post.category === 'Writing Process' ? 'bg-blue-100 text-blue-800' :
                      post.category === 'Writing Tips' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-secondary-900 text-xl leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-secondary-600">
                    {post.excerpt}
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-2 pt-2">
                    {post.author_image ? (
                      <img
                        src={post.author_image}
                        alt={post.author || 'Author'}
                        className="w-6 h-6 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center ${post.author_image ? 'hidden' : ''}`}>
                      <PenTool className="h-3 w-3 text-primary-600" />
                    </div>
                    <span className="text-sm text-secondary-500">{post.author || 'C.E. Scott'}</span>
                  </div>
                </div>

                <Link
                  to={`/blog/${post.slug || post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 transition-colors duration-200"
                  tabIndex={0}
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="View all blog posts"
          >
            View All Posts
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
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
              
              <EmailSubscription 
                source="blog"
                placeholder="Enter your email address"
                buttonText="Subscribe"
                variant="default"
              />
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

export default Blog; 