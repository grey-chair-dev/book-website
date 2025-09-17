// Fallback Admin Service - Uses JSON data when Supabase is not configured
import booksData from './data/books.json';
import blogPostsData from './data/blog-posts.json';
import authorData from './data/author.json';

export interface FallbackBook {
  id: string;
  title: string;
  series: string;
  bookNumber: number;
  year: string;
  description: string;
  fullDescription: string;
  cover: string;
  featured: boolean;
  characters: string[];
  themes: string[];
  quotes: string[];
  author: string;
  genre: string[];
  awards: string[];
}

export interface FallbackBlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  tags: string[];
  author: string;
  published: boolean;
}

export interface FallbackAuthor {
  name: string;
  fullName: string;
  bio: string;
  image: string;
  location: string;
  education: string[];
  personal: string[];
  writingJourney: string[];
  socialMedia: {
    website: string;
    email: string;
    booksEmail: string;
  };
  stats: {
    booksInSeries: number;
    kingdoms: string;
    heroes: string;
    prophecy: string;
  };
}

class FallbackAdminService {
  // Books Management
  async getAllBooks(): Promise<FallbackBook[]> {
    return booksData.books;
  }

  async getBookById(id: string): Promise<FallbackBook | null> {
    return booksData.books.find(book => book.id === id) || null;
  }

  async createBook(book: Omit<FallbackBook, 'id'>): Promise<FallbackBook | null> {
    const newBook: FallbackBook = { ...book, id: `book-${Date.now()}` };
    booksData.books.push(newBook);
    console.log('📝 Fallback: Book created (not persisted):', newBook);
    return newBook;
  }

  async updateBook(id: string, updates: Partial<FallbackBook>): Promise<FallbackBook | null> {
    const bookIndex = booksData.books.findIndex(book => book.id === id);
    if (bookIndex === -1) return null;

    booksData.books[bookIndex] = { ...booksData.books[bookIndex], ...updates };
    console.log('📝 Fallback: Book updated (not persisted):', booksData.books[bookIndex]);
    return booksData.books[bookIndex];
  }

  async deleteBook(id: string): Promise<boolean> {
    const bookIndex = booksData.books.findIndex(book => book.id === id);
    if (bookIndex === -1) return false;

    booksData.books.splice(bookIndex, 1);
    console.log('📝 Fallback: Book deleted (not persisted):', id);
    return true;
  }

  // Blog Posts Management
  async getAllBlogPosts(): Promise<FallbackBlogPost[]> {
    return blogPostsData.blogPosts.filter(post => post.published);
  }

  async getBlogPostById(id: number): Promise<FallbackBlogPost | null> {
    return blogPostsData.blogPosts.find(post => post.id === id) || null;
  }

  async createBlogPost(post: Omit<FallbackBlogPost, 'id'>): Promise<FallbackBlogPost | null> {
    const newId = Math.max(...blogPostsData.blogPosts.map(p => p.id)) + 1;
    const newPost: FallbackBlogPost = { ...post, id: newId };
    blogPostsData.blogPosts.push(newPost);
    console.log('📝 Fallback: Blog post created (not persisted):', newPost);
    return newPost;
  }

  async updateBlogPost(id: number, updates: Partial<FallbackBlogPost>): Promise<FallbackBlogPost | null> {
    const postIndex = blogPostsData.blogPosts.findIndex(post => post.id === id);
    if (postIndex === -1) return null;

    blogPostsData.blogPosts[postIndex] = { ...blogPostsData.blogPosts[postIndex], ...updates };
    console.log('📝 Fallback: Blog post updated (not persisted):', blogPostsData.blogPosts[postIndex]);
    return blogPostsData.blogPosts[postIndex];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const postIndex = blogPostsData.blogPosts.findIndex(post => post.id === id);
    if (postIndex === -1) return false;

    blogPostsData.blogPosts.splice(postIndex, 1);
    console.log('📝 Fallback: Blog post deleted (not persisted):', id);
    return true;
  }

  // Author Management
  async getAuthor(): Promise<FallbackAuthor | null> {
    return authorData.author;
  }

  async updateAuthor(updates: Partial<FallbackAuthor>): Promise<FallbackAuthor | null> {
    authorData.author = { ...authorData.author, ...updates };
    console.log('📝 Fallback: Author updated (not persisted):', authorData.author);
    return authorData.author;
  }

  // Search functionality
  async searchBooks(query: string): Promise<FallbackBook[]> {
    const lowercaseQuery = query.toLowerCase();
    return booksData.books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.description.toLowerCase().includes(lowercaseQuery) ||
      book.themes.some(theme => theme.toLowerCase().includes(lowercaseQuery))
    );
  }

  async searchBlogPosts(query: string): Promise<FallbackBlogPost[]> {
    const lowercaseQuery = query.toLowerCase();
    return blogPostsData.blogPosts.filter(post => 
      post.published && (
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
    );
  }
}

export const fallbackAdminService = new FallbackAdminService();
export default fallbackAdminService;
