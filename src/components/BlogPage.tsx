import React, { useState, useEffect } from 'react';
import { PenTool, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Likes from './Likes';
import EmailSubscription from './EmailSubscription';
import DataService from '../services/dataService';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  featured: boolean;
  featured_image?: string;
  author: string;
  author_image?: string;
  author_bio?: string;
  tags?: string[];
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  slug?: string;
  published: boolean;
}

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  // Get unique categories from blog posts
  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter posts by selected category
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main>
          <section className="bg-gradient-to-br from-primary-50 to-secondary-100 section-padding">
            <div className="max-w-7xl mx-auto text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary-600">Loading blog posts...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-100 section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary-900 mb-4">
              Author Blog
            </h1>
            <p className="text-lg md:text-xl text-secondary-700 max-w-3xl mx-auto">
              Insights, behind-the-scenes content, and thoughts on writing fantasy with purpose
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-8 text-center">
                Featured Post
              </h2>
              
              {filteredPosts.filter(post => post.featured).map((post) => (
                <div key={post.id} className="bg-gradient-to-r from-primary-50 to-secondary-100 rounded-2xl p-8 md:p-12">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-secondary-600 text-sm">{post.read_time}</span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-lg text-secondary-700 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-secondary-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" aria-hidden="true" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.slug || post.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        Read Full Post
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    </div>
                    
                    <div className="relative">
                      <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          {post.author_image ? (
                            <img
                              src={post.author_image}
                              alt={post.author || 'Author'}
                              className="w-12 h-12 rounded-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center ${post.author_image ? 'hidden' : ''}`}>
                            <PenTool className="h-6 w-6 text-primary-600" aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-secondary-900">{post.author || 'C.E. Scott'}</h4>
                            <p className="text-sm text-secondary-600">Author & Campus Minister</p>
                          </div>
                        </div>
                        <p className="text-secondary-700 text-sm">
                          "Writing fantasy allows me to explore deep truths about courage, sacrifice, and the power of choosing good over evil."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                All Posts
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                Explore all my thoughts on writing, world-building, and the journey of creating the Heirs of Eleusa series.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-primary-500 text-white"
                      : "bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            {filteredPosts.filter(post => !post.featured).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600">
                  {selectedCategory === 'All' 
                    ? 'No blog posts available yet.' 
                    : `No posts found in the "${selectedCategory}" category.`
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.filter(post => !post.featured).map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-secondary-500 text-sm">{post.read_time}</span>
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-secondary-900 mb-3 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-secondary-700 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-secondary-600">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          <span className="text-sm">{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        
                        <Link
                          to={`/blog/${post.slug || post.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1 transition-colors duration-200"
                        >
                          Read More
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>

                      {/* Author info */}
                      <div className="flex items-center gap-2 pt-2">
                        {post.author_image ? (
                          <img
                            src={post.author_image}
                            alt={post.author || 'Author'}
                            className="w-5 h-5 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center ${post.author_image ? 'hidden' : ''}`}>
                          <PenTool className="h-3 w-3 text-primary-600" />
                        </div>
                        <span className="text-sm text-secondary-500">{post.author || 'C.E. Scott'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <Likes 
                          blogPostId={post.id} 
                          initialLikeCount={post.like_count || 0}
                          className="text-sm"
                        />
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {post.comment_count !== undefined && (
                            <span>{post.comment_count} comments</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Get the latest blog posts, writing updates, and behind-the-scenes content delivered to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <EmailSubscription 
                source="blog"
                placeholder="Enter your email"
                buttonText="Subscribe"
                variant="inline"
                className="text-white"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
