
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { executeSQL } from './sqlUtils';

// Function to check if tables exist
export const checkIfTablesExist = async () => {
  if (!isSupabaseConfigured) return false;

  try {
    console.log('Checking if tables exist...');
    
    // Try to query each table to see if it exists
    const { data: regionsData, error: regionsError } = await supabase
      .from('regions')
      .select('count')
      .limit(1);
      
    if (regionsError) {
      console.error('Regions table does not exist:', regionsError.message);
      return false;
    }
    
    const { data: industriesData, error: industriesError } = await supabase
      .from('industries')
      .select('count')
      .limit(1);
      
    if (industriesError) {
      console.error('Industries table does not exist:', industriesError.message);
      return false;
    }
    
    const { data: stagesData, error: stagesError } = await supabase
      .from('stages')
      .select('count')
      .limit(1);
      
    if (stagesError) {
      console.error('Stages table does not exist:', stagesError.message);
      return false;
    }
    
    const { data: vcFirmsData, error: vcFirmsError } = await supabase
      .from('vc_firms')
      .select('count')
      .limit(1);
      
    if (vcFirmsError) {
      console.error('VC firms table does not exist:', vcFirmsError.message);
      return false;
    }
    
    console.log('All tables exist!');
    return true;
  } catch (error) {
    console.error('Error checking tables:', error);
    return false;
  }
};

// Function to create all required tables
export const createAllTables = async () => {
  if (!isSupabaseConfigured) return false;

  console.log('Creating tables...');
  
  try {
    // Generate the SQL to create tables
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS regions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS industries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS stages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS vc_firms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        logo TEXT,
        description TEXT,
        website TEXT,
        headquarters TEXT,
        "foundedYear" INTEGER,
        "investmentFocus" TEXT[],
        industries TEXT[],
        "stagePreference" TEXT[],
        "ticketSize" TEXT,
        "regionsOfInterest" TEXT[],
        "portfolioCompanies" TEXT[],
        "keyPartners" JSONB,
        "contactInfo" JSONB
      );
    `;
    
    console.log("Attempting to create tables with SQL:", createTableSQL);
    
    // Execute the SQL directly
    const { error } = await executeSQL(createTableSQL);
    
    if (error) {
      console.error('Error creating tables:', error);
      return false;
    }
    
    console.log('Tables created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating tables:', error);
    return false;
  }
};

// Ensure VC firms table exists by checking if we can query it
export const ensureVCFirmsTableExists = async () => {
  try {
    const { data, error } = await supabase
      .from('vc_firms')
      .select('count');
      
    if (error) {
      console.error('VC firms table does not exist:', error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error ensuring VC firms table exists:', error);
    return false;
  }
};

// Test the database connection explicitly
export const testDatabaseConnection = async () => {
  if (!isSupabaseConfigured) {
    console.error('Supabase not configured');
    return false;
  }

  try {
    console.log('Testing Supabase connection...');
    
    // Simple query to test connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('Supabase connection successful!');
    
    // Now check if tables exist
    const tablesExist = await checkIfTablesExist();
    
    if (!tablesExist) {
      console.log('Tables do not exist, creating them...');
      const tablesCreated = await createAllTables();
      
      if (!tablesCreated) {
        console.error('Failed to create tables');
        return false;
      }
      
      console.log('Tables created successfully!');
    }
    
    return true;
  } catch (error) {
    console.error('Error testing database connection:', error);
    return false;
  }
};
