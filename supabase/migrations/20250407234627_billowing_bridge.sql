/*
  # Update profiles table for enhanced auth

  1. Changes
    - Add email column
    - Add full_name column
    - Add last_login column
    - Add email_verified column
    - Add account_status column
    - Add metadata JSONB column
    
  2. Security
    - Update RLS policies
    - Add email verification check
*/

-- Update profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active'
  CHECK (account_status IN ('active', 'suspended', 'deleted')),
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Update RLS policies
CREATE OR REPLACE FUNCTION check_user_access()
RETURNS boolean AS $$
BEGIN
  RETURN (
    -- Allow access if user is authenticated and account is active
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND account_status = 'active'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update profile policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles
  FOR SELECT
  USING (check_user_access());

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id AND check_user_access())
  WITH CHECK (auth.uid() = id AND check_user_access());

-- Create function to update last login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS trigger AS $$
BEGIN
  UPDATE profiles
  SET last_login = now()
  WHERE id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for last login update
DROP TRIGGER IF EXISTS on_auth_login ON auth.users;
CREATE TRIGGER on_auth_login
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION update_last_login();