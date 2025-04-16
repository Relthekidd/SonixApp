/*
  # Add subscription system tables

  1. New Tables
    - `subscription_plans`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `features` (jsonb)
      - `created_at` (timestamp)
    
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `plan_id` (uuid, references subscription_plans)
      - `status` (text)
      - `current_period_start` (timestamp)
      - `current_period_end` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for viewing and managing subscriptions
*/

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  features jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  plan_id uuid REFERENCES subscription_plans(id) NOT NULL,
  status text NOT NULL DEFAULT 'active',
  current_period_start timestamptz NOT NULL DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans
CREATE POLICY "Anyone can view subscription plans"
  ON subscription_plans
  FOR SELECT
  TO public
  USING (true);

-- Policies for user_subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
  ON user_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert default plans
INSERT INTO subscription_plans (name, description, price, features) VALUES
  (
    'Free',
    'Perfect for getting started',
    0,
    '{
      "track_uploads": 5,
      "analytics": "basic",
      "storage": "1GB",
      "support": "community",
      "playlist_placement": false,
      "merch_slots": 0,
      "fan_insights": false,
      "promotion_tools": false
    }'
  ),
  (
    'Creator+',
    'For emerging artists',
    9.99,
    '{
      "track_uploads": 50,
      "analytics": "advanced",
      "storage": "10GB",
      "support": "priority",
      "playlist_placement": true,
      "merch_slots": 5,
      "fan_insights": true,
      "promotion_tools": false
    }'
  ),
  (
    'Pro Artist',
    'For professional artists',
    19.99,
    '{
      "track_uploads": "unlimited",
      "analytics": "professional",
      "storage": "50GB",
      "support": "dedicated",
      "playlist_placement": true,
      "merch_slots": "unlimited",
      "fan_insights": true,
      "promotion_tools": true
    }'
  );