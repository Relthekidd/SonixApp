/*
  # Fix Admin Users Policies

  1. Changes
    - Remove recursive policies that cause infinite recursion
    - Simplify admin access checks
    - Add direct role-based policies
    
  2. Security
    - Maintain strict access control
    - Prevent unauthorized access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view admin data" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Only admins can view admin users" ON admin_users;

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Simple policy for viewing admin data
CREATE POLICY "View admin data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Policy for managing admin users (super_admin only)
CREATE POLICY "Manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Ensure public can't access admin data
ALTER TABLE admin_users FORCE ROW LEVEL SECURITY;