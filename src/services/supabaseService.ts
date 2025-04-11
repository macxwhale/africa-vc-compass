import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { VCFirm } from '@/data/types';
import { PendingVCFirm } from '@/contexts/DataContext';

// Singleton pattern to ensure only one instance of the SupabaseClient
let supabaseClient: SupabaseClient | null = null;

// Initialize Supabase client
export const initializeSupabase = (): SupabaseClient => {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured');
  }

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  return supabaseClient;
};

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// Export the initialized client for direct access
export const supabase = isSupabaseConfigured() ? initializeSupabase() : null;

// Test the database connection
export const testDatabaseConnection = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Cannot test connection.');
    return false;
  }
  
  try {
    const client = initializeSupabase();
    const { data, error } = await client.from('regions').select('count').limit(1);
    
    if (error) {
      console.error('Error testing database connection:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to test database connection:', error);
    return false;
  }
};

// Ensure contactPerson column exists in tables
export const ensureContactPersonColumn = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Cannot check or update tables.');
    return false;
  }
  
  try {
    const client = initializeSupabase();
    
    // Check if contactPerson column exists in vc_firms
    const { data: vcFirmsColumns } = await client.rpc('execute_sql', { 
      sql_query: `
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = 'vc_firms' AND column_name = 'contactPerson';
      `
    });
    
    // Add contactPerson column to vc_firms if it doesn't exist
    if (!vcFirmsColumns || vcFirmsColumns.length === 0) {
      console.log('Adding contactPerson column to vc_firms table');
      await client.rpc('execute_sql', { 
        sql_query: `
          ALTER TABLE vc_firms ADD COLUMN IF NOT EXISTS "contactPerson" JSONB;
        `
      });
    }
    
    // Check if contactPerson column exists in pending_vc_firms
    const { data: pendingColumns } = await client.rpc('execute_sql', { 
      sql_query: `
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = 'pending_vc_firms' AND column_name = 'contactPerson';
      `
    });
    
    // Add contactPerson column to pending_vc_firms if it doesn't exist
    if (!pendingColumns || pendingColumns.length === 0) {
      console.log('Adding contactPerson column to pending_vc_firms table');
      await client.rpc('execute_sql', { 
        sql_query: `
          ALTER TABLE pending_vc_firms ADD COLUMN IF NOT EXISTS "contactPerson" JSONB;
        `
      });
    }
    
    return true;
  } catch (error) {
    console.error('Failed to ensure contactPerson column exists:', error);
    return false;
  }
};

// Create tables if they don't exist
export const createAllTables = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Cannot create tables.');
    return false;
  }
  
  try {
    const client = initializeSupabase();
    
    // Create regions table
    await client.rpc('execute_sql', { 
      sql_query: `
        CREATE TABLE IF NOT EXISTS regions (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL UNIQUE
        );
      `
    });
    
    // Create industries table
    await client.rpc('execute_sql', { 
      sql_query: `
        CREATE TABLE IF NOT EXISTS industries (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL UNIQUE
        );
      `
    });
    
    // Create stages table
    await client.rpc('execute_sql', { 
      sql_query: `
        CREATE TABLE IF NOT EXISTS stages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL UNIQUE
        );
      `
    });
    
    // Create vc_firms table with contactPerson column
    await client.rpc('execute_sql', { 
      sql_query: `
        CREATE TABLE IF NOT EXISTS vc_firms (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          logo TEXT,
          description TEXT,
          website TEXT,
          headquarters TEXT,
          foundedYear INTEGER,
          investmentFocus JSONB,
          industries JSONB,
          stagePreference JSONB,
          ticketSize TEXT,
          regionsOfInterest JSONB,
          portfolioCompanies JSONB,
          keyPartners JSONB,
          contactInfo JSONB,
          contactPerson JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
      `
    });
    
    // Create pending_vc_firms table with contactPerson column
    await client.rpc('execute_sql', { 
      sql_query: `
        CREATE TABLE IF NOT EXISTS pending_vc_firms (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          logo TEXT,
          description TEXT,
          website TEXT,
          headquarters TEXT,
          foundedYear INTEGER,
          investmentFocus JSONB,
          industries JSONB,
          stagePreference JSONB,
          ticketSize TEXT,
          regionsOfInterest JSONB,
          portfolioCompanies JSONB,
          keyPartners JSONB,
          contactInfo JSONB,
          contactPerson JSONB,
          status TEXT,
          submittedAt TIMESTAMP WITH TIME ZONE,
          reviewedAt TIMESTAMP WITH TIME ZONE,
          reviewNotes TEXT
        );
      `
    });
    
    try {
      // Ensure the contactPerson column exists in existing tables
      await ensureContactPersonColumn();
      
      return true;
    } catch (error) {
      console.error('Failed to create tables:', error);
      return false;
    }
  } catch (error) {
    console.error('Failed to create tables:', error);
    return false;
  }
};

