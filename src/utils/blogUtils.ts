// Utility functions for blog post management

export const generateBlogPostUrl = (post: { id: number; slug?: string }): string => {
  return `/blog/${post.slug || post.id}`;
};

export const openBlogPostInNewTab = (post: { id: number; slug?: string }): void => {
  const url = generateBlogPostUrl(post);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const formatBlogPostDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const generateBlogPostSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
