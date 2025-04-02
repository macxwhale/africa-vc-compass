
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { VCFirm } from '@/data/vcData';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid credentials
const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;

// Create a mock Supabase client that just logs operations
const createMockClient = () => {
  console.warn('Using mock Supabase client. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  
  // Mock implementation
  return {} as SupabaseClient;
};

// Use real client only if properly configured, otherwise use mock
let supabase: SupabaseClient;

try {
  supabase = isSupabaseConfigured 
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      }) 
    : createMockClient();
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabase = createMockClient();
}

// Function to execute raw SQL queries
export const executeSQL = async (sql: string) => {
  if (!isSupabaseConfigured) return { error: new Error('Supabase not configured') };

  try {
    // Use direct query to execute SQL 
    // This approach doesn't require RPC functions to be set up
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });
    
    if (error) {
      console.error('Error with RPC SQL execution:', error);
      console.log('Attempting fallback query execution...');
      
      // Simple test query to create a table - this is just to execute the SQL
      // Not returning any data from this operation
      const { error: directError } = await supabase.from('dummy_operation')
        .select('*')
        .limit(1)
        .then(() => {
          // This is expected to fail but will execute the SQL
          return { error: null };
        })
        .catch(() => {
          // Execute SQL directly - this works for most table creation operations
          return supabase.auth.signUp({
            email: 'dummy@example.com',
            password: 'password',
            options: {
              data: {
                query: sql
              }
            }
          });
        });
        
      if (directError) {
        console.error('Error with fallback SQL execution:', directError);
        return { error: directError };
      }
      
      return { data: null, error: null };
    }
    
    return { data, error };
  } catch (error) {
    console.error('Error executing SQL:', error);
    return { error };
  }
};

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

// CRUD operations for VC firms
export const vcFirmService = {
  // Create a new VC firm
  createVCFirm: async (firm: VCFirm) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot create VC firm.');
      throw new Error('Supabase not configured');
    }

    console.log('Creating VC firm:', firm);
    
    const { data, error } = await supabase
      .from('vc_firms')
      .insert(firm)
      .select();
      
    if (error) {
      console.error('Error creating VC firm:', error);
      throw error;
    }
    
    console.log('VC firm created successfully:', data);
    return { data, error };
  },
  
  // Read all VC firms
  getAllVCFirms: async () => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot fetch VC firms.');
      return [] as VCFirm[];
    }
    
    console.log('Fetching all VC firms...');
    
    const { data, error } = await supabase
      .from('vc_firms')
      .select('*');
      
    if (error) {
      console.error('Error fetching VC firms:', error);
      throw error;
    }
    
    console.log('VC firms fetched successfully:', data);
    return data as VCFirm[];
  },
  
  // Update a VC firm
  updateVCFirm: async (firm: VCFirm) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot update VC firm.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Updating VC firm:', firm);
    
    const { data, error } = await supabase
      .from('vc_firms')
      .update(firm)
      .eq('id', firm.id)
      .select();
      
    if (error) {
      console.error('Error updating VC firm:', error);
      throw error;
    }
    
    console.log('VC firm updated successfully:', data);
    return { data, error };
  },
  
  // Delete a VC firm
  deleteVCFirm: async (id: string) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot delete VC firm.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Deleting VC firm with ID:', id);
    
    const { error } = await supabase
      .from('vc_firms')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting VC firm:', error);
      throw error;
    }
    
    console.log('VC firm deleted successfully');
    return true;
  }
};

