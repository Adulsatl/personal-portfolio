-- This script creates a Supabase Auth user
-- You need to run this in your Supabase SQL Editor
-- Replace with your desired email and password

-- Step 1: Create the auth user using the admin API
-- Go to Supabase Dashboard > Authentication > Users > Add User
-- Email: admin@example.com
-- Password: YourSecurePassword123!
-- Click "Create user"

-- Step 2: Once user is created via the UI, you can reference them in your app
-- The user will be automatically created in auth.users table

-- Note: We cannot use SQL to directly create auth users due to Supabase security
-- You must use the Supabase Dashboard UI or the Auth Admin API
