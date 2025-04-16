/*
  # Add admin system tables

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `role` (text)
      - `permissions` (jsonb)
      - `created_at` (timestamp)
    
    - `feature_flags`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `enabled` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `analytics_events`
      - `id` (uuid, primary key)
      - `event_type` (text)
      - `user_id` (uuid, references profiles)
      - `metadata` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  role text NOT NULL CHECK (role IN ('super_admin', 'admin', 'moderator')),
  permissions jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create feature_flags table
CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES profiles(id),
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policies for admin_users
CREATE POLICY "Only admins can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.user_id = auth.uid()
  ));

-- Policies for feature_flags
CREATE POLICY "Admins can manage feature flags"
  ON feature_flags
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can view enabled feature flags"
  ON feature_flags
  FOR SELECT
  TO public
  USING (enabled = true);

-- Policies for analytics_events
CREATE POLICY "Only admins can view analytics"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default feature flags
INSERT INTO feature_flags (name, description, enabled) VALUES
  ('beta_features', 'Enable beta features for testing', false),
  ('advanced_analytics', 'Enable advanced analytics features', false),
  ('ai_recommendations', 'Enable AI-powered recommendations', false),
  ('social_features', 'Enable social interaction features', true),
  ('marketplace', 'Enable marketplace features', false);

-- Create function to update feature flag timestamps
CREATE OR REPLACE FUNCTION update_feature_flag_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for feature flag updates
CREATE TRIGGER update_feature_flag_timestamp
  BEFORE UPDATE ON feature_flags
  FOR EACH ROW
  EXECUTE FUNCTION update_feature_flag_timestamp();