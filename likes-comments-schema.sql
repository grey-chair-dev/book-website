-- Likes and Comments Schema for Blog Posts
-- Run this in your Supabase SQL Editor

-- Likes table
CREATE TABLE IF NOT EXISTS blog_likes (
  id SERIAL PRIMARY KEY,
  blog_post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_ip VARCHAR(45) NOT NULL, -- Store IP for anonymous likes
  user_agent TEXT, -- Store user agent for additional identification
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_post_id, user_ip) -- Prevent duplicate likes from same IP
);

-- Comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id SERIAL PRIMARY KEY,
  blog_post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES blog_comments(id) ON DELETE CASCADE, -- For nested replies
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'spam'
  user_ip VARCHAR(45) NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_likes_post_id ON blog_likes(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_created_at ON blog_likes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON blog_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments(created_at DESC);

-- Enable RLS
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Allow public to read likes and approved comments
CREATE POLICY "Anyone can view likes" ON blog_likes 
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view approved comments" ON blog_comments 
  FOR SELECT USING (status = 'approved');

-- Allow public to insert likes and comments
CREATE POLICY "Anyone can like posts" ON blog_likes 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can comment on posts" ON blog_comments 
  FOR INSERT WITH CHECK (true);

-- Allow service role to manage all data
CREATE POLICY "Service role can manage likes" ON blog_likes 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage comments" ON blog_comments 
  FOR ALL USING (auth.role() = 'service_role');

-- Function to update comment count on blog_posts
CREATE OR REPLACE FUNCTION update_blog_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'approved' THEN
    UPDATE blog_posts 
    SET comment_count = comment_count + 1 
    WHERE id = NEW.blog_post_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'approved' AND NEW.status = 'approved' THEN
      UPDATE blog_posts 
      SET comment_count = comment_count + 1 
      WHERE id = NEW.blog_post_id;
    ELSIF OLD.status = 'approved' AND NEW.status != 'approved' THEN
      UPDATE blog_posts 
      SET comment_count = comment_count - 1 
      WHERE id = NEW.blog_post_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'approved' THEN
    UPDATE blog_posts 
    SET comment_count = comment_count - 1 
    WHERE id = OLD.blog_post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Function to update like count on blog_posts
CREATE OR REPLACE FUNCTION update_blog_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blog_posts 
    SET like_count = like_count + 1 
    WHERE id = NEW.blog_post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blog_posts 
    SET like_count = like_count - 1 
    WHERE id = OLD.blog_post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_update_comment_count ON blog_comments;
CREATE TRIGGER trigger_update_comment_count
  AFTER INSERT OR UPDATE OR DELETE ON blog_comments
  FOR EACH ROW EXECUTE FUNCTION update_blog_post_comment_count();

DROP TRIGGER IF EXISTS trigger_update_like_count ON blog_likes;
CREATE TRIGGER trigger_update_like_count
  AFTER INSERT OR DELETE ON blog_likes
  FOR EACH ROW EXECUTE FUNCTION update_blog_post_like_count();

-- Update existing blog_posts to have like_count and comment_count columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'like_count') THEN
    ALTER TABLE blog_posts ADD COLUMN like_count INTEGER DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'comment_count') THEN
    ALTER TABLE blog_posts ADD COLUMN comment_count INTEGER DEFAULT 0;
  END IF;
END $$;
