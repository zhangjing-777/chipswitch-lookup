-- Enable public read access for device_layout_info table
-- This is a public lookup tool, so we allow everyone to read the data

CREATE POLICY "Allow public read access to device layout info"
ON public.device_layout_info
FOR SELECT
TO anon, authenticated
USING (true);