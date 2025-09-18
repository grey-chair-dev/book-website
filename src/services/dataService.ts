// Real data service that uses the database API
const API_BASE_URL = 'http://localhost:3001/api';

// Public data service for frontend components
export class DataService {
  // Books
  static async getAllBooks() {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      if (!response.ok) throw new Error('Failed to fetch books');
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }

  static async getBookById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      if (!response.ok) throw new Error('Failed to fetch book');
      return await response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      return null;
    }
  }

  static async getFeaturedBooks() {
    try {
      const books = await this.getAllBooks();
      return books.filter((book: any) => book.featured);
    } catch (error) {
      console.error('Error fetching featured books:', error);
      return [];
    }
  }

  // Blog Posts
  static async getAllBlogPosts() {
    try {
      const response = await fetch(`${API_BASE_URL}/blog-posts`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  static async getFeaturedBlogPosts() {
    try {
      const posts = await this.getAllBlogPosts();
      return posts.filter((post: any) => post.featured);
    } catch (error) {
      console.error('Error fetching featured blog posts:', error);
      return [];
    }
  }

  static async getBlogPostById(id: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog-posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  // Author
  static async getAuthor() {
    try {
      const response = await fetch(`${API_BASE_URL}/author`);
      if (!response.ok) throw new Error('Failed to fetch author');
      return await response.json();
    } catch (error) {
      console.error('Error fetching author:', error);
      return null;
    }
  }
}

export default DataService;
