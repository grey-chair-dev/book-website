// Real admin service that uses the database API
const API_BASE_URL = 'http://localhost:3001/api';

class RealAdminService {
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

  static async createBook(bookData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (!response.ok) throw new Error('Failed to create book');
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  static async updateBook(id: string, bookData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (!response.ok) throw new Error('Failed to update book');
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  static async deleteBook(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete book');
      return await response.json();
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
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

  static async createBlogPost(postData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog-posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!response.ok) throw new Error('Failed to create blog post');
      return await response.json();
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  static async updateBlogPost(id: number, postData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog-posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!response.ok) throw new Error('Failed to update blog post');
      return await response.json();
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  static async deleteBlogPost(id: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/blog-posts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete blog post');
      return await response.json();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
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

  static async updateAuthor(authorData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/author`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authorData)
      });
      if (!response.ok) throw new Error('Failed to update author');
      return await response.json();
    } catch (error) {
      console.error('Error updating author:', error);
      throw error;
    }
  }

  static async createAuthor(authorData: any) {
    // For author, we use updateAuthor which handles both create and update
    return this.updateAuthor(authorData);
  }

  // Comments
  static async getAllComments() {
    try {
      const response = await fetch(`${API_BASE_URL}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  static async updateCommentStatus(commentId: number, status: 'approved' | 'rejected') {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update comment status');
      return await response.json();
    } catch (error) {
      console.error('Error updating comment status:', error);
      throw error;
    }
  }

  static async deleteComment(commentId: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete comment');
      return await response.json();
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }

  // Edit History (mock for now)
  static async getEditHistory() {
    return [];
  }

  static async undoEdit(editId: number) {
    console.log('Undo edit:', editId);
    return true;
  }
}

export const realAdminService = RealAdminService;
