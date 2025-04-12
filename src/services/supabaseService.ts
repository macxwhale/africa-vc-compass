
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { VCFirm } from '@/data/vcData';
import { PendingVCFirm } from '@/types/vcTypes';
import { Item } from '@/contexts/DataContext';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase URL and key are defined
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

// Create Supabase client
const supabase = createClient<Database>(supabaseUrl as string, supabaseKey as string);

// Function to test the database connection
const testDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('regions').select('id').limit(1);
    if (error) {
      console.error("Supabase connection test failed:", error);
      return false;
    }
    console.log("Supabase connection test successful");
    return true;
  } catch (error) {
    console.error("Supabase connection test failed:", error);
    return false;
  }
};

// Function to execute a raw SQL query
const executeSQL = async (sql: string) => {
  try {
    const { data, error } = await supabase.rpc('execute_sql', { sql_statement: sql });
    if (error) {
      console.error("Error executing SQL:", error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (error) {
    console.error("Error executing SQL:", error);
    return { data: null, error };
  }
};

// Function to create all tables
const createAllTables = async () => {
  try {
    // SQL statements to create tables
    const createRegionsTableSQL = `
      CREATE TABLE IF NOT EXISTS regions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;
    
    const createIndustriesTableSQL = `
      CREATE TABLE IF NOT EXISTS industries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;
    
    const createStagesTableSQL = `
      CREATE TABLE IF NOT EXISTS stages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;
    
    const createVCFirmsTableSQL = `
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
    `;
    
    const createPendingVCFirmsTableSQL = `
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
    `;
    
    const createSettingsTableSQL = `
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `;

    // Execute SQL statements to create tables
    await executeSQL(createRegionsTableSQL);
    await executeSQL(createIndustriesTableSQL);
    await executeSQL(createStagesTableSQL);
    await executeSQL(createVCFirmsTableSQL);
    await executeSQL(createPendingVCFirmsTableSQL);
    await executeSQL(createSettingsTableSQL);

    console.log("All tables created successfully");
    return true;
  } catch (error) {
    console.error("Error creating tables:", error);
    return false;
  }
};

export const regionService = {
  getAllRegions: async () => {
    try {
      console.log("Getting all regions...");
      
      const { data, error } = await supabase
        .from('regions')
        .select('*');
        
      if (error) {
        console.error("Error fetching regions:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching regions:", error);
      return [];
    }
  },
  
  updateAllRegions: async (regions: Item[]) => {
    try {
      console.log("Updating all regions...");
      
      // Delete existing regions
      const { error: deleteError } = await supabase
        .from('regions')
        .delete()
        .neq('id', 'null');
        
      if (deleteError) {
        console.error("Error deleting existing regions:", deleteError);
        return { data: null, error: deleteError };
      }
      
      // Insert new regions
      const { data, error: insertError } = await supabase
        .from('regions')
        .insert(regions);
        
      if (insertError) {
        console.error("Error inserting regions:", insertError);
        return { data: null, error: insertError };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error updating regions:", error);
      return { data: null, error };
    }
  }
};

export const industryService = {
  getAllIndustries: async () => {
    try {
      console.log("Getting all industries...");
      
      const { data, error } = await supabase
        .from('industries')
        .select('*');
        
      if (error) {
        console.error("Error fetching industries:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching industries:", error);
      return [];
    }
  },
  
  updateAllIndustries: async (industries: Item[]) => {
    try {
      console.log("Updating all industries...");
      
      // Delete existing industries
      const { error: deleteError } = await supabase
        .from('industries')
        .delete()
        .neq('id', 'null');
        
      if (deleteError) {
        console.error("Error deleting existing industries:", deleteError);
        return { data: null, error: deleteError };
      }
      
      // Insert new industries
      const { data, error: insertError } = await supabase
        .from('industries')
        .insert(industries);
        
      if (insertError) {
        console.error("Error inserting industries:", insertError);
        return { data: null, error: insertError };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error updating industries:", error);
      return { data: null, error };
    }
  }
};

export const stageService = {
  getAllStages: async () => {
    try {
      console.log("Getting all stages...");
      
      const { data, error } = await supabase
        .from('stages')
        .select('*');
        
      if (error) {
        console.error("Error fetching stages:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching stages:", error);
      return [];
    }
  },
  
  updateAllStages: async (stages: Item[]) => {
    try {
      console.log("Updating all stages...");
      
      // Delete existing stages
      const { error: deleteError } = await supabase
        .from('stages')
        .delete()
        .neq('id', 'null');
        
      if (deleteError) {
        console.error("Error deleting existing stages:", deleteError);
        return { data: null, error: deleteError };
      }
      
      // Insert new stages
      const { data, error: insertError } = await supabase
        .from('stages')
        .insert(stages);
        
      if (insertError) {
        console.error("Error inserting stages:", insertError);
        return { data: null, error: insertError };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error updating stages:", error);
      return { data: null, error };
    }
  }
};

export const vcFirmService = {
  getAllVCFirms: async () => {
    try {
      console.log("Getting all VC firms...");
      
      const { data, error } = await supabase
        .from('vc_firms')
        .select('*');
        
      if (error) {
        console.error("Error fetching VC Firms:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching VC Firms:", error);
      return [];
    }
  },
  
  createVCFirm: async (firmData: Omit<VCFirm, "id">) => {
    try {
      console.log("Creating VC firm...");
      
      const { data, error } = await supabase
        .from('vc_firms')
        .insert(firmData)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error creating VC Firm:", error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error creating VC Firm:", error);
      return { data: null, error };
    }
  },
  
  updateVCFirm: async (firmData: VCFirm) => {
    try {
      console.log("Updating VC firm...");
      
      const { id, ...updateData } = firmData;
      
      const { data, error } = await supabase
        .from('vc_firms')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error updating VC Firm:", error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error updating VC Firm:", error);
      return { data: null, error };
    }
  },
  
  deleteVCFirm: async (id: string) => {
    try {
      console.log("Deleting VC firm...");
      
      const { error } = await supabase
        .from('vc_firms')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error("Error deleting VC Firm:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting VC Firm:", error);
      return false;
    }
  }
};

export const pendingVCFirmService = {
  getAllPendingVCFirms: async () => {
    try {
      console.log("Getting all pending VC firms...");
      
      const { data, error } = await supabase
        .from('pending_vc_firms')
        .select('*');
        
      if (error) {
        console.error("Error fetching pending VC Firms:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching pending VC Firms:", error);
      return [];
    }
  },
  
  createPendingVCFirm: async (firmData: Omit<VCFirm, "id">) => {
    try {
      console.log("Creating pending VC firm...");
      
      // Add status and submittedAt fields
      const pendingFirm = {
        ...firmData,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('pending_vc_firms')
        .insert(pendingFirm)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error creating pending VC Firm:", error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error creating pending VC Firm:", error);
      return { data: null, error };
    }
  },
  
  updatePendingVCFirm: async (firmData: PendingVCFirm) => {
    try {
      console.log("Updating pending VC firm...");
      
      const { id, ...updateData } = firmData;
      
      const { data, error } = await supabase
        .from('pending_vc_firms')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error updating pending VC Firm:", error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error("Error updating pending VC Firm:", error);
      return { data: null, error };
    }
  },
  
  deletePendingVCFirm: async (id: string) => {
    try {
      console.log("Deleting pending VC firm...");
      
      const { error } = await supabase
        .from('pending_vc_firms')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error("Error deleting pending VC Firm:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting pending VC Firm:", error);
      return false;
    }
  }
};

// Create a service for OpenAI API key management
export const supabaseService = {
  isSupabaseConfigured: () => isSupabaseConfigured,
  
  getOpenAIApiKey: async () => {
    try {
      if (!isSupabaseConfigured) return null;
      
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'openai_api_key')
        .single();
      
      if (error || !data) return null;
      return data.value;
    } catch (error) {
      console.error("Error getting OpenAI API key:", error);
      return null;
    }
  },
  
  saveOpenAIApiKey: async (apiKey: string) => {
    try {
      if (!isSupabaseConfigured) return false;
      
      const { error } = await supabase
        .from('settings')
        .upsert({ key: 'openai_api_key', value: apiKey })
        .select();
      
      return !error;
    } catch (error) {
      console.error("Error saving OpenAI API key:", error);
      return false;
    }
  }
};

export { supabase, isSupabaseConfigured, testDatabaseConnection, executeSQL, createAllTables };
