// Mock likes and comments service for development
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

export class MockLikesCommentsService {
  // Likes
  static async likePost(blogPostId: number): Promise<boolean> {
    console.log('Liking post:', blogPostId);
    return true;
  }

  static async unlikePost(blogPostId: number): Promise<boolean> {
    console.log('Unliking post:', blogPostId);
    return true;
  }

  static async getLikesCount(blogPostId: number): Promise<number> {
    // Return mock count
    return Math.floor(Math.random() * 50) + 10;
  }

  static async getLikeCount(blogPostId: number): Promise<number> {
    // Alias for getLikesCount
    return this.getLikesCount(blogPostId);
  }

  static async hasUserLiked(blogPostId: number): Promise<boolean> {
    // Return random like status
    return Math.random() > 0.5;
  }

  static async hasUserLikedPost(blogPostId: number): Promise<boolean> {
    // Alias for hasUserLiked
    return this.hasUserLiked(blogPostId);
  }

  static async getCommentCount(blogPostId: number): Promise<number> {
    // Return mock comment count
    return Math.floor(Math.random() * 20) + 5;
  }

  static async addComment(data: CreateCommentData): Promise<BlogComment | null> {
    // Alias for createComment
    return this.createComment(data);
  }

  // Comments
  static async getComments(blogPostId: number): Promise<BlogComment[]> {
    // Return mock comments
    return [
      {
        id: 1,
        blog_post_id: blogPostId,
        author_name: 'John Doe',
        author_email: 'john@example.com',
        content: 'This is a great post! I really enjoyed reading it.',
        status: 'approved',
        created_at: '2024-12-15T10:00:00Z',
        updated_at: '2024-12-15T10:00:00Z',
        replies: [
          {
            id: 2,
            blog_post_id: blogPostId,
            parent_id: 1,
            author_name: 'Jane Smith',
            author_email: 'jane@example.com',
            content: 'I agree! The writing is excellent.',
            status: 'approved',
            created_at: '2024-12-15T11:00:00Z',
            updated_at: '2024-12-15T11:00:00Z'
          }
        ]
      }
    ];
  }

  static async createComment(data: CreateCommentData): Promise<BlogComment | null> {
    console.log('Creating comment:', data);
    return {
      id: Math.floor(Math.random() * 1000),
      blog_post_id: data.blogPostId,
      parent_id: data.parentId,
      author_name: data.authorName,
      author_email: data.authorEmail,
      content: data.content,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  static async updateCommentStatus(commentId: number, status: 'approved' | 'rejected'): Promise<boolean> {
    console.log('Updating comment status:', commentId, status);
    return true;
  }

  static async deleteComment(commentId: number): Promise<boolean> {
    console.log('Deleting comment:', commentId);
    return true;
  }
}

export const likesCommentsService = MockLikesCommentsService;
