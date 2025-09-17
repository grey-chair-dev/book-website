import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type Book = Database['public']['Tables']['books']['Row'];
type BookInsert = Database['public']['Tables']['books']['Insert'];
type BookUpdate = Database['public']['Tables']['books']['Update'];

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

type Author = Database['public']['Tables']['author']['Row'];
type AuthorUpdate = Database['public']['Tables']['author']['Update'];

class SupabaseAdminService {
  // Books Management
  async getAllBooks(): Promise<Book[]> {
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

  async getBookById(id: string): Promise<Book | null> {
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

  async createBook(book: BookInsert): Promise<Book | null> {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert(book)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating book:', error);
      return null;
    }
  }

  async updateBook(id: string, updates: BookUpdate): Promise<Book | null> {
    try {
      const { data, error } = await supabase
        .from('books')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating book:', error);
      return null;
    }
  }

  async deleteBook(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      return false;
    }
  }

  // Blog Posts Management
  async getAllBlogPosts(): Promise<BlogPost[]> {
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

  async getBlogPostById(id: number): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  async createBlogPost(post: BlogPostInsert): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
  }

  async updateBlogPost(id: number, updates: BlogPostUpdate): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }

  // Author Management
  async getAuthor(): Promise<Author | null> {
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

  async updateAuthor(updates: AuthorUpdate): Promise<Author | null> {
    try {
      const { data, error } = await supabase
        .from('author')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating author:', error);
      return null;
    }
  }

  // Search functionality
  async searchBooks(query: string): Promise<Book[]> {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('book_number', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }
  }

  // Data migration helpers
  async migrateFromJSON(): Promise<void> {
    try {
      // This would be used to migrate data from JSON files to Supabase
      console.log('Migration from JSON to Supabase would happen here');
    } catch (error) {
      console.error('Error during migration:', error);
    }
  }
}

export const supabaseAdminService = new SupabaseAdminService();
export default supabaseAdminService;
