-- Step 1: Fix Database Schema Type Mismatch
-- Change id columns from UUID to TEXT for regions, industries, and stages
-- This allows the application to use string-based IDs instead of UUIDs

ALTER TABLE regions ALTER COLUMN id TYPE TEXT;
ALTER TABLE industries ALTER COLUMN id TYPE TEXT;
ALTER TABLE stages ALTER COLUMN id TYPE TEXT;

-- Add index on the text id columns for better query performance
CREATE INDEX IF NOT EXISTS idx_regions_id ON regions(id);
CREATE INDEX IF NOT EXISTS idx_industries_id ON industries(id);
CREATE INDEX IF NOT EXISTS idx_stages_id ON stages(id);