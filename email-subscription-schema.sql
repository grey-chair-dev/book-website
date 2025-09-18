-- Email Subscription Table
-- This table stores email subscriptions for newsletter/blog updates

CREATE TABLE IF NOT EXISTS email_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source VARCHAR(50) DEFAULT 'website' CHECK (source IN ('website', 'blog', 'admin', 'import')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE NULL,
  last_email_sent TIMESTAMP WITH TIME ZONE NULL,
  email_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON email_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_status ON email_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_subscribed_at ON email_subscriptions(subscribed_at);

-- RLS (Row Level Security) policies
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert new subscriptions
CREATE POLICY "Allow public to insert email subscriptions" ON email_subscriptions
  FOR INSERT WITH CHECK (true);

-- Allow public to read their own subscription (for unsubscribe links)
CREATE POLICY "Allow public to read own subscription" ON email_subscriptions
  FOR SELECT USING (true);

-- Allow public to update their own subscription status
CREATE POLICY "Allow public to update own subscription" ON email_subscriptions
  FOR UPDATE USING (true);

-- Allow admin to read all subscriptions
CREATE POLICY "Allow admin to read all subscriptions" ON email_subscriptions
  FOR SELECT USING (auth.role() = 'service_role');

-- Allow admin to update all subscriptions
CREATE POLICY "Allow admin to update all subscriptions" ON email_subscriptions
  FOR UPDATE USING (auth.role() = 'service_role');

-- Allow admin to delete subscriptions
CREATE POLICY "Allow admin to delete subscriptions" ON email_subscriptions
  FOR DELETE USING (auth.role() = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_email_subscriptions_updated_at
  BEFORE UPDATE ON email_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_email_subscriptions_updated_at();

-- Function to handle unsubscribe
CREATE OR REPLACE FUNCTION unsubscribe_email(email_address TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE email_subscriptions 
  SET status = 'unsubscribed', 
      unsubscribed_at = NOW(),
      updated_at = NOW()
  WHERE email = email_address AND status = 'active';
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to get subscription stats
CREATE OR REPLACE FUNCTION get_subscription_stats()
RETURNS TABLE (
  total_subscribers BIGINT,
  active_subscribers BIGINT,
  unsubscribed_count BIGINT,
  new_this_month BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_subscribers,
    COUNT(*) FILTER (WHERE status = 'active') as active_subscribers,
    COUNT(*) FILTER (WHERE status = 'unsubscribed') as unsubscribed_count,
    COUNT(*) FILTER (WHERE subscribed_at >= date_trunc('month', NOW())) as new_this_month
  FROM email_subscriptions;
END;
$$ LANGUAGE plpgsql;
