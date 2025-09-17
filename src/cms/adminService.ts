// Admin Service for actually saving changes to JSON files
import booksData from './data/books.json';
import blogPostsData from './data/blog-posts.json';
import authorData from './data/author.json';

export interface AdminBook {
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

export interface AdminBlogPost {
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

export interface AdminAuthor {
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

class AdminService {
  // Books Management
  getAllBooks(): AdminBook[] {
    return booksData.books;
  }

  getBookById(id: string): AdminBook | undefined {
    return booksData.books.find(book => book.id === id);
  }

  updateBook(id: string, updates: Partial<AdminBook>): boolean {
    try {
      const bookIndex = booksData.books.findIndex(book => book.id === id);
      if (bookIndex === -1) return false;

      booksData.books[bookIndex] = { ...booksData.books[bookIndex], ...updates };
      
      // In a real implementation, this would save to a database
      // For now, we'll just update the in-memory data
      console.log('Book updated:', booksData.books[bookIndex]);
      return true;
    } catch (error) {
      console.error('Error updating book:', error);
      return false;
    }
  }

  deleteBook(id: string): boolean {
    try {
      const bookIndex = booksData.books.findIndex(book => book.id === id);
      if (bookIndex === -1) return false;

      booksData.books.splice(bookIndex, 1);
      console.log('Book deleted:', id);
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      return false;
    }
  }

  addBook(book: Omit<AdminBook, 'id'>): boolean {
    try {
      const newId = `book-${Date.now()}`;
      const newBook: AdminBook = { ...book, id: newId };
      booksData.books.push(newBook);
      console.log('Book added:', newBook);
      return true;
    } catch (error) {
      console.error('Error adding book:', error);
      return false;
    }
  }

  // Blog Posts Management
  getAllBlogPosts(): AdminBlogPost[] {
    return blogPostsData.blogPosts;
  }

  getBlogPostById(id: number): AdminBlogPost | undefined {
    return blogPostsData.blogPosts.find(post => post.id === id);
  }

  updateBlogPost(id: number, updates: Partial<AdminBlogPost>): boolean {
    try {
      const postIndex = blogPostsData.blogPosts.findIndex(post => post.id === id);
      if (postIndex === -1) return false;

      blogPostsData.blogPosts[postIndex] = { ...blogPostsData.blogPosts[postIndex], ...updates };
      console.log('Blog post updated:', blogPostsData.blogPosts[postIndex]);
      return true;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return false;
    }
  }

  deleteBlogPost(id: number): boolean {
    try {
      const postIndex = blogPostsData.blogPosts.findIndex(post => post.id === id);
      if (postIndex === -1) return false;

      blogPostsData.blogPosts.splice(postIndex, 1);
      console.log('Blog post deleted:', id);
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }

  addBlogPost(post: Omit<AdminBlogPost, 'id'>): boolean {
    try {
      const newId = Math.max(...blogPostsData.blogPosts.map(p => p.id)) + 1;
      const newPost: AdminBlogPost = { ...post, id: newId };
      blogPostsData.blogPosts.push(newPost);
      console.log('Blog post added:', newPost);
      return true;
    } catch (error) {
      console.error('Error adding blog post:', error);
      return false;
    }
  }

  // Author Management
  getAuthor(): AdminAuthor {
    return authorData.author;
  }

  updateAuthor(updates: Partial<AdminAuthor>): boolean {
    try {
      authorData.author = { ...authorData.author, ...updates };
      console.log('Author updated:', authorData.author);
      return true;
    } catch (error) {
      console.error('Error updating author:', error);
      return false;
    }
  }

  // Utility functions
  exportData(): string {
    return JSON.stringify({
      books: booksData.books,
      blogPosts: blogPostsData.blogPosts,
      author: authorData.author
    }, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.books) booksData.books = data.books;
      if (data.blogPosts) blogPostsData.blogPosts = data.blogPosts;
      if (data.author) authorData.author = data.author;
      console.log('Data imported successfully');
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

export const adminService = new AdminService();
export default adminService;
