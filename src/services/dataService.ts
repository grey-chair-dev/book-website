// Real data service that uses the database API
import { buildApiUrl } from '../config/api';

// Public data service for frontend components
export class DataService {
  // Books
  static async getAllBooks() {
    try {
      const response = await fetch(buildApiUrl('/books'));
      if (!response.ok) throw new Error('Failed to fetch books');
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }

  static async getBookById(id: string) {
    try {
      const response = await fetch(buildApiUrl(`/books/${id}`));
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
      const response = await fetch(buildApiUrl('/blog-posts'));
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  static async getBlogPostBySlug(slug: string) {
    try {
      const response = await fetch(buildApiUrl(`/blog-posts/slug/${slug}`));
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
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
      const response = await fetch(buildApiUrl(`/blog-posts/${id}`));
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
      const response = await fetch(buildApiUrl('/author'));
      if (!response.ok) throw new Error('Failed to fetch author');
      return await response.json();
    } catch (error) {
      console.error('Error fetching author:', error);
      return null;
    }
  }
}

export default DataService;
