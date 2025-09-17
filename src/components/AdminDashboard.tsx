import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { BookOpen, PenTool, User, Settings, LogOut, Plus, Edit, Trash2, Eye, Save, AlertCircle } from 'lucide-react';
import { supabaseAdminService } from '../cms/supabaseAdminService';
import { fallbackAdminService } from '../cms/fallbackAdminService';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<'books' | 'blog' | 'author' | 'settings'>('books');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Check if Supabase is configured
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-id')) {
        console.log('🔄 Supabase not configured, using fallback service');
        setUsingFallback(true);
        
        const [booksData, blogData, authorData] = await Promise.all([
          fallbackAdminService.getAllBooks(),
          fallbackAdminService.getAllBlogPosts(),
          fallbackAdminService.getAuthor()
        ]);
        setBooks(booksData);
        setBlogPosts(blogData);
        setAuthor(authorData);
      } else {
        console.log('🔄 Using Supabase service');
        setUsingFallback(false);
        
        const [booksData, blogData, authorData] = await Promise.all([
          supabaseAdminService.getAllBooks(),
          supabaseAdminService.getAllBlogPosts(),
          supabaseAdminService.getAuthor()
        ]);
        setBooks(booksData);
        setBlogPosts(blogData);
        setAuthor(authorData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to JSON data if Supabase fails
      setUsingFallback(true);
      const [booksData, blogData, authorData] = await Promise.all([
        fallbackAdminService.getAllBooks(),
        fallbackAdminService.getAllBlogPosts(),
        fallbackAdminService.getAuthor()
      ]);
      setBooks(booksData);
      setBlogPosts(blogData);
      setAuthor(authorData);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'books', label: 'Books', icon: BookOpen, count: books.length },
    { id: 'blog', label: 'Blog Posts', icon: PenTool, count: blogPosts.length },
    { id: 'author', label: 'Author Info', icon: User, count: 1 },
    { id: 'settings', label: 'Settings', icon: Settings, count: 0 },
  ];

  const handleEdit = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    
    try {
      const service = usingFallback ? fallbackAdminService : supabaseAdminService;
      
      if (editingItem.type === 'book') {
        await service.updateBook(editingItem.id, editingItem);
      } else if (editingItem.type === 'blog') {
        await service.updateBlogPost(editingItem.id, editingItem);
      } else if (editingItem.type === 'author') {
        await service.updateAuthor(editingItem);
      }
      
      await loadData(); // Refresh data
      setIsEditing(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        const service = usingFallback ? fallbackAdminService : supabaseAdminService;
        
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
      {/* Status Banner */}
      {usingFallback && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                <strong>Demo Mode:</strong> Using local data. 
                <a 
                  href="https://dtnzylcnrbjknbygeksc.supabase.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-yellow-900 ml-1"
                >
                  Set up your Supabase database
                </a> to enable real-time data persistence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.username}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString()}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="ml-auto bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'books' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Books Management</h2>
                  <button className="btn-primary inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Book
                  </button>
                </div>

                <div className="grid gap-4">
                  {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-16 h-20 bg-gray-100 rounded border flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                            <p className="text-gray-600 text-sm">{book.series} • Book {book.bookNumber}</p>
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{book.description}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                {book.year}
                              </span>
                              {book.featured && (
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(book, 'book')}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(book.id, 'book')}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Blog Posts Management</h2>
                  <button className="btn-primary inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Post
                  </button>
                </div>

                <div className="grid gap-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">{post.readTime}</span>
                            <span className="text-xs text-gray-500">{post.date}</span>
                            {post.featured && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(post, 'blog')}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id.toString(), 'blog post')}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'author' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Author Information</h2>
                  <button
                    onClick={() => handleEdit(author, 'author')}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{author.name}</h3>
                      <p className="text-gray-600">{author.location}</p>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-3">{author.bio}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Books:</span>
                          <span className="text-gray-600 ml-1">{author.stats.booksInSeries}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="text-gray-600 ml-1">{author.socialMedia.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit {editingItem.type}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-yellow-800 text-sm">
                    <strong>Demo Mode:</strong> This is a demonstration. In a production environment, 
                    this would connect to a real backend for editing content.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary inline-flex items-center gap-2"
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
