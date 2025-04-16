/*
  # Enable RLS and add policies for admin users

  1. Security Changes
    - Enable RLS on admin_users table
    - Add policy for admin users to view admin data
    - Add policy for super admins to manage admin users
*/

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy for viewing admin data
CREATE POLICY "Admins can view admin data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.user_id = auth.uid() 
      AND (au.role = 'super_admin' OR au.role = 'admin')
    )
  );

-- Policy for managing admin users
CREATE POLICY "Super admins can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.user_id = auth.uid() 
      AND au.role = 'super_admin'
    )
  );

-- Ensure public can't access admin data
ALTER TABLE admin_users FORCE ROW LEVEL SECURITY;