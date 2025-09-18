import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ExternalLink, User, Tag } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Likes from './Likes';
import Comments from './Comments';
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
  status: string;
  meta_description?: string;
  seo_title?: string;
}

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // For now, we'll fetch all posts and find the one with matching ID
        // In the future, you could create a getBlogPostById method
        const allPosts = await DataService.getAllBlogPosts();
        const foundPost = allPosts.find(p => p.id.toString() === postId);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main>
          <section className="bg-gradient-to-br from-primary-50 to-secondary-100 section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary-600">Loading blog post...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main>
          <section className="bg-gradient-to-br from-primary-50 to-secondary-100 section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
              <p className="text-gray-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
              <Link
                to="/blog"
                className="btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Blog
              </Link>
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                to="/blog"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-secondary-600 text-sm">{post.read_time}</span>
                {post.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900 leading-tight">
                {post.seo_title || post.title}
              </h1>

              <p className="text-xl text-secondary-700 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-6 text-secondary-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{post.author}</span>
                </div>
                {post.view_count !== undefined && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    <span>{post.view_count} views</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featured_image && (
          <section className="py-8 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </section>
        )}

        {/* Blog Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-secondary-700 leading-relaxed">
                {post.content || post.excerpt}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-4">
                {post.author_image && (
                  <img
                    src={post.author_image}
                    alt={post.author}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    About {post.author}
                  </h3>
                  <p className="text-gray-600">
                    {post.author_bio || 'Author of the Heirs of Eleusa epic fantasy series.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Engagement Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-8 mb-6">
                <div className="flex-shrink-0">
                  <Likes 
                    blogPostId={post.id} 
                    initialLikeCount={post.like_count || 0}
                  />
                </div>
                <div className="flex-1">
                  <Comments 
                    blogPostId={post.id} 
                    initialCommentCount={post.comment_count || 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts or Back to Blog */}
        <section className="py-12 bg-secondary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Enjoyed this post?
            </h2>
            <p className="text-gray-600 mb-8">
              Check out more insights and behind-the-scenes content on the blog.
            </p>
            <Link
              to="/blog"
              className="btn-primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to All Posts
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
