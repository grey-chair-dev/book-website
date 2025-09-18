import React, { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { likesCommentsService } from '../services/mockLikesCommentsService';

interface LikesProps {
  blogPostId: number;
  initialLikeCount?: number;
  className?: string;
}

const Likes: React.FC<LikesProps> = ({ blogPostId, initialLikeCount = 0, className = '' }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadLikeData = async () => {
      try {
        setIsLoading(true);
        const [count, liked] = await Promise.all([
          likesCommentsService.getLikeCount(blogPostId),
          likesCommentsService.hasUserLikedPost(blogPostId)
        ]);
        setLikeCount(count);
        setIsLiked(liked);
      } catch (error) {
        console.error('Error loading like data:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadLikeData();
  }, [blogPostId]);

  const handleLikeToggle = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setHasError(false);

      if (isLiked) {
        const success = await likesCommentsService.unlikePost(blogPostId);
        if (success) {
          setIsLiked(false);
          setLikeCount(prev => Math.max(0, prev - 1));
        }
      } else {
        const success = await likesCommentsService.likePost(blogPostId);
        if (success) {
          setIsLiked(true);
          setLikeCount(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasError) {
    return (
      <div className={`flex items-center gap-2 text-gray-500 ${className}`}>
        <Heart className="h-4 w-4" />
        <span className="text-sm">{likeCount}</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isLoading}
      className={`flex items-center gap-2 transition-colors duration-200 ${
        isLiked 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-500 hover:text-red-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart 
          className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} 
        />
      )}
      <span className="text-sm font-medium">
        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
      </span>
    </button>
  );
};

export default Likes;
