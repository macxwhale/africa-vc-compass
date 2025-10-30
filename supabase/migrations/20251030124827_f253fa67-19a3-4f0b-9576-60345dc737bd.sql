-- Create industries table
CREATE TABLE IF NOT EXISTS public.industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create regions table
CREATE TABLE IF NOT EXISTS public.regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create stages table
CREATE TABLE IF NOT EXISTS public.stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create vc_firms table
CREATE TABLE IF NOT EXISTS public.vc_firms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  headquarters TEXT,
  founded_year INTEGER,
  investment_focus TEXT[],
  industries TEXT[],
  stage_preference TEXT[],
  ticket_size TEXT,
  notable_investments TEXT[],
  portfolio_companies TEXT[],
  linkedin_url TEXT,
  twitter_url TEXT,
  contact_person JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create pending_vc_firms table
CREATE TABLE IF NOT EXISTS public.pending_vc_firms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  headquarters TEXT,
  founded_year INTEGER,
  investment_focus TEXT[],
  industries TEXT[],
  stage_preference TEXT[],
  ticket_size TEXT,
  notable_investments TEXT[],
  portfolio_companies TEXT[],
  linkedin_url TEXT,
  twitter_url TEXT,
  contact_person JSONB,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create settings table for storing configuration
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vc_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_vc_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view)
CREATE POLICY "Industries are viewable by everyone"
  ON public.industries FOR SELECT
  USING (true);

CREATE POLICY "Regions are viewable by everyone"
  ON public.regions FOR SELECT
  USING (true);

CREATE POLICY "Stages are viewable by everyone"
  ON public.stages FOR SELECT
  USING (true);

CREATE POLICY "VC firms are viewable by everyone"
  ON public.vc_firms FOR SELECT
  USING (true);

CREATE POLICY "Pending VC firms are viewable by everyone"
  ON public.pending_vc_firms FOR SELECT
  USING (true);

-- Create policies for public insert access (anyone can submit)
CREATE POLICY "Anyone can insert pending VC firms"
  ON public.pending_vc_firms FOR INSERT
  WITH CHECK (true);

-- Create policies for settings (public read, no write from client)
CREATE POLICY "Settings are viewable by everyone"
  ON public.settings FOR SELECT
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_vc_firms_updated_at
  BEFORE UPDATE ON public.vc_firms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pending_vc_firms_updated_at
  BEFORE UPDATE ON public.pending_vc_firms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();