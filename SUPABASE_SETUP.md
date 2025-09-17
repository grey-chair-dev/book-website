# Supabase Setup Guide

This guide will help you set up Supabase for your Heirs of Eleusa CMS.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `heirs-of-eleusa-cms`
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste it into the SQL editor
4. Click "Run" to execute the SQL
5. You should see success messages for each table creation

## Step 5: Set Up Row Level Security (RLS)

The SQL script already includes RLS policies, but you may need to adjust them based on your needs:

1. Go to **Authentication** → **Policies**
2. Review the policies for each table
3. For production, consider creating more restrictive policies

## Step 6: Test the Connection

1. Start your development server:
   ```bash
   npm start
   ```

2. Go to `http://localhost:3000/admin`
3. Login with the demo credentials:
   - Username: `admin`
   - Password: `heirsofeleusa2024`

4. You should see the admin dashboard with data from Supabase

## Step 7: Verify Data

1. In your Supabase dashboard, go to **Table Editor**
2. Check that you have data in:
   - `books` table (3 books)
   - `blog_posts` table (3 blog posts)
   - `author` table (1 author record)

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**:
   - Check that your `.env` file has the correct credentials
   - Make sure there are no extra spaces in the values
   - Restart your development server after changing `.env`

2. **"Table doesn't exist" error**:
   - Make sure you ran the SQL schema script
   - Check the SQL editor for any error messages

3. **"Permission denied" error**:
   - Check your RLS policies
   - Make sure the policies allow the operations you're trying to perform

4. **Data not loading**:
   - Check the browser console for errors
   - Verify your Supabase project is active
   - Check that the data was inserted correctly

### Getting Help:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Look at the browser console for error messages
- Check the Supabase dashboard logs in **Logs** → **API**

## Next Steps

Once everything is working:

1. **Customize the data**: Edit the sample data in Supabase
2. **Set up authentication**: Implement proper user authentication
3. **Add more features**: Extend the admin interface as needed
4. **Deploy**: Deploy your app with the Supabase integration

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables in production
- Consider implementing proper user authentication
- Review and adjust RLS policies for your security needs
