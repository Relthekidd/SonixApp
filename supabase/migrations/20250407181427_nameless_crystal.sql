/*
  # Create Admin Artist Account

  1. Create auth user for RelTheKidd
  2. Create profile with artist role
  3. Add admin privileges
  4. Set up Pro Artist subscription

  Note: Using a specific UUID for consistency across tables
*/

-- Create auth user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES (
  '88f20d1a-0d13-4a5e-b8a9-9a9e6a32f751',
  'rel@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"RelTheKidd"}',
  false,
  'authenticated'
);

-- Create profile
INSERT INTO profiles (id, username, role)
VALUES (
  '88f20d1a-0d13-4a5e-b8a9-9a9e6a32f751',
  'RelTheKidd',
  'artist'
);

-- Add admin privileges
INSERT INTO admin_users (user_id, role, permissions)
VALUES (
  '88f20d1a-0d13-4a5e-b8a9-9a9e6a32f751',
  'super_admin',
  '[
    "manage_users",
    "manage_content",
    "manage_features",
    "view_analytics",
    "manage_subscriptions",
    "manage_payments"
  ]'
);

-- Add Pro Artist subscription
INSERT INTO user_subscriptions (
  user_id,
  plan_id,
  status,
  current_period_start,
  current_period_end
)
SELECT 
  '88f20d1a-0d13-4a5e-b8a9-9a9e6a32f751',
  id,
  'active',
  now(),
  now() + interval '1 year'
FROM subscription_plans 
WHERE name = 'Pro Artist';