-- Edit History Table for Undo Functionality
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS edit_history (
  id SERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  old_data JSONB,
  new_data JSONB,
  user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_edit_history_table_record ON edit_history(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_edit_history_created_at ON edit_history(created_at DESC);

-- Enable RLS
ALTER TABLE edit_history ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read edit history
CREATE POLICY "Edit history is viewable by authenticated users" ON edit_history 
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow service role to manage edit history
CREATE POLICY "Service role can manage edit history" ON edit_history 
  FOR ALL USING (auth.role() = 'service_role');
