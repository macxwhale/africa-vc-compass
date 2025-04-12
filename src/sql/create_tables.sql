

-- First enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create regions table if it doesn't exist
CREATE TABLE IF NOT EXISTS regions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create industries table if it doesn't exist
CREATE TABLE IF NOT EXISTS industries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create stages table if it doesn't exist
CREATE TABLE IF NOT EXISTS stages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create VC firms table if it doesn't exist
CREATE TABLE IF NOT EXISTS vc_firms (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  website TEXT,
  hqLocation TEXT,
  regionsOfInterest TEXT[],
  industries TEXT[],
  investmentStage TEXT[],
  typicalTicketSize TEXT,
  contactPerson JSONB,
  description TEXT,
  linkedinUrl TEXT,
  twitterUrl TEXT
);

-- Create pending VC firms table if it doesn't exist
CREATE TABLE IF NOT EXISTS pending_vc_firms (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  website TEXT,
  hqLocation TEXT,
  regionsOfInterest TEXT[],
  industries TEXT[],
  investmentStage TEXT[],
  typicalTicketSize TEXT,
  contactPerson JSONB,
  description TEXT,
  linkedinUrl TEXT,
  twitterUrl TEXT,
  status TEXT NOT NULL,
  submittedAt TEXT NOT NULL,
  reviewedAt TEXT,
  reviewNotes TEXT
);

-- Create settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Create a function to execute dynamic SQL if needed
CREATE OR REPLACE FUNCTION execute_sql(sql_statement TEXT) 
RETURNS VOID AS $$
BEGIN
  EXECUTE sql_statement;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

