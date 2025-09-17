import React from 'react';
import { PenTool, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Inspiration Behind Eleusa",
      excerpt: "Discover how the world of Eleusa came to life from bedtime stories to epic fantasy series.",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Behind the Scenes",
      featured: true
    },
    {
      id: 2,
      title: "Writing Fantasy with Purpose",
      excerpt: "Exploring how faith and fantasy can work together to tell meaningful stories.",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Writing Process"
    },
    {
      id: 3,
      title: "Character Development: Creating Heroes",
      excerpt: "The process of crafting characters that readers can connect with and root for.",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Writing Process"
    },
    {
      id: 4,
      title: "World-Building: The Kingdoms of Eleusa",
      excerpt: "A deep dive into the geography, politics, and magic systems of the Eleusa universe.",
      date: "November 28, 2024",
      readTime: "8 min read",
      category: "World Building"
    },
    {
      id: 5,
      title: "From Campus Minister to Author",
      excerpt: "How my work in ministry influences my storytelling and character development.",
      date: "November 20, 2024",
      readTime: "4 min read",
      category: "Personal"
    },
    {
      id: 6,
      title: "The Great Prophecy: Themes and Symbolism",
      excerpt: "Exploring the deeper meanings and themes woven throughout the Heirs of Eleusa series.",
      date: "November 15, 2024",
      readTime: "9 min read",
      category: "Analysis"
    }
  ];

  const categories = ["All", "Behind the Scenes", "Writing Process", "World Building", "Personal", "Analysis"];

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
              
              {blogPosts.filter(post => post.featured).map((post) => (
                <div key={post.id} className="bg-gradient-to-r from-primary-50 to-secondary-100 rounded-2xl p-8 md:p-12">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="text-secondary-600 text-sm">{post.readTime}</span>
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
                          <span>{post.date}</span>
                        </div>
                      </div>
                      
                      <button className="btn-primary inline-flex items-center gap-2">
                        Read Full Post
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                    
                    <div className="relative">
                      <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <PenTool className="h-6 w-6 text-primary-600" aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-secondary-900">C.E. Scott</h4>
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
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                    category === "All"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-secondary-500 text-sm">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-secondary-900 mb-3 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-secondary-700 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-secondary-600">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm">{post.date}</span>
                      </div>
                      
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center gap-1 transition-colors duration-200">
                        Read More
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-300 focus:outline-none"
                />
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
              <p className="text-primary-200 text-sm mt-3">
                No spam, just quality content. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
