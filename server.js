require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|avif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Test database connection
pool.on('connect', () => {
  console.log('Connected to Neon database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// API Routes

// Books
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY book_number ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const {
      title, series, book_number, year, description, full_description,
      cover, featured, characters, themes, quotes, author, genre, awards
    } = req.body;

    const result = await pool.query(`
      INSERT INTO books (title, series, book_number, year, description, full_description, 
                        cover, featured, characters, themes, quotes, author, genre, awards)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `, [title, series, book_number, year, description, full_description,
        cover, featured, characters, themes, quotes, author, genre, awards]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const {
      title, series, book_number, year, description, full_description,
      cover, featured, characters, themes, quotes, author, genre, awards
    } = req.body;

    const result = await pool.query(`
      UPDATE books SET 
        title = $1, series = $2, book_number = $3, year = $4, 
        description = $5, full_description = $6, cover = $7, 
        featured = $8, characters = $9, themes = $10, quotes = $11, 
        author = $12, genre = $13, awards = $14, updated_at = NOW()
      WHERE id = $15
      RETURNING *
    `, [title, series, book_number, year, description, full_description,
        cover, featured, characters, themes, quotes, author, genre, awards, req.params.id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Blog Posts
app.get('/api/blog-posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE published = true ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog-posts/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1 AND published = true', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Get single blog post by slug
app.get('/api/blog-posts/slug/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1 AND published = true', [req.params.slug]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

app.post('/api/blog-posts', async (req, res) => {
  try {
    const {
      title, excerpt, content, date, read_time, category, featured, tags, author, published,
      featured_image, author_image, author_bio, slug, meta_description, social_image,
      view_count, like_count, comment_count, status, seo_title
    } = req.body;

    const result = await pool.query(`
      INSERT INTO blog_posts (
        title, excerpt, content, date, read_time, category, featured, tags, author, published,
        featured_image, author_image, author_bio, slug, meta_description, social_image,
        view_count, like_count, comment_count, status, seo_title
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *
    `, [
      title, excerpt, content, date, read_time, category, featured, 
      tags, author, published, featured_image, author_image, author_bio,
      slug, meta_description, social_image, view_count, like_count, 
      comment_count, status, seo_title
    ]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

app.put('/api/blog-posts/:id', async (req, res) => {
  try {
    const {
      title, excerpt, content, date, read_time, category, featured, tags, author, published,
      featured_image, author_image, author_bio, slug, meta_description, social_image,
      view_count, like_count, comment_count, status, seo_title
    } = req.body;

    // Provide defaults for required fields
    const safeExcerpt = excerpt || 'No excerpt provided';
    const safeContent = content || 'No content provided';
    const safeDate = date || new Date().toISOString().split('T')[0];
    const safeReadTime = read_time || '5 min read';
    const safeCategory = category || 'General';
    const safeAuthor = author || 'C.E. Scott';

    const result = await pool.query(`
      UPDATE blog_posts SET 
        title = $1, excerpt = $2, content = $3, date = $4, 
        read_time = $5, category = $6, featured = $7, 
        tags = $8, author = $9, published = $10,
        featured_image = $11, author_image = $12, author_bio = $13,
        slug = $14, meta_description = $15, social_image = $16,
        view_count = $17, like_count = $18, comment_count = $19,
        status = $20, seo_title = $21, updated_at = NOW()
      WHERE id = $22
      RETURNING *
    `, [
      title, safeExcerpt, safeContent, safeDate, safeReadTime, safeCategory, featured, 
      tags, safeAuthor, published, featured_image, author_image, author_bio,
      slug, meta_description, social_image, view_count, like_count, 
      comment_count, status, seo_title, req.params.id
    ]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

app.delete('/api/blog-posts/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Author
app.get('/api/author', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM author LIMIT 1');
    res.json(result.rows[0] || null);
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ error: 'Failed to fetch author' });
  }
});

app.put('/api/author', async (req, res) => {
  try {
    const {
      name, full_name, bio, image, location, education, personal, 
      writing_journey, social_media, stats
    } = req.body;

    // Check if author exists
    const existingResult = await pool.query('SELECT id FROM author LIMIT 1');
    
    if (existingResult.rows.length > 0) {
      // Update existing author
      const result = await pool.query(`
        UPDATE author SET 
          name = $1, full_name = $2, bio = $3, image = $4, location = $5,
          education = $6, personal = $7, writing_journey = $8, 
          social_media = $9, stats = $10, updated_at = NOW()
        WHERE id = $11
        RETURNING *
      `, [name, full_name, bio, image, location, education, personal, 
          writing_journey, social_media, stats, existingResult.rows[0].id]);
      res.json(result.rows[0]);
    } else {
      // Create new author
      const result = await pool.query(`
        INSERT INTO author (name, full_name, bio, image, location, education, personal, 
                           writing_journey, social_media, stats)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `, [name, full_name, bio, image, location, education, personal, 
          writing_journey, social_media, stats]);
      res.status(201).json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Failed to update author' });
  }
});

// Comments
app.get('/api/comments', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, bp.title as blog_post_title 
      FROM blog_comments c 
      LEFT JOIN blog_posts bp ON c.blog_post_id = bp.id 
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.put('/api/comments/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE blog_comments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating comment status:', error);
    res.status(500).json({ error: 'Failed to update comment status' });
  }
});

app.delete('/api/comments/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM blog_comments WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Email Subscriptions
app.post('/api/email-subscriptions', async (req, res) => {
  try {
    const { email, source = 'website' } = req.body;
    
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    // Check if email already exists
    const existing = await pool.query('SELECT id FROM email_subscriptions WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      res.status(409).json({ error: 'Email already subscribed' });
      return;
    }

    const result = await pool.query(
      'INSERT INTO email_subscriptions (email, source, subscribed_at) VALUES ($1, $2, NOW()) RETURNING *',
      [email, source]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating email subscription:', error);
    res.status(500).json({ error: 'Failed to create email subscription' });
  }
});

app.delete('/api/email-subscriptions', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    const result = await pool.query('DELETE FROM email_subscriptions WHERE email = $1 RETURNING *', [email]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Email subscription not found' });
      return;
    }
    
    res.json({ message: 'Email unsubscribed successfully' });
  } catch (error) {
    console.error('Error deleting email subscription:', error);
    res.status(500).json({ error: 'Failed to delete email subscription' });
  }
});

app.get('/api/email-subscriptions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM email_subscriptions ORDER BY subscribed_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching email subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch email subscriptions' });
  }
});

// Blog Post Comments
app.get('/api/blog-posts/:id/comments', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM blog_comments 
      WHERE blog_post_id = $1 AND status = 'approved' 
      ORDER BY created_at ASC
    `, [req.params.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog post comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Blog Post Likes (placeholder - would need user authentication in real app)
app.post('/api/blog-posts/:id/like', async (req, res) => {
  try {
    // For now, just increment the like count
    const result = await pool.query(
      'UPDATE blog_posts SET like_count = COALESCE(like_count, 0) + 1 WHERE id = $1 RETURNING like_count',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    
    res.json({ like_count: result.rows[0].like_count });
  } catch (error) {
    console.error('Error liking blog post:', error);
    res.status(500).json({ error: 'Failed to like blog post' });
  }
});

app.post('/api/blog-posts/:id/unlike', async (req, res) => {
  try {
    // For now, just decrement the like count
    const result = await pool.query(
      'UPDATE blog_posts SET like_count = GREATEST(COALESCE(like_count, 0) - 1, 0) WHERE id = $1 RETURNING like_count',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    
    res.json({ like_count: result.rows[0].like_count });
  } catch (error) {
    console.error('Error unliking blog post:', error);
    res.status(500).json({ error: 'Failed to unlike blog post' });
  }
});

// Image Upload
app.post('/api/upload/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      success: true, 
      imageUrl: imageUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
