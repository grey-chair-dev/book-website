-- Fix Blog Posts Table Schema
-- Run this in your Supabase SQL Editor

-- First, let's check the current structure and fix the ID column
-- Make sure the id column is properly set as SERIAL (auto-incrementing)
ALTER TABLE blog_posts 
ALTER COLUMN id SET DEFAULT nextval('blog_posts_id_seq');

-- If the sequence doesn't exist, create it
CREATE SEQUENCE IF NOT EXISTS blog_posts_id_seq;
ALTER TABLE blog_posts ALTER COLUMN id SET DEFAULT nextval('blog_posts_id_seq');
ALTER SEQUENCE blog_posts_id_seq OWNED BY blog_posts.id;

-- Set the sequence to start from the next available ID
SELECT setval('blog_posts_id_seq', COALESCE((SELECT MAX(id) FROM blog_posts), 0) + 1, false);

-- Ensure the id column is NOT NULL
ALTER TABLE blog_posts ALTER COLUMN id SET NOT NULL;

-- Add any missing columns that might not exist yet
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500),
ADD COLUMN IF NOT EXISTS author_image VARCHAR(500),
ADD COLUMN IF NOT EXISTS author_bio TEXT,
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS social_image VARCHAR(500),
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS comment_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

-- Update existing blog posts with default values
UPDATE blog_posts 
SET 
  slug = COALESCE(slug, LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'))),
  status = COALESCE(status, CASE WHEN published = true THEN 'published' ELSE 'draft' END),
  author_image = COALESCE(author_image, '/images/author/ce-scott.avif'),
  author_bio = COALESCE(author_bio, 'C.E. Scott is the author of the Heirs of Eleusa epic fantasy series.'),
  last_modified = COALESCE(last_modified, updated_at, NOW())
WHERE slug IS NULL OR slug = '';

-- Create slug generation function
CREATE OR REPLACE FUNCTION generate_blog_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'),
    '\s+', '-', 'g'
  ));
END;
$$ LANGUAGE plpgsql;

-- Create auto-slug trigger
CREATE OR REPLACE FUNCTION auto_generate_blog_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = generate_blog_slug(NEW.title);
  END IF;
  NEW.last_modified = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS trigger_auto_generate_blog_slug ON blog_posts;

-- Create the trigger
CREATE TRIGGER trigger_auto_generate_blog_slug
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_blog_slug();
