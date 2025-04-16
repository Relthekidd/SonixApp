/*
  # Update user profile and permissions
  
  1. Changes
    - Creates artist profile for user
    - Grants admin privileges
    - Sets up subscription
    
  2. Security
    - Removes direct password manipulation (should be handled via Auth API)
    - Maintains existing RLS policies
*/

DO $$
DECLARE
  v_user_id uuid := '88f20d1a-0d13-4a5e-b8a9-9a9e6a32f751';
  v_plan_id uuid;
BEGIN
  -- Create or update artist profile
  INSERT INTO profiles (id, username, role)
  VALUES (v_user_id, 'RelTheKidd', 'artist')
  ON CONFLICT (id) DO UPDATE
  SET username = 'RelTheKidd',
      role = 'artist';

  -- Ensure admin privileges
  INSERT INTO admin_users (user_id, role, permissions)
  VALUES (
    v_user_id,
    'super_admin',
    '[
      "manage_users",
      "manage_content",
      "manage_features",
      "view_analytics",
      "manage_subscriptions",
      "manage_payments"
    ]'
  )
  ON CONFLICT (user_id) DO UPDATE
  SET role = 'super_admin',
      permissions = '[
        "manage_users",
        "manage_content",
        "manage_features",
        "view_analytics",
        "manage_subscriptions",
        "manage_payments"
      ]';

  -- Get Pro Artist plan ID
  SELECT id INTO v_plan_id
  FROM subscription_plans
  WHERE name = 'Pro Artist';

  -- Update subscription
  INSERT INTO user_subscriptions (
    user_id,
    plan_id,
    status,
    current_period_start,
    current_period_end
  )
  VALUES (
    v_user_id,
    v_plan_id,
    'active',
    now(),
    now() + interval '1 year'
  )
  ON CONFLICT (user_id) DO UPDATE
  SET plan_id = v_plan_id,
      status = 'active',
      current_period_start = now(),
      current_period_end = now() + interval '1 year';
END $$;