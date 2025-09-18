// Real likes and comments service that uses the database API
import { buildApiUrl } from '../config/api';

export interface BlogComment {
  id: number;
  blog_post_id: number;
  parent_id?: number;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  replies?: BlogComment[];
}

export interface CreateCommentData {
  blogPostId: number;
  authorName: string;
  authorEmail: string;
  content: string;
  parentId?: number;
}

export class RealLikesCommentsService {
  // Likes
  static async likePost(blogPostId: number): Promise<boolean> {
    try {
      const response = await fetch(buildApiUrl(`/blog-posts/${blogPostId}/like`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch (error) {
      console.error('Error liking post:', error);
      return false;
    }
  }

  static async unlikePost(blogPostId: number): Promise<boolean> {
    try {
      const response = await fetch(buildApiUrl(`/blog-posts/${blogPostId}/unlike`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch (error) {
      console.error('Error unliking post:', error);
      return false;
    }
  }

  static async getLikeCount(blogPostId: number): Promise<number> {
    try {
      // Get the blog post data which includes like_count
      const response = await fetch(buildApiUrl(`/blog-posts/${blogPostId}`));
      if (!response.ok) return 0;
      const post = await response.json();
      return post.like_count || 0;
    } catch (error) {
      console.error('Error fetching like count:', error);
      return 0;
    }
  }

  static async hasUserLikedPost(blogPostId: number): Promise<boolean> {
    // For now, return false since we don't have user authentication
    // In a real app, this would check the user's like status
    return false;
  }

  static async getCommentCount(blogPostId: number): Promise<number> {
    try {
      // Get the blog post data which includes comment_count
      const response = await fetch(buildApiUrl(`/blog-posts/${blogPostId}`));
      if (!response.ok) return 0;
      const post = await response.json();
      return post.comment_count || 0;
    } catch (error) {
      console.error('Error fetching comment count:', error);
      return 0;
    }
  }

  // Comments
  static async getComments(blogPostId: number): Promise<BlogComment[]> {
    try {
      const response = await fetch(buildApiUrl(`/blog-posts/${blogPostId}/comments`));
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  static async addComment(data: CreateCommentData): Promise<BlogComment | null> {
    try {
      const response = await fetch(buildApiUrl('/comments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blog_post_id: data.blogPostId,
          parent_id: data.parentId,
          author_name: data.authorName,
          author_email: data.authorEmail,
          content: data.content
        }),
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error creating comment:', error);
      return null;
    }
  }

  static async updateCommentStatus(commentId: number, status: 'approved' | 'rejected'): Promise<boolean> {
    try {
      const response = await fetch(buildApiUrl(`/comments/${commentId}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error updating comment status:', error);
      return false;
    }
  }

  static async deleteComment(commentId: number): Promise<boolean> {
    try {
      const response = await fetch(buildApiUrl(`/comments/${commentId}`), {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  }
}

export const likesCommentsService = RealLikesCommentsService;
