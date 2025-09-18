-- Enhanced Blog Posts Schema for Neon PostgreSQL
-- Run this in your Neon SQL Editor to add missing blog fields

-- Add new columns to existing blog_posts table
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

-- Create index for slug for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

-- Update existing blog posts with default values
UPDATE blog_posts 
SET 
  slug = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g')),
  status = CASE WHEN published = true THEN 'published' ELSE 'draft' END,
  author_image = '/images/author/ce-scott.avif',
  author_bio = 'C.E. Scott is the author of the Heirs of Eleusa epic fantasy series.',
  last_modified = COALESCE(updated_at, created_at, NOW())
WHERE slug IS NULL;

-- Create a function to generate slugs
CREATE OR REPLACE FUNCTION generate_blog_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'),
    '\s+', '-', 'g'
  ));
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to auto-generate slugs
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

CREATE TRIGGER trigger_auto_generate_blog_slug
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_blog_slug();

-- Additional indexes for better performance on Neon
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON blog_posts(view_count DESC);

-- Add comments for documentation
COMMENT ON TABLE blog_posts IS 'Enhanced blog posts table with SEO and social media features';
COMMENT ON COLUMN blog_posts.slug IS 'URL-friendly identifier for the blog post';
COMMENT ON COLUMN blog_posts.meta_description IS 'SEO meta description for search engines';
COMMENT ON COLUMN blog_posts.social_image IS 'Image used when sharing on social media';
COMMENT ON COLUMN blog_posts.view_count IS 'Number of times this post has been viewed';
COMMENT ON COLUMN blog_posts.status IS 'Publication status: draft, published, or archived';
