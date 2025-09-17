// Simple CMS Service for managing content
import booksData from './data/books.json';
import blogPostsData from './data/blog-posts.json';
import authorData from './data/author.json';

export interface Book {
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

export interface BlogPost {
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

export interface Author {
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

class CMSService {
  // Books
  getAllBooks(): Book[] {
    return booksData.books;
  }

  getBookById(id: string): Book | undefined {
    return booksData.books.find(book => book.id === id);
  }

  getFeaturedBooks(): Book[] {
    return booksData.books.filter(book => book.featured);
  }

  // Blog Posts
  getAllBlogPosts(): BlogPost[] {
    return blogPostsData.blogPosts.filter(post => post.published);
  }

  getBlogPostById(id: number): BlogPost | undefined {
    return blogPostsData.blogPosts.find(post => post.id === id && post.published);
  }

  getFeaturedBlogPosts(): BlogPost[] {
    return blogPostsData.blogPosts.filter(post => post.featured && post.published);
  }

  getBlogPostsByCategory(category: string): BlogPost[] {
    return blogPostsData.blogPosts.filter(post => 
      post.category === category && post.published
    );
  }

  getBlogCategories(): string[] {
    const categories = new Set(blogPostsData.blogPosts.map(post => post.category));
    return Array.from(categories);
  }

  // Author
  getAuthor(): Author {
    return authorData.author;
  }

  // Search functionality
  searchBooks(query: string): Book[] {
    const lowercaseQuery = query.toLowerCase();
    return booksData.books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.description.toLowerCase().includes(lowercaseQuery) ||
      book.themes.some(theme => theme.toLowerCase().includes(lowercaseQuery))
    );
  }

  searchBlogPosts(query: string): BlogPost[] {
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

export const cmsService = new CMSService();
export default cmsService;
