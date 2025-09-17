# 🗄️ Database Setup Guide

## Quick Setup Steps

### 1. Open Supabase SQL Editor
1. Go to your [Supabase Dashboard](https://dtnzylcnrbjknbygeksc.supabase.co)
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

### 2. Run the Database Setup
1. Copy the **entire contents** of `setup-database.sql`
2. Paste it into the SQL editor
3. Click **"Run"** (or press Ctrl+Enter)

### 3. Verify Setup
1. Go to **"Table Editor"** in the left sidebar
2. You should see 3 tables:
   - `books` (3 records)
   - `blog_posts` (3 records) 
   - `author` (1 record)

### 4. Test Your Admin System
1. Go to: http://localhost:3000/admin
2. Login with: `admin` / `heirsofeleusa2024`
3. You should see data from Supabase (no yellow banner)

## Troubleshooting

### If you get "snippet doesn't exist" error:
- Don't use snippets, create a new query instead
- Copy the entire SQL from `setup-database.sql`
- Paste directly into the SQL editor

### If you get permission errors:
- Make sure you're logged into your Supabase account
- Check that you have admin access to the project

### If tables don't appear:
- Check the SQL editor for error messages
- Make sure all SQL ran successfully
- Try running the SQL in smaller chunks

## What This Creates

### Tables:
- **books**: Your book catalog with covers, descriptions, themes
- **blog_posts**: Author blog posts with categories and tags
- **author**: Author profile and social media info

### Sample Data:
- 3 books from the Heirs of Eleusa series
- 3 blog posts about writing and inspiration
- Complete author profile for C.E. Scott

### Security:
- Public read access for website visitors
- Admin access for authenticated users
- Row Level Security (RLS) enabled

## Next Steps

Once the database is set up:
1. ✅ Test the admin interface
2. ✅ Edit some content to verify persistence
3. ✅ Customize the data to match your needs
4. ✅ Deploy your website with the CMS

## Need Help?

- Check the browser console for error messages
- Verify your `.env` file has the correct Supabase credentials
- Make sure your Supabase project is active and not paused
