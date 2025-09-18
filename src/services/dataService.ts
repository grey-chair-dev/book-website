import { supabase } from '../lib/supabase';

// Public data service for frontend components
export class DataService {
  // Books
  static async getAllBooks() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('book_number', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }

  static async getBookById(id: string) {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching book:', error);
      return null;
    }
  }

  static async getFeaturedBooks() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('featured', true)
        .order('book_number', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured books:', error);
      return [];
    }
  }

  // Blog Posts
  static async getAllBlogPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  static async getFeaturedBlogPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured blog posts:', error);
      return [];
    }
  }

  static async getBlogPostById(id: number) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  // Author
  static async getAuthor() {
    try {
      const { data, error } = await supabase
        .from('author')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching author:', error);
      return null;
    }
  }
}

export default DataService;
