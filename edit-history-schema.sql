-- Edit History Table for Undo Functionality
-- Run this in your Neon PostgreSQL database

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

-- Create additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_edit_history_user_id ON edit_history(user_id);
CREATE INDEX IF NOT EXISTS idx_edit_history_action ON edit_history(action);