// Execute SQL
export const executeSQL = async (query: string): Promise<any> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Cannot execute SQL.');
    return null;
  }
  
  try {
    const client = initializeSupabase();
    const { data, error } = await client.rpc('execute_sql', { sql_query: query });
    
    if (error) {
      console.error('Error executing SQL:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to execute SQL:', error);
    throw error;
  }
};

// Region Service
export const regionService = {
  getAllRegions: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Returning empty regions.');
      return [];
    }
  
    const client = initializeSupabase();
  
    try {
      const { data, error } = await client
        .from('regions')
        .select('*');
  
      if (error) {
        console.error('Error fetching regions:', error);
        return [];
      }
  
      return data || [];
    } catch (error) {
      console.error('Failed to get regions:', error);
      return [];
    }
  },

  updateAllRegions: async (regions: { id: string; name: string }[]) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Regions will not be stored.');
      return;
    }
  
    const client = initializeSupabase();
  
    try {
      const { error } = await client
        .from('regions')
        .upsert(regions);
  
      if (error) {
        console.error('Error storing regions:', error);
      }
    } catch (error) {
      console.error('Failed to store regions:', error);
    }
  }
};

// Industry Service
export const industryService = {
  getAllIndustries: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Returning empty industries.');
      return [];
    }
  
    const client = initializeSupabase();
  
    try {
      const { data, error } = await client
        .from('industries')
        .select('*');
  
      if (error) {
        console.error('Error fetching industries:', error);
        return [];
      }
  
      return data || [];
    } catch (error) {
      console.error('Failed to get industries:', error);
      return [];
    }
  },

  updateAllIndustries: async (industries: { id: string; name: string }[]) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Industries will not be stored.');
      return;
    }
  
    const client = initializeSupabase();
  
    try {
      const { error } = await client
        .from('industries')
        .upsert(industries);
  
      if (error) {
        console.error('Error storing industries:', error);
      }
    } catch (error) {
      console.error('Failed to store industries:', error);
    }
  }
};

// Stage Service
export const stageService = {
  getAllStages: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Returning empty stages.');
      return [];
    }
  
    const client = initializeSupabase();
  
    try {
      const { data, error } = await client
        .from('stages')
        .select('*');
  
      if (error) {
        console.error('Error fetching stages:', error);
        return [];
      }
  
      return data || [];
    } catch (error) {
      console.error('Failed to get stages:', error);
      return [];
    }
  },

  updateAllStages: async (stages: { id: string; name: string }[]) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Stages will not be stored.');
      return;
    }
  
    const client = initializeSupabase();
  
    try {
      const { error } = await client
        .from('stages')
        .upsert(stages);
  
      if (error) {
        console.error('Error storing stages:', error);
      }
    } catch (error) {
      console.error('Failed to store stages:', error);
    }
  }
};

