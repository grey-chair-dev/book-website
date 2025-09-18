import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Send, Loader2, User, Calendar, Reply } from 'lucide-react';
import { likesCommentsService, BlogComment, CreateCommentData } from '../services/likesCommentsService';

interface CommentsProps {
  blogPostId: number;
  initialCommentCount?: number;
  className?: string;
}

const Comments: React.FC<CommentsProps> = ({ blogPostId, initialCommentCount = 0, className = '' }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);

  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });

  const loadComments = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const [commentsData, count] = await Promise.all([
        likesCommentsService.getComments(blogPostId),
        likesCommentsService.getCommentCount(blogPostId)
      ]);
      setComments(commentsData);
      setCommentCount(count);
    } catch (error) {
      console.error('Error loading comments:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [blogPostId]);

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments, loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author_name.trim() || !formData.author_email.trim() || !formData.content.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setHasError(false);

      const commentData: CreateCommentData = {
        blog_post_id: blogPostId,
        parent_id: replyTo || undefined,
        author_name: formData.author_name.trim(),
        author_email: formData.author_email.trim(),
        content: formData.content.trim()
      };

      const newComment = await likesCommentsService.addComment(commentData);
      
      if (newComment) {
        // Reset form
        setFormData({ author_name: '', author_email: '', content: '' });
        setReplyTo(null);
        setShowForm(false);
        
        // Reload comments
        await loadComments();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (commentId: number) => {
    setReplyTo(commentId);
    setShowForm(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderComment = (comment: BlogComment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-900">{comment.author_name}</span>
            <span className="text-gray-500 text-sm">•</span>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(comment.created_at)}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-800 mb-3 whitespace-pre-wrap">{comment.content}</p>
        
        {!isReply && (
          <button
            onClick={() => handleReply(comment.id)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Reply className="h-3 w-3" />
            Reply
          </button>
        )}
      </div>
      
      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className={className}>
      {/* Comments Toggle Button */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="text-sm font-medium">
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </span>
      </button>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4">
          {/* Add Comment Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showForm ? 'Cancel' : 'Add a comment'}
          </button>

          {/* Comment Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-4">
                {replyTo ? 'Reply to comment' : 'Leave a comment'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Comments are moderated and will appear after approval.
                </p>
                
                <div className="flex items-center gap-2">
                  {replyTo && (
                    <button
                      type="button"
                      onClick={() => {
                        setReplyTo(null);
                        setFormData({ author_name: '', author_email: '', content: '' });
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel Reply
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.author_name.trim() || !formData.author_email.trim() || !formData.content.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Comments List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Loading comments...</span>
            </div>
          ) : hasError ? (
            <div className="text-center py-8 text-gray-500">
              <p>Failed to load comments. Please try again later.</p>
              <button
                onClick={loadComments}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                Retry
              </button>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => renderComment(comment))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
