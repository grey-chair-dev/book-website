import { supabase } from '../lib/supabase';

export interface BlogLike {
  id: number;
  blog_post_id: number;
  user_ip: string;
  user_agent?: string;
  created_at: string;
}

export interface BlogComment {
  id: number;
  blog_post_id: number;
  parent_id?: number;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  user_ip: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
  replies?: BlogComment[];
}

export interface CreateCommentData {
  blog_post_id: number;
  parent_id?: number;
  author_name: string;
  author_email: string;
  content: string;
}

class LikesCommentsService {
  // Get user's IP address (for anonymous likes/comments)
  private getUserIP(): string {
    // In a real app, you'd get this from the server
    // For now, we'll use a simple client-side approach
    return 'anonymous_' + Math.random().toString(36).substr(2, 9);
  }

  private getUserAgent(): string {
    return navigator.userAgent;
  }

  // Like a blog post
  async likePost(blogPostId: number): Promise<boolean> {
    try {
      const userIP = this.getUserIP();
      const userAgent = this.getUserAgent();

      const { error } = await supabase
        .from('blog_likes')
        .insert({
          blog_post_id: blogPostId,
          user_ip: userIP,
          user_agent: userAgent
        });

      if (error) {
        // If it's a duplicate key error, the user already liked this post
        if (error.code === '23505') {
          return false; // Already liked
        }
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error liking post:', error);
      return false;
    }
  }

  // Unlike a blog post
  async unlikePost(blogPostId: number): Promise<boolean> {
    try {
      const userIP = this.getUserIP();

      const { error } = await supabase
        .from('blog_likes')
        .delete()
        .eq('blog_post_id', blogPostId)
        .eq('user_ip', userIP);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error unliking post:', error);
      return false;
    }
  }

  // Check if user has liked a post
  async hasUserLikedPost(blogPostId: number): Promise<boolean> {
    try {
      const userIP = this.getUserIP();

      const { data, error } = await supabase
        .from('blog_likes')
        .select('id')
        .eq('blog_post_id', blogPostId)
        .eq('user_ip', userIP)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking like status:', error);
      return false;
    }
  }

  // Get like count for a post
  async getLikeCount(blogPostId: number): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('blog_likes')
        .select('*', { count: 'exact', head: true })
        .eq('blog_post_id', blogPostId);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting like count:', error);
      return 0;
    }
  }

  // Add a comment
  async addComment(commentData: CreateCommentData): Promise<BlogComment | null> {
    try {
      const userIP = this.getUserIP();
      const userAgent = this.getUserAgent();

      const { data, error } = await supabase
        .from('blog_comments')
        .insert({
          ...commentData,
          user_ip: userIP,
          user_agent: userAgent
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  }

  // Get comments for a blog post (approved only)
  async getComments(blogPostId: number): Promise<BlogComment[]> {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        .eq('status', 'approved')
        .is('parent_id', null) // Only top-level comments
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Get replies for each comment
      const commentsWithReplies = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: replies } = await supabase
            .from('blog_comments')
            .select('*')
            .eq('parent_id', comment.id)
            .eq('status', 'approved')
            .order('created_at', { ascending: true });

          return {
            ...comment,
            replies: replies || []
          };
        })
      );

      return commentsWithReplies;
    } catch (error) {
      console.error('Error getting comments:', error);
      return [];
    }
  }

  // Get comment count for a post
  async getCommentCount(blogPostId: number): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('blog_comments')
        .select('*', { count: 'exact', head: true })
        .eq('blog_post_id', blogPostId)
        .eq('status', 'approved');

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting comment count:', error);
      return 0;
    }
  }

  // Admin: Get all comments (including pending)
  async getAllComments(blogPostId?: number): Promise<BlogComment[]> {
    try {
      let query = supabase
        .from('blog_comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (blogPostId) {
        query = query.eq('blog_post_id', blogPostId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting all comments:', error);
      return [];
    }
  }

  // Admin: Update comment status
  async updateCommentStatus(commentId: number, status: 'pending' | 'approved' | 'rejected' | 'spam'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', commentId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating comment status:', error);
      return false;
    }
  }

  // Admin: Delete comment
  async deleteComment(commentId: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  }
}

export const likesCommentsService = new LikesCommentsService();