// VC Firm Service
export const vcFirmService = {
  getAllVCFirms: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Returning empty VC Firms.');
      return [];
    }
  
    const client = initializeSupabase();
  
    try {
      const { data, error } = await client
        .from('vc_firms')
        .select('*');
  
      if (error) {
        console.error('Error fetching VC Firms:', error);
        return [];
      }
  
      return data || [];
    } catch (error) {
      console.error('Failed to get VC Firms:', error);
      return [];
    }
  },
  
  createVCFirm: async (firm: VCFirm) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. VC Firm will not be stored.');
      return { data: null, error: new Error('Supabase not configured') };
    }
  
    const client = initializeSupabase();
  
    try {
      // Ensure contactPerson column exists
      await ensureContactPersonColumn();
      
      // Ensure contactPerson is properly formatted for storage
      const firmToCreate = JSON.parse(JSON.stringify(firm));
      
      console.log("Creating VC firm with contact person:", 
        firmToCreate.contactPerson ? JSON.stringify(firmToCreate.contactPerson) : "No contact person");
  
      const { data, error } = await client
        .from('vc_firms')
        .upsert(firmToCreate)
        .select()
        .single();
  
      if (error) {
        console.error('Error storing VC Firm:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Failed to store VC Firm:', error);
      return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
    }
  },
  
  updateVCFirm: async (firm: VCFirm) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. VC Firm will not be updated.');
      return { data: null, error: new Error('Supabase not configured') };
    }
  
    const client = initializeSupabase();
  
    try {
      // Ensure contactPerson column exists
      await ensureContactPersonColumn();
      
      // Ensure contactPerson is properly formatted for storage
      const firmToUpdate = JSON.parse(JSON.stringify(firm));
      
      console.log("Updating VC firm with contact person:", 
        firmToUpdate.contactPerson ? JSON.stringify(firmToUpdate.contactPerson) : "No contact person");
  
      const { data, error } = await client
        .from('vc_firms')
        .update(firmToUpdate)
        .eq('id', firm.id)
        .select()
        .single();
  
      if (error) {
        console.error('Error updating VC Firm:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Failed to update VC Firm:', error);
      return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
    }
  },
  
  deleteVCFirm: async (id: string) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. VC Firm will not be deleted.');
      return false;
    }
  
    const client = initializeSupabase();
  
    try {
      const { error } = await client
        .from('vc_firms')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error('Error deleting VC Firm:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete VC Firm:', error);
      return false;
    }
  }
};

