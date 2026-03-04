-- Enable RLS on enquiries table if not already enabled
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON enquiries;
DROP POLICY IF EXISTS "Allow authenticated read" ON enquiries;

-- Policy to allow anyone to insert enquiries (contact form submissions)
CREATE POLICY "Allow public insert" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Policy to allow authenticated users (admin) to read all enquiries
CREATE POLICY "Allow authenticated read" ON enquiries
  FOR SELECT USING (auth.role() = 'authenticated');
