
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

// Function to check if tables exist
export const checkIfTablesExist = async () => {
  if (!isSupabaseConfigured) return false;

  try {
    // For each table, check if it exists
    const tables = ['regions', 'industries', 'stages', 'vc_firms'];
    let allTablesExist = true;
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count');
      
      if (error) {
        console.error(`Table ${table} doesn't exist: ${error.message}`);
        allTablesExist = false;
      }
    }
    
    return allTablesExist;
  } catch (error) {
    console.error('Error checking tables:', error);
    return false;
  }
};

// Ensure VC firms table exists by checking if we can query it
export const ensureVCFirmsTableExists = async () => {
  try {
    const { error } = await supabase
      .from('vc_firms')
      .select('count');
      
    if (error) {
      console.error('VC firms table does not exist:', error.message);
      // The approach needs to be different as createTable is not available
      // We should guide the user to create tables via SQL or the Supabase dashboard
      console.log('Please create the vc_firms table manually in the Supabase dashboard');
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
    const tableExists = await ensureVCFirmsTableExists();
    if (!tableExists) {
      console.error('VC firms table does not exist. Cannot create VC firm.');
      throw new Error('VC firms table does not exist');
    }
    
    const { data, error } = await supabase
      .from('vc_firms')
      .insert(firm)
      .select();
      
    if (error) {
      console.error('Error creating VC firm:', error);
      throw error;
    }
    
    return data;
  },
  
  // Read all VC firms
  getAllVCFirms: async () => {
    const tableExists = await ensureVCFirmsTableExists();
    if (!tableExists) {
      console.error('VC firms table does not exist. Cannot fetch VC firms.');
      return [] as VCFirm[];
    }
    
    const { data, error } = await supabase
      .from('vc_firms')
      .select('*');
      
    if (error) {
      console.error('Error fetching VC firms:', error);
      throw error;
    }
    
    return data as VCFirm[];
  },
  
  // Update a VC firm
  updateVCFirm: async (firm: VCFirm) => {
    const { data, error } = await supabase
      .from('vc_firms')
      .update(firm)
      .eq('id', firm.id)
      .select();
      
    if (error) {
      console.error('Error updating VC firm:', error);
      throw error;
    }
    
    return data;
  },
  
  // Delete a VC firm
  deleteVCFirm: async (id: string) => {
    const { error } = await supabase
      .from('vc_firms')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting VC firm:', error);
      throw error;
    }
    
    return true;
  }
};

// Export the Supabase client for direct use if needed
export { supabase, isSupabaseConfigured };
