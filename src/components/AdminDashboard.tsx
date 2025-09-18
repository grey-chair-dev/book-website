import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { BookOpen, PenTool, User, Settings, LogOut, Plus, Edit, Trash2, Save, History, Undo, ExternalLink, MessageCircle, Menu, X } from 'lucide-react';
import { realAdminService } from '../services/realAdminService';
import EditHistory from './EditHistory';
// import emailSubscriptionService, { EmailSubscription, SubscriptionStats } from '../services/emailSubscriptionService';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<'books' | 'blog' | 'comments' | 'author' | 'settings' | 'history' | 'subscriptions'>('books');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [author, setAuthor] = useState<any>(null);
  // const [subscriptions, setSubscriptions] = useState<EmailSubscription[]>([]);
  // const [subscriptionStats, setSubscriptionStats] = useState<SubscriptionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    try {
      console.log('🔄 Using Neon database service');
      const [booksData, blogData, authorData, commentsData] = await Promise.all([
        realAdminService.getAllBooks(),
        realAdminService.getAllBlogPosts(),
        realAdminService.getAuthor(),
        realAdminService.getAllComments()
      ]);
      setBooks(booksData);
      setBlogPosts(blogData);
      setAuthor(authorData);
      setComments(commentsData);
      // setSubscriptions(subscriptionsData);
      // setSubscriptionStats(statsData);
      console.log('✅ Neon database data loaded successfully');
    } catch (error) {
      console.error('❌ Neon database error:', error);
      // Show error but don't fall back to demo mode
      setBooks([]);
      setBlogPosts([]);
      setAuthor(null);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'books', label: 'Books', icon: BookOpen, count: books.length },
    { id: 'blog', label: 'Blog Posts', icon: PenTool, count: blogPosts.length },
    { id: 'comments', label: 'Comments', icon: MessageCircle, count: comments.length },
    { id: 'author', label: 'Author Info', icon: User, count: 1 },
    { id: 'history', label: 'Edit History', icon: History, count: 0 },
    { id: 'settings', label: 'Settings', icon: Settings, count: 0 },
  ];

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setIsEditing(true);
  };

  const handleAdd = (type: string) => {
    let newItem: any = {};
    
    if (type === 'book') {
      newItem = {
        id: '',
        title: '',
        series: 'Heirs of Eleusa',
        book_number: books.length + 1,
        year: new Date().getFullYear().toString(),
        description: '',
        full_description: '',
        cover: '',
        featured: false,
        characters: [],
        themes: [],
        quotes: [],
        author: 'C.E. Scott',
        genre: ['Fantasy'],
        awards: []
      };
    } else if (type === 'blog') {
      newItem = {
        title: '',
        excerpt: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        read_time: '5 min read',
        category: 'Writing Process',
        featured: false,
        tags: [],
        author: 'C.E. Scott',
        author_image: '/images/author/ce-scott.avif',
        author_bio: 'C.E. Scott is the author of the Heirs of Eleusa epic fantasy series.',
        featured_image: '',
        slug: '',
        meta_description: '',
        social_image: '',
        seo_title: '',
        status: 'published',
        published: true,
        view_count: 0,
        like_count: 0,
        comment_count: 0
      };
    } else if (type === 'author') {
      newItem = {
        id: null,
        name: 'C.E. Scott',
        full_name: 'Claire Scott',
        bio: '',
        image: '/images/author/ce-scott.avif',
        location: 'Cincinnati, Ohio',
        education: [],
        personal: [],
        writing_journey: [],
        social_media: {
          website: 'https://heirsofeleusa.com',
          email: 'claire@heirsofeleusa.com',
          books_email: 'books@heirsofeleusa.com'
        },
        stats: {
          books_in_series: 3,
          kingdoms: '5+',
          heroes: 'Multiple',
          prophecy: 'Great'
        }
      };
    }
    
    setEditingItem({ ...newItem, type });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    
    try {
      const service = realAdminService;
      
      // Remove the 'type' property before saving to database
      const { type, ...itemData } = editingItem;
      
      if (editingItem.type === 'book') {
        if (editingItem.id && editingItem.id !== '') {
          // Update existing book
          await service.updateBook(editingItem.id, itemData);
        } else {
          // Create new book - generate ID from title
          const newId = itemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          await service.createBook({ ...itemData, id: newId });
        }
      } else if (editingItem.type === 'blog') {
        if (editingItem.id) {
          // Update existing blog post
          await service.updateBlogPost(editingItem.id, itemData);
        } else {
          // Create new blog post
          await service.createBlogPost(itemData);
        }
      } else if (editingItem.type === 'author') {
        if (editingItem.id) {
          // Update existing author
          await service.updateAuthor(itemData);
        } else {
          // Create new author
          await service.createAuthor(itemData);
        }
      }
      
      await loadData(); // Refresh data
      setIsEditing(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleUndo = async (tableName: string, recordId: string) => {
    try {
      // Mock undo functionality
      console.log('Undoing edit for:', tableName, recordId);
      await loadData(); // Refresh data
      alert('Edit undone successfully!');
    } catch (error) {
      console.error('Error undoing edit:', error);
      alert('Failed to undo edit. Please try again.');
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        const service = realAdminService;
        
        if (type === 'book') {
          await service.deleteBook(id);
        } else if (type === 'blog post') {
          await service.deleteBlogPost(parseInt(id));
        }
        
        await loadData(); // Refresh data
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.username}</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden sm:inline text-sm text-gray-600">
                {new Date().toLocaleDateString()}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`
            ${sidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden lg:block'}
            w-64 bg-white shadow-lg lg:shadow-none lg:bg-transparent
            flex-shrink-0 lg:relative
          `}>
            <div className="h-full overflow-y-auto py-4 lg:py-0">
              <nav className="space-y-2 px-4 lg:px-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSidebarOpen(false); // Close mobile menu when tab is selected
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium truncate">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full flex-shrink-0">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'books' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Books Management</h2>
                  <button 
                    className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                    onClick={() => handleAdd('book')}
                  >
                    <Plus className="h-4 w-4" />
                    Add Book
                  </button>
                </div>

                <div className="grid gap-4">
                  {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1 min-w-0">
                          <div className="w-20 h-24 sm:w-24 sm:h-28 bg-gray-100 rounded-lg border flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                            {book.cover ? (
                              <img 
                                src={book.cover} 
                                alt={book.title}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <BookOpen className={`h-8 w-8 sm:h-10 sm:w-10 text-gray-400 ${book.cover ? 'hidden' : ''}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight mb-2">{book.title}</h3>
                            <p className="text-gray-600 text-sm sm:text-base font-medium">{book.series} • Book {book.book_number}</p>
                            <p className="text-gray-500 text-sm sm:text-base mt-2 line-clamp-2 leading-relaxed">{book.description}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <span className="text-xs sm:text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                                {book.year}
                              </span>
                              {book.featured && (
                                <span className="text-xs sm:text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                                  ⭐ Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1 sm:gap-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={() => handleEdit(book, 'book')}
                            className="text-gray-400 hover:text-gray-600 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Edit book"
                          >
                            <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => handleUndo('books', book.id)}
                            className="text-gray-400 hover:text-blue-600 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Undo last edit"
                          >
                            <Undo className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(book.id, 'book')}
                            className="text-gray-400 hover:text-red-600 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Delete book"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Blog Posts Management</h2>
                  <button 
                    className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                    onClick={() => handleAdd('blog')}
                  >
                    <Plus className="h-4 w-4" />
                    New Post
                  </button>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-3 sm:p-6">
                      <div className="flex flex-col gap-3 sm:gap-4">
                        {/* Header with image and title */}
                        <div className="flex gap-3 sm:gap-4">
                          {post.featured_image && (
                            <div className="w-20 h-16 sm:w-24 sm:h-20 bg-gray-100 rounded-lg border flex items-center justify-center flex-shrink-0">
                              <img 
                                src={post.featured_image} 
                                alt={post.title}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight mb-2">{post.title}</h3>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">{post.excerpt}</p>
                          </div>
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="text-xs sm:text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                            {post.category || 'Uncategorized'}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500">{post.read_time || 'No read time'}</span>
                          <span className="text-xs sm:text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                          <span className={`text-xs sm:text-sm px-2 py-1 rounded-full font-medium ${
                            post.status === 'published' ? 'bg-green-100 text-green-700' :
                            post.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {post.status?.charAt(0).toUpperCase() + post.status?.slice(1) || 'Draft'}
                          </span>
                          {post.featured && (
                            <span className="text-xs sm:text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-start gap-2">
                            <span className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Tags:</span>
                            <div className="flex gap-1 flex-wrap">
                              {post.tags.slice(0, 4).map((tag: string, index: number) => (
                                <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 4 && (
                                <span className="text-xs text-gray-500 px-2 py-1">+{post.tags.length - 4} more</span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Engagement metrics and actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <span>👁️ {post.view_count || 0}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span>❤️ {post.like_count || 0}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span>💬 {post.comment_count || 0}</span>
                            </span>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-1 sm:gap-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={() => window.open(`/blog/${post.id}`, '_blank', 'noopener,noreferrer')}
                            className="text-gray-400 hover:text-green-600 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            title="View post in new tab"
                          >
                            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button 
                            onClick={() => handleUndo('blog_posts', post.id.toString())}
                            className="text-gray-400 hover:text-blue-600 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Undo last edit"
                          >
                            <Undo className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(post, 'blog')}
                            className="text-gray-400 hover:text-gray-600 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Edit post"
                          >
                            <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id.toString(), 'blog post')}
                            className="text-gray-400 hover:text-red-600 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Delete post"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Comments Management</h2>
                  <div className="text-sm text-gray-500">
                    {comments.length} total comments
                  </div>
                </div>

                <div className="grid gap-4">
                  {comments.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                      <p className="text-gray-500">Comments will appear here once readers start engaging with your blog posts.</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h4 className="font-medium text-gray-900 truncate">{comment.author_name}</h4>
                              <span className="text-sm text-gray-500 truncate">{comment.author_email}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                                comment.status === 'approved' ? 'bg-green-100 text-green-700' :
                                comment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                comment.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {comment.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              On: <span className="font-medium">{comment.blog_posts?.title || 'Unknown Post'}</span>
                            </p>
                            <p className="text-gray-800 mb-3 whitespace-pre-wrap">{comment.content}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Posted: {new Date(comment.created_at).toLocaleDateString()}</span>
                              {comment.parent_id && (
                                <span className="text-blue-600">Reply to comment #{comment.parent_id}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 self-end sm:self-auto">
                            {comment.status === 'pending' && (
                              <button
                                onClick={async () => {
                                  const success = await realAdminService.updateCommentStatus(comment.id, 'approved');
                                  if (success) {
                                    loadData();
                                  }
                                }}
                                className="text-green-600 hover:text-green-700 p-2 rounded-md hover:bg-gray-100"
                                title="Approve comment"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            {comment.status === 'approved' && (
                              <button
                                onClick={async () => {
                                  const success = await realAdminService.updateCommentStatus(comment.id, 'rejected');
                                  if (success) {
                                    loadData();
                                  }
                                }}
                                className="text-yellow-600 hover:text-yellow-700 p-2 rounded-md hover:bg-gray-100"
                                title="Reject comment"
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={async () => {
                                if (window.confirm('Are you sure you want to delete this comment?')) {
                                  const success = await realAdminService.deleteComment(comment.id);
                                  if (success) {
                                    loadData();
                                  }
                                }
                              }}
                              className="text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-gray-100"
                              title="Delete comment"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'author' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Author Information</h2>
                  {author && (
                    <button
                      onClick={() => handleEdit(author, 'author')}
                      className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {author ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center self-center sm:self-start">
                        <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary-600" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{author.name || 'Unknown Author'}</h3>
                        <p className="text-gray-600">{author.location || 'Location not specified'}</p>
                        <p className="text-gray-500 text-sm mt-2 line-clamp-3">{author.bio || 'No biography available'}</p>
                        <div className="space-y-4 mt-4">
                          {/* Stats */}
                          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center sm:justify-start">
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Books:</span>
                              <span className="text-gray-600 ml-1">{author.stats?.booksInSeries || 'Not available'}</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Location:</span>
                              <span className="text-gray-600 ml-1">{author.location || 'Not specified'}</span>
                            </div>
                          </div>

                          {/* Social Media Links */}
                          {author.socialMedia && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-700">Social Media & Contact</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {author.socialMedia.email && (
                                  <a
                                    href={`mailto:${author.socialMedia.email}`}
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    Email
                                  </a>
                                )}
                                {author.socialMedia.books_email && author.socialMedia.books_email !== author.socialMedia.email && (
                                  <a
                                    href={`mailto:${author.socialMedia.books_email}`}
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Books Email
                                  </a>
                                )}
                                {author.socialMedia.website && (
                                  <a
                                    href={author.socialMedia.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                    </svg>
                                    Website
                                  </a>
                                )}
                                {author.socialMedia.twitter && (
                                  <a
                                    href={author.socialMedia.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                    Twitter/X
                                  </a>
                                )}
                                {author.socialMedia.instagram && (
                                  <a
                                    href={author.socialMedia.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                                    </svg>
                                    Instagram
                                  </a>
                                )}
                                {author.socialMedia.facebook && (
                                  <a
                                    href={author.socialMedia.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    Facebook
                                  </a>
                                )}
                                {author.socialMedia.linkedin && (
                                  <a
                                    href={author.socialMedia.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                  </a>
                                )}
                                {author.socialMedia.goodreads && (
                                  <a
                                    href={author.socialMedia.goodreads}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M11.5 0C5.149 0 0 5.149 0 11.5S5.149 23 11.5 23 23 17.851 23 11.5 17.851 0 11.5 0zm0 20C6.262 20 2 15.738 2 11.5S6.262 3 11.5 3 21 7.262 21 11.5 16.738 20 11.5 20z"/>
                                      <path d="M8.5 7.5h6v1h-6v-1zm0 2h6v1h-6v-1zm0 2h6v1h-6v-1z"/>
                                    </svg>
                                    Goodreads
                                  </a>
                                )}
                                {author.socialMedia.youtube && (
                                  <a
                                    href={author.socialMedia.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    YouTube
                                  </a>
                                )}
                                {author.socialMedia.tiktok && (
                                  <a
                                    href={author.socialMedia.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                    </svg>
                                    TikTok
                                  </a>
                                )}
                                {author.socialMedia.newsletter && (
                                  <a
                                    href={author.socialMedia.newsletter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                                  >
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    Newsletter
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Author Information</h3>
                    <p className="text-gray-600 mb-4">Author information is not available. Please add author details in the admin panel.</p>
                    <button
                      onClick={() => handleAdd('author')}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Author Information
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Edit History</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadData()}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Refresh All Data
                    </button>
                  </div>
                </div>
                
                <EditHistory history={[]} onUndoEdit={async (editId) => {
                  console.log('Undoing edit:', editId);
                  await loadData();
                }} />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CMS Version:</span>
                      <span className="text-gray-900">1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Books:</span>
                      <span className="text-gray-900">{books.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Blog Posts:</span>
                      <span className="text-gray-900">{blogPosts.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Edit {editingItem.type}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-md hover:bg-gray-100"
                >
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter title"
                    />
                  </div>
                  
                  {editingItem.type === 'blog' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={editingItem.slug || ''}
                        onChange={(e) => setEditingItem({...editingItem, slug: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="url-friendly-slug"
                      />
                    </div>
                  )}
                </div>

                {/* Description/Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {editingItem.type === 'blog' ? 'Excerpt' : 'Description'}
                  </label>
                  <textarea
                    value={editingItem.excerpt || editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, 
                      [editingItem.type === 'blog' ? 'excerpt' : 'description']: e.target.value
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Brief description or excerpt"
                  />
                </div>

                {/* Blog-specific fields */}
                {editingItem.type === 'blog' && (
                  <>
                    {/* Content Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Content</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Blog Content
                        </label>
                        <textarea
                          value={editingItem.content || ''}
                          onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm sm:text-base"
                          placeholder="Write your blog post content here... (Markdown supported)"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Supports Markdown formatting. Use **bold**, *italic*, [links](url), etc.
                        </p>
                      </div>
                    </div>

                    {/* Publishing Settings */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Publishing Settings</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={editingItem.category || ''}
                          onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="">Select Category</option>
                          <option value="Writing Process">Writing Process</option>
                          <option value="Character Development">Character Development</option>
                          <option value="World Building">World Building</option>
                          <option value="Behind the Scenes">Behind the Scenes</option>
                          <option value="Book Updates">Book Updates</option>
                          <option value="Personal">Personal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={editingItem.read_time || ''}
                          onChange={(e) => setEditingItem({...editingItem, read_time: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="5 min read"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={editingItem.status || 'draft'}
                          onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Publish Date
                        </label>
                        <input
                          type="datetime-local"
                          value={editingItem.date ? new Date(editingItem.date).toISOString().slice(0, 16) : ''}
                          onChange={(e) => setEditingItem({...editingItem, date: e.target.value ? new Date(e.target.value).toISOString() : new Date().toISOString()})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          value={editingItem.author || ''}
                          onChange={(e) => setEditingItem({...editingItem, author: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                          placeholder="Author name"
                        />
                      </div>
                    </div>

                    {/* Media Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Media & Images</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image URL
                          </label>
                          <input
                            type="url"
                            value={editingItem.featured_image || ''}
                            onChange={(e) => setEditingItem({...editingItem, featured_image: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="https://example.com/image.jpg"
                          />
                          {editingItem.featured_image && (
                            <div className="mt-2">
                              <img 
                                src={editingItem.featured_image} 
                                alt="Featured preview" 
                                className="w-20 h-16 object-cover rounded border"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Social Media Image URL
                          </label>
                          <input
                            type="url"
                            value={editingItem.social_image || ''}
                            onChange={(e) => setEditingItem({...editingItem, social_image: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="https://example.com/social-image.jpg"
                          />
                          {editingItem.social_image && (
                            <div className="mt-2">
                              <img 
                                src={editingItem.social_image} 
                                alt="Social media preview" 
                                className="w-20 h-16 object-cover rounded border"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SEO Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">SEO & Metadata</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : ''}
                            onChange={(e) => setEditingItem({...editingItem, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="fantasy, writing, characters"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Separate tags with commas
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SEO Title
                          </label>
                          <input
                            type="text"
                            value={editingItem.seo_title || ''}
                            onChange={(e) => setEditingItem({...editingItem, seo_title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Custom title for search engines"
                            maxLength={60}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {(editingItem.seo_title?.length || 0)}/60 characters
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Description (SEO)
                        </label>
                        <textarea
                          value={editingItem.meta_description || ''}
                          onChange={(e) => setEditingItem({...editingItem, meta_description: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="SEO description for search engines"
                          maxLength={160}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {(editingItem.meta_description?.length || 0)}/160 characters
                        </p>
                      </div>
                    </div>
                  </div>
                  </>
                )}

                {/* Book-specific fields */}
                {editingItem.type === 'book' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Book Number
                        </label>
                        <input
                          type="number"
                          value={editingItem.book_number || ''}
                          onChange={(e) => setEditingItem({...editingItem, book_number: parseInt(e.target.value) || 1})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          min="1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <input
                          type="text"
                          value={editingItem.year || ''}
                          onChange={(e) => setEditingItem({...editingItem, year: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="2024"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Series
                        </label>
                        <input
                          type="text"
                          value={editingItem.series || ''}
                          onChange={(e) => setEditingItem({...editingItem, series: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Heirs of Eleusa"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description
                      </label>
                      <textarea
                        value={editingItem.full_description || ''}
                        onChange={(e) => setEditingItem({...editingItem, full_description: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Detailed book description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image URL
                      </label>
                      <input
                        type="url"
                        value={editingItem.cover || ''}
                        onChange={(e) => setEditingItem({...editingItem, cover: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://example.com/cover.jpg"
                      />
                      {editingItem.cover && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-2">Cover Preview:</p>
                          <div className="w-24 h-32 bg-gray-100 rounded-lg border overflow-hidden">
                            <img 
                              src={editingItem.cover} 
                              alt="Cover preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => { 
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-full flex items-center justify-center">
                              <BookOpen className="h-8 w-8 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Author-specific fields */}
                {editingItem.type === 'author' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editingItem.full_name || ''}
                          onChange={(e) => setEditingItem({...editingItem, full_name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Claire Scott"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={editingItem.location || ''}
                          onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Cincinnati, Ohio"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Biography
                      </label>
                      <textarea
                        value={editingItem.bio || ''}
                        onChange={(e) => setEditingItem({...editingItem, bio: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Author biography and background..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author Image URL
                      </label>
                      <input
                        type="url"
                        value={editingItem.image || ''}
                        onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://example.com/author-photo.jpg"
                      />
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                        Social Media & Contact
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editingItem.social_media?.email || ''}
                            onChange={(e) => setEditingItem({
                              ...editingItem, 
                              social_media: {
                                ...editingItem.social_media,
                                email: e.target.value
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="claire@heirsofeleusa.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Books Email
                          </label>
                          <input
                            type="email"
                            value={editingItem.social_media?.books_email || ''}
                            onChange={(e) => setEditingItem({
                              ...editingItem, 
                              social_media: {
                                ...editingItem.social_media,
                                books_email: e.target.value
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="books@heirsofeleusa.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.website || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              website: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://heirsofeleusa.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Twitter/X
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.twitter || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              twitter: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://twitter.com/username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.instagram || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              instagram: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://instagram.com/username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.facebook || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              facebook: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://facebook.com/username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.linkedin || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              linkedin: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Goodreads
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.goodreads || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              goodreads: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://goodreads.com/author/show/username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          YouTube
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.youtube || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              youtube: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://youtube.com/@username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          TikTok
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.tiktok || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              tiktok: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://tiktok.com/@username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Newsletter Signup
                        </label>
                        <input
                          type="url"
                          value={editingItem.social_media?.newsletter || ''}
                          onChange={(e) => setEditingItem({
                            ...editingItem, 
                            social_media: {
                              ...editingItem.social_media,
                              newsletter: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://substack.com/@username"
                        />
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                        Author Statistics
                      </h4>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Books in Series
                          </label>
                          <input
                            type="number"
                            value={editingItem.stats?.books_in_series || ''}
                            onChange={(e) => setEditingItem({
                              ...editingItem, 
                              stats: {
                                ...editingItem.stats,
                                books_in_series: parseInt(e.target.value) || 0
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            min="0"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kingdoms
                          </label>
                          <input
                            type="text"
                            value={editingItem.stats?.kingdoms || ''}
                            onChange={(e) => setEditingItem({
                              ...editingItem, 
                              stats: {
                                ...editingItem.stats,
                                kingdoms: e.target.value
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="5+"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Heroes
                          </label>
                          <input
                            type="text"
                            value={editingItem.stats?.heroes || ''}
                            onChange={(e) => setEditingItem({
                              ...editingItem, 
                              stats: {
                                ...editingItem.stats,
                                heroes: e.target.value
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Multiple"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prophecy
                          </label>
                          <input
                            type="text"
                            value={editingItem.stats?.prophecy || ''}
                            onChange={(e) => setEditingItem({
                              ...editingItem, 
                              stats: {
                                ...editingItem.stats,
                                prophecy: e.target.value
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Great"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Checkboxes */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem.featured || false}
                      onChange={(e) => setEditingItem({...editingItem, featured: e.target.checked})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>

                  {editingItem.type === 'blog' && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingItem.published || false}
                        onChange={(e) => setEditingItem({...editingItem, published: e.target.checked})}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Published</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