// Pending VC Firm Service
export const pendingVCFirmService = {
  getAllPendingVCFirms: async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Returning empty pending VC Firms.');
      return [];
    }
  
    const client = initializeSupabase();
  
    try {
      // First check if table exists
      try {
        const { error: checkError } = await client.from('pending_vc_firms').select('count').limit(1);
        if (checkError && checkError.code === '42P01') {
          console.log("pending_vc_firms table doesn't exist yet, creating it now");
          await createAllTables();
          return []; // Return empty array for first load
        }
      } catch (checkError) {
        console.error("Error checking if pending_vc_firms exists:", checkError);
      }
      
      // Now try to get the data
      const { data, error } = await client
        .from('pending_vc_firms')
        .select('*')
        .order('submittedAt', { ascending: false });
  
      if (error) {
        console.error('Error fetching pending VC Firms:', error);
        return [];
      }
  
      return data || [];
    } catch (error) {
      console.error('Failed to get pending VC Firms:', error);
      return [];
    }
  },
  
  createPendingVCFirm: async (firm: Omit<PendingVCFirm, "status" | "submittedAt"> & { status?: string, submittedAt?: string }) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Pending VC Firm will not be submitted.');
      return { data: null, error: new Error('Supabase not configured') };
    }
  
    const client = initializeSupabase();
  
    try {
      // First ensure table exists
      try {
        const { error: checkError } = await client.from('pending_vc_firms').select('count').limit(1);
        if (checkError && checkError.code === '42P01') {
          console.log("pending_vc_firms table doesn't exist yet, creating it now");
          await createAllTables();
        } else {
          // Ensure contactPerson column exists
          await ensureContactPersonColumn();
        }
      } catch (checkError) {
        console.error("Error checking if pending_vc_firms exists:", checkError);
        await createAllTables();
      }
      
      const firmWithDefaults = {
        ...firm,
        status: firm.status || 'pending',
        submittedAt: firm.submittedAt || new Date().toISOString()
      };
      
      // Ensure contactPerson is properly formatted for storage
      const firmToCreate = JSON.parse(JSON.stringify(firmWithDefaults));
      
      console.log("Creating pending VC firm with contact person:", 
        firmToCreate.contactPerson ? JSON.stringify(firmToCreate.contactPerson) : "No contact person");
      
      const { data, error } = await client
        .from('pending_vc_firms')
        .insert([firmToCreate])
        .select()
        .single();
  
      if (error) {
        console.error('Error submitting pending VC Firm:', error);
        return { data: null, error };
      }
  
      return { data: data as PendingVCFirm, error: null };
    } catch (error) {
      console.error('Failed to submit pending VC Firm:', error);
      return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
    }
  },
  
  updatePendingVCFirm: async (firm: PendingVCFirm) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Pending VC Firm will not be updated.');
      return { data: null, error: new Error('Supabase not configured') };
    }
  
    const client = initializeSupabase();
  
    try {
      // Ensure contactPerson column exists
      await ensureContactPersonColumn();
      
      // Ensure contactPerson is properly formatted for storage
      const firmToUpdate = JSON.parse(JSON.stringify(firm));
      
      console.log("Updating pending VC firm with contact person:", 
        firmToUpdate.contactPerson ? JSON.stringify(firmToUpdate.contactPerson) : "No contact person");
      
      const { data, error } = await client
        .from('pending_vc_firms')
        .update(firmToUpdate)
        .eq('id', firm.id)
        .select()
        .single();
  
      if (error) {
        console.error('Error updating pending VC Firm:', error);
        return { data: null, error };
      }
  
      return { data: data as PendingVCFirm, error: null };
    } catch (error) {
      console.error('Failed to update pending VC Firm:', error);
      return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
    }
  }
};

