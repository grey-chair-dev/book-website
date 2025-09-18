import { createClient } from '@supabase/supabase-js';

// You'll need to replace these with your actual Supabase project credentials
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://dtnzylcnrbjknbygeksc.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0bnp5bGNucmJqa25ieWdla3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzE1NTcsImV4cCI6MjA3MzcwNzU1N30.ypUzgh80NfKQut7SKVwU-abLCsEg_U7jWKREtiIQPb8';
const supabaseServiceRoleKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0bnp5bGNucmJqa25ieWdla3NjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODEzMTU1NywiZXhwIjoyMDczNzA3NTU3fQ.PmhcdpwRdxOrhaHqTgLjA-Y-GyKRr0YCd7G7wu4DEvg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Database types
export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          title: string;
          series: string;
          book_number: number;
          year: string;
          description: string;
          full_description: string;
          cover: string;
          featured: boolean;
          characters: string[];
          themes: string[];
          quotes: string[];
          author: string;
          genre: string[];
          awards: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          series: string;
          book_number: number;
          year: string;
          description: string;
          full_description: string;
          cover: string;
          featured?: boolean;
          characters?: string[];
          themes?: string[];
          quotes?: string[];
          author: string;
          genre: string[];
          awards?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          series?: string;
          book_number?: number;
          year?: string;
          description?: string;
          full_description?: string;
          cover?: string;
          featured?: boolean;
          characters?: string[];
          themes?: string[];
          quotes?: string[];
          author?: string;
          genre?: string[];
          awards?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: number;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time: string;
          category: string;
          featured: boolean;
          tags: string[];
          author: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time: string;
          category: string;
          featured?: boolean;
          tags?: string[];
          author: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          excerpt?: string;
          content?: string;
          date?: string;
          read_time?: string;
          category?: string;
          featured?: boolean;
          tags?: string[];
          author?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      author: {
        Row: {
          id: number;
          name: string;
          full_name: string;
          bio: string;
          image: string;
          location: string;
          education: string[];
          personal: string[];
          writing_journey: string[];
          social_media: {
            website: string;
            email: string;
            books_email: string;
          };
          stats: {
            books_in_series: number;
            kingdoms: string;
            heroes: string;
            prophecy: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          full_name: string;
          bio: string;
          image: string;
          location: string;
          education?: string[];
          personal?: string[];
          writing_journey?: string[];
          social_media: {
            website: string;
            email: string;
            books_email: string;
          };
          stats: {
            books_in_series: number;
            kingdoms: string;
            heroes: string;
            prophecy: string;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          full_name?: string;
          bio?: string;
          image?: string;
          location?: string;
          education?: string[];
          personal?: string[];
          writing_journey?: string[];
          social_media?: {
            website: string;
            email: string;
            books_email: string;
          };
          stats?: {
            books_in_series: number;
            kingdoms: string;
            heroes: string;
            prophecy: string;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
