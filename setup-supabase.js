#!/usr/bin/env node

/**
 * Supabase Setup Helper
 * This script helps you get your Supabase credentials and set up the environment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Supabase Setup Helper for Heirs of Eleusa CMS\n');

console.log('📋 Step-by-step setup instructions:\n');

console.log('1. 🌐 Go to your Supabase project dashboard');
console.log('   https://supabase.com/dashboard/projects\n');

console.log('2. 🔑 Get your project credentials:');
console.log('   - Go to Settings → API');
console.log('   - Copy your "Project URL" (looks like: https://abc123.supabase.co)');
console.log('   - Copy your "anon public" key (starts with: eyJ...)\n');

console.log('3. 📝 Update your .env file:');
console.log('   - Open .env in your project root');
console.log('   - Replace the placeholder values with your actual credentials\n');

console.log('4. 🗄️  Set up your database:');
console.log('   - Go to SQL Editor in your Supabase dashboard');
console.log('   - Copy the contents of supabase-schema.sql');
console.log('   - Paste and run the SQL to create tables\n');

console.log('5. 🧪 Test your setup:');
console.log('   - Run: npm start');
console.log('   - Go to: http://localhost:3000/admin');
console.log('   - Login with: admin / heirsofeleusa2024\n');

console.log('📁 Files created for you:');
console.log('   ✅ .env - Environment variables (update with your credentials)');
console.log('   ✅ supabase-schema.sql - Database schema');
console.log('   ✅ SUPABASE_SETUP.md - Detailed setup guide\n');

console.log('🔧 Current .env file location:');
console.log(`   ${path.resolve('.env')}\n`);

console.log('❓ Need help? Check SUPABASE_SETUP.md for detailed instructions\n');

// Check if .env exists
if (fs.existsSync('.env')) {
  console.log('✅ .env file found!');
  
  // Read and check if it has placeholder values
  const envContent = fs.readFileSync('.env', 'utf8');
  if (envContent.includes('your-project-id.supabase.co')) {
    console.log('⚠️  Remember to update .env with your actual Supabase credentials\n');
  } else {
    console.log('✅ .env file appears to be configured\n');
  }
} else {
  console.log('❌ .env file not found. Creating one now...\n');
}