// Functions for the original supabaseService object to maintain compatibility
export const supabaseService = {
  isSupabaseConfigured,
  initializeSupabase,
  storeRegions: regionService.updateAllRegions,
  getRegions: regionService.getAllRegions,
  storeIndustries: industryService.updateAllIndustries,
  getIndustries: industryService.getAllIndustries,
  storeStages: stageService.updateAllStages,
  getStages: stageService.getAllStages,
  storeVCFirm: async (firm: VCFirm) => {
    const result = await vcFirmService.createVCFirm(firm);
    return result.data;
  },
  getVCFirms: vcFirmService.getAllVCFirms,
  deleteVCFirm: vcFirmService.deleteVCFirm,
  updateVCFirm: async (firm: VCFirm) => {
    const result = await vcFirmService.updateVCFirm(firm);
    return result.data;
  },
  getPendingVCFirms: pendingVCFirmService.getAllPendingVCFirms,
  approvePendingVCFirm: async (firm: PendingVCFirm) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Pending VC Firm will not be approved.');
      return;
    }
  
    const client = initializeSupabase();
  
    try {
      // Start a transaction
      await client.from('pending_vc_firms').update({ status: 'approving' }).eq('id', firm.id);
  
      // Insert the approved firm into the vc_firms table
      const { error: insertError } = await client
        .from('vc_firms')
        .insert({
          id: firm.id,
          name: firm.name,
          logo: firm.logo,
          description: firm.description,
          website: firm.website,
          headquarters: firm.headquarters,
          foundedYear: firm.foundedYear,
          investmentFocus: firm.investmentFocus,
          industries: firm.industries,
          stagePreference: firm.stagePreference,
          ticketSize: firm.ticketSize,
          regionsOfInterest: firm.regionsOfInterest,
          portfolioCompanies: firm.portfolioCompanies,
          keyPartners: firm.keyPartners,
          contactInfo: firm.contactInfo,
        });
  
      if (insertError) {
        console.error('Error inserting VC Firm:', insertError);
        // Rollback transaction by setting status back to pending
        await client.from('pending_vc_firms').update({ status: 'pending' }).eq('id', firm.id);
        throw insertError;
      }
  
      // Delete the firm from the pending_vc_firms table
      const { error: deleteError } = await client
        .from('pending_vc_firms')
        .delete()
        .eq('id', firm.id);
  
      if (deleteError) {
        console.error('Error deleting pending VC Firm:', deleteError);
        // Rollback transaction by deleting the inserted firm
        await client.from('vc_firms').delete().eq('id', firm.id);
        throw deleteError;
      }
  
      // If all operations were successful, commit the transaction implicitly
      console.log(`VC Firm ${firm.name} approved and moved to VC Firms table.`);
    } catch (error) {
      console.error('Transaction failed:', error);
      // Handle the error appropriately, e.g., show a user-friendly message
      throw error;
    }
  },
  rejectPendingVCFirm: async (firm: PendingVCFirm, rejectionNotes?: string) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Pending VC Firm will not be rejected.');
      return;
    }
  
    const client = initializeSupabase();
  
    try {
      const { error } = await client
        .from('pending_vc_firms')
        .update({ status: 'rejected', rejectionNotes })
        .eq('id', firm.id);
  
      if (error) {
        console.error('Error rejecting pending VC Firm:', error);
      }
    } catch (error) {
      console.error('Failed to reject pending VC Firm:', error);
    }
  },
  async saveOpenAIApiKey(apiKey: string): Promise<void> {
    try {
      const client = initializeSupabase();
      
      // Check if settings table exists and create it if it doesn't
      try {
        const { error: checkError } = await client
          .from("app_settings")
          .select("count")
          .limit(1);
        
        if (checkError) {
          console.log("Creating app_settings table...");
          await client.rpc("execute_sql", { 
            sql_query: `
              CREATE TABLE IF NOT EXISTS app_settings (
                id TEXT PRIMARY KEY,
                key TEXT NOT NULL UNIQUE,
                value TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
              );
            `
          });
        }
      } catch (checkTableError) {
        console.error("Error checking if app_settings table exists:", checkTableError);
      }
      
      // Upsert the API key (insert or update)
      const { error } = await client
        .from("app_settings")
        .upsert({
          id: "openai_api_key",
          key: "openai_api_key",
          value: apiKey,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error("Error saving OpenAI API key:", error);
        throw error;
      }
      
    } catch (error) {
      console.error("Failed to save OpenAI API key:", error);
      throw error;
    }
  },
  
  async getOpenAIApiKey(): Promise<string | null> {
    try {
      if (!isSupabaseConfigured()) {
        return null;
      }
      
      const client = initializeSupabase();
      
      try {
        const { data, error } = await client
          .from("app_settings")
          .select("value")
          .eq("key", "openai_api_key")
          .single();
        
        if (error || !data) {
          console.log("No API key found in database");
          return null;
        }
        
        return data.value;
      } catch (error) {
        console.error("Error getting API key from database:", error);
        return null;
      }
      
    } catch (error) {
      console.error("Failed to get OpenAI API key:", error);
      return null;
    }
  },

  async submitPendingVCFirm(firm: Omit<PendingVCFirm, "id" | "status" | "submittedAt">): Promise<PendingVCFirm | null> {
    try {
      const result = await pendingVCFirmService.createPendingVCFirm({
        ...firm,
        id: `pending-${Date.now()}`
      });
      
      return result.data;
    } catch (error) {
      console.error('Failed to submit pending VC Firm:', error);
      throw error;
    }
  },
  ensureContactPersonColumn,
};
