-- Enable full CRUD operations for all tables
-- Note: In production, these should be restricted to authenticated admin users

-- Regions: Allow INSERT, UPDATE, DELETE
CREATE POLICY "Anyone can insert regions"
ON public.regions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update regions"
ON public.regions
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete regions"
ON public.regions
FOR DELETE
USING (true);

-- Industries: Allow INSERT, UPDATE, DELETE
CREATE POLICY "Anyone can insert industries"
ON public.industries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update industries"
ON public.industries
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete industries"
ON public.industries
FOR DELETE
USING (true);

-- Stages: Allow INSERT, UPDATE, DELETE
CREATE POLICY "Anyone can insert stages"
ON public.stages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update stages"
ON public.stages
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete stages"
ON public.stages
FOR DELETE
USING (true);

-- VC Firms: Allow INSERT, UPDATE, DELETE
CREATE POLICY "Anyone can insert vc_firms"
ON public.vc_firms
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update vc_firms"
ON public.vc_firms
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete vc_firms"
ON public.vc_firms
FOR DELETE
USING (true);

-- Pending VC Firms: Allow UPDATE, DELETE (INSERT already exists)
CREATE POLICY "Anyone can update pending_vc_firms"
ON public.pending_vc_firms
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete pending_vc_firms"
ON public.pending_vc_firms
FOR DELETE
USING (true);