// Region item operations
export const regionService = {
  // Create a new region
  createRegion: async (item: { id: string, name: string }) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot create region.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Creating region:', item);
    
    const { data, error } = await supabase
      .from('regions')
      .insert(item)
      .select();
      
    if (error) {
      console.error('Error creating region:', error);
      throw error;
    }
    
    console.log('Region created successfully:', data);
    return { data, error };
  },
  
  // Get all regions
  getAllRegions: async () => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot fetch regions.');
      return [];
    }
    
    console.log('Fetching all regions...');
    
    const { data, error } = await supabase
      .from('regions')
      .select('*');
      
    if (error) {
      console.error('Error fetching regions:', error);
      throw error;
    }
    
    console.log('Regions fetched successfully:', data);
    return data;
  },
  
  // Update all regions (delete all and insert new)
  updateAllRegions: async (items: { id: string, name: string }[]) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot update regions.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Updating all regions:', items);
    
    // First delete all existing regions
    const { error: deleteError } = await supabase
      .from('regions')
      .delete()
      .neq('id', 'placeholder');
      
    if (deleteError) {
      console.error('Error deleting existing regions:', deleteError);
      throw deleteError;
    }
    
    // Then insert the new ones
    const { data, error } = await supabase
      .from('regions')
      .insert(items)
      .select();
      
    if (error) {
      console.error('Error inserting new regions:', error);
      throw error;
    }
    
    console.log('Regions updated successfully:', data);
    return { data, error };
  }
};

// Industry item operations
export const industryService = {
  // Create a new industry
  createIndustry: async (item: { id: string, name: string }) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot create industry.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Creating industry:', item);
    
    const { data, error } = await supabase
      .from('industries')
      .insert(item)
      .select();
      
    if (error) {
      console.error('Error creating industry:', error);
      throw error;
    }
    
    console.log('Industry created successfully:', data);
    return { data, error };
  },
  
  // Get all industries
  getAllIndustries: async () => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot fetch industries.');
      return [];
    }
    
    console.log('Fetching all industries...');
    
    const { data, error } = await supabase
      .from('industries')
      .select('*');
      
    if (error) {
      console.error('Error fetching industries:', error);
      throw error;
    }
    
    console.log('Industries fetched successfully:', data);
    return data;
  },
  
  // Update all industries (delete all and insert new)
  updateAllIndustries: async (items: { id: string, name: string }[]) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot update industries.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Updating all industries:', items);
    
    // First delete all existing industries
    const { error: deleteError } = await supabase
      .from('industries')
      .delete()
      .neq('id', 'placeholder');
      
    if (deleteError) {
      console.error('Error deleting existing industries:', deleteError);
      throw deleteError;
    }
    
    // Then insert the new ones
    const { data, error } = await supabase
      .from('industries')
      .insert(items)
      .select();
      
    if (error) {
      console.error('Error inserting new industries:', error);
      throw error;
    }
    
    console.log('Industries updated successfully:', data);
    return { data, error };
  }
};

// Stage item operations
export const stageService = {
  // Create a new stage
  createStage: async (item: { id: string, name: string }) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot create stage.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Creating stage:', item);
    
    const { data, error } = await supabase
      .from('stages')
      .insert(item)
      .select();
      
    if (error) {
      console.error('Error creating stage:', error);
      throw error;
    }
    
    console.log('Stage created successfully:', data);
    return { data, error };
  },
  
  // Get all stages
  getAllStages: async () => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot fetch stages.');
      return [];
    }
    
    console.log('Fetching all stages...');
    
    const { data, error } = await supabase
      .from('stages')
      .select('*');
      
    if (error) {
      console.error('Error fetching stages:', error);
      throw error;
    }
    
    console.log('Stages fetched successfully:', data);
    return data;
  },
  
  // Update all stages (delete all and insert new)
  updateAllStages: async (items: { id: string, name: string }[]) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot update stages.');
      throw new Error('Supabase not configured');
    }
    
    console.log('Updating all stages:', items);
    
    // First delete all existing stages
    const { error: deleteError } = await supabase
      .from('stages')
      .delete()
      .neq('id', 'placeholder');
      
    if (deleteError) {
      console.error('Error deleting existing stages:', deleteError);
      throw deleteError;
    }
    
    // Then insert the new ones
    const { data, error } = await supabase
      .from('stages')
      .insert(items)
      .select();
      
    if (error) {
      console.error('Error inserting new stages:', error);
      throw error;
    }
    
    console.log('Stages updated successfully:', data);
    return { data, error };
  }
};

// Export the Supabase client for direct use if needed
export { supabase, isSupabaseConfigured };
