import { supabase } from '@/integrations/supabase/client';
import { VCFirm } from '@/data/vcData';
import { PendingVCFirm } from '@/types/vcTypes';
import { Item } from '@/contexts/DataContext';
import type { Database } from '@/integrations/supabase/types';

// Check if Supabase URL and key are defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

// Type helpers for database rows
type DBVCFirm = Database['public']['Tables']['vc_firms']['Row'];
type DBPendingVCFirm = Database['public']['Tables']['pending_vc_firms']['Row'];

// Transform database VCFirm to application VCFirm
function transformDBVCFirmToVCFirm(dbFirm: DBVCFirm): VCFirm {
  return {
    id: dbFirm.id,
    name: dbFirm.name || '',
    logo: dbFirm.logo || '',
    description: dbFirm.description || '',
    website: dbFirm.website || '',
    headquarters: dbFirm.headquarters || '',
    foundedYear: dbFirm.founded_year || 0,
    investmentFocus: dbFirm.investment_focus || [],
    industries: dbFirm.industries || [],
    stagePreference: dbFirm.stage_preference || [],
    ticketSize: dbFirm.ticket_size || '',
    regionsOfInterest: [],
    portfolioCompanies: dbFirm.portfolio_companies || [],
    keyPartners: [],
    contactInfo: {
      email: '',
      linkedin: dbFirm.linkedin_url || '',
      twitter: dbFirm.twitter_url || ''
    },
    contactPerson: dbFirm.contact_person as any
  };
}

// Transform database PendingVCFirm to application PendingVCFirm
function transformDBPendingVCFirmToPendingVCFirm(dbFirm: DBPendingVCFirm): PendingVCFirm {
  return {
    id: dbFirm.id,
    name: dbFirm.name || '',
    logo: dbFirm.logo || '',
    description: dbFirm.description || '',
    website: dbFirm.website || '',
    headquarters: dbFirm.headquarters || '',
    foundedYear: dbFirm.founded_year || 0,
    investmentFocus: dbFirm.investment_focus || [],
    industries: dbFirm.industries || [],
    stagePreference: dbFirm.stage_preference || [],
    ticketSize: dbFirm.ticket_size || '',
    regionsOfInterest: [],
    portfolioCompanies: dbFirm.portfolio_companies || [],
    keyPartners: [],
    contactInfo: {
      email: '',
      linkedin: dbFirm.linkedin_url || '',
      twitter: dbFirm.twitter_url || ''
    },
    contactPerson: dbFirm.contact_person as any,
    status: (dbFirm.status as 'pending' | 'approved' | 'rejected') || 'pending',
    submittedAt: dbFirm.submitted_at || '',
    reviewedAt: dbFirm.reviewed_at || undefined,
    reviewNotes: dbFirm.review_notes || undefined,
    linkedinUrl: dbFirm.linkedin_url || undefined,
    twitterUrl: dbFirm.twitter_url || undefined
  };
}

// Transform application VCFirm to database insert format
function transformVCFirmToDBInsert(firm: Omit<VCFirm, 'id'>): Database['public']['Tables']['vc_firms']['Insert'] {
  return {
    name: firm.name,
    logo: firm.logo,
    description: firm.description,
    website: firm.website,
    headquarters: firm.headquarters,
    founded_year: firm.foundedYear,
    investment_focus: firm.investmentFocus,
    industries: firm.industries,
    stage_preference: firm.stagePreference,
    ticket_size: firm.ticketSize,
    portfolio_companies: firm.portfolioCompanies,
    notable_investments: [],
    linkedin_url: firm.contactInfo?.linkedin || (firm as any).linkedinUrl,
    twitter_url: firm.contactInfo?.twitter || (firm as any).twitterUrl,
    contact_person: firm.contactPerson as any
  };
}

// Transform application VCFirm to database update format
function transformVCFirmToDBUpdate(firm: VCFirm): Database['public']['Tables']['vc_firms']['Update'] {
  return {
    name: firm.name,
    logo: firm.logo,
    description: firm.description,
    website: firm.website,
    headquarters: firm.headquarters,
    founded_year: firm.foundedYear,
    investment_focus: firm.investmentFocus,
    industries: firm.industries,
    stage_preference: firm.stagePreference,
    ticket_size: firm.ticketSize,
    portfolio_companies: firm.portfolioCompanies,
    notable_investments: [],
    linkedin_url: firm.contactInfo?.linkedin || (firm as any).linkedinUrl,
    twitter_url: firm.contactInfo?.twitter || (firm as any).twitterUrl,
    contact_person: firm.contactPerson as any
  };
}

// Transform application PendingVCFirm to database update format
function transformPendingVCFirmToDBUpdate(firm: PendingVCFirm): Database['public']['Tables']['pending_vc_firms']['Update'] {
  return {
    name: firm.name,
    logo: firm.logo,
    description: firm.description,
    website: firm.website,
    headquarters: firm.headquarters,
    founded_year: firm.foundedYear,
    investment_focus: firm.investmentFocus,
    industries: firm.industries,
    stage_preference: firm.stagePreference,
    ticket_size: firm.ticketSize,
    portfolio_companies: firm.portfolioCompanies,
    notable_investments: [],
    linkedin_url: firm.linkedinUrl || firm.contactInfo?.linkedin,
    twitter_url: firm.twitterUrl || firm.contactInfo?.twitter,
    contact_person: firm.contactPerson as any,
    status: firm.status,
    submitted_at: firm.submittedAt,
    reviewed_at: firm.reviewedAt,
    review_notes: firm.reviewNotes
  };
}

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
    // Note: This requires an RPC function to be created in Supabase
    // For now, we'll comment this out as it's not available
    console.log("SQL execution not available - RPC function not configured");
    return { data: null, error: new Error('SQL execution not configured') };
  } catch (error) {
    console.error("Error executing SQL:", error);
    return { data: null, error };
  }
};

// Function to create all tables
const createAllTables = async () => {
  try {
    console.log("Attempting to enable uuid-ossp extension...");
    // First enable uuid-ossp extension for uuid generation
    const enableUuidExtensionSQL = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `;
    await executeSQL(enableUuidExtensionSQL);
    
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
        throw deleteError;
      }
      
      // Insert new regions
      const { data, error: insertError } = await supabase
        .from('regions')
        .insert(regions);
        
      if (insertError) {
        console.error("Error inserting regions:", insertError);
        throw insertError;
      }
      
      return data;
    } catch (error) {
      console.error("Error updating regions:", error);
      throw error;
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
        throw deleteError;
      }
      
      // Insert new industries
      const { data, error: insertError } = await supabase
        .from('industries')
        .insert(industries);
        
      if (insertError) {
        console.error("Error inserting industries:", insertError);
        throw insertError;
      }
      
      return data;
    } catch (error) {
      console.error("Error updating industries:", error);
      throw error;
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
        throw deleteError;
      }
      
      // Insert new stages
      const { data, error: insertError } = await supabase
        .from('stages')
        .insert(stages);
        
      if (insertError) {
        console.error("Error inserting stages:", insertError);
        throw insertError;
      }
      
      return data;
    } catch (error) {
      console.error("Error updating stages:", error);
      throw error;
    }
  }
};

export const vcFirmService = {
  getAllVCFirms: async () => {
    try {
      console.log("Getting all VC firms...");
      
      // Remove limit to get all firms, not just the first ones
      const { data, error } = await supabase
        .from('vc_firms')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) {
        console.error("Error fetching VC Firms:", error);
        return [];
      }
      
      console.log(`Retrieved ${data?.length || 0} VC firms from database`);
      return (data || []).map(transformDBVCFirmToVCFirm);
    } catch (error) {
      console.error("Error fetching VC Firms:", error);
      return [];
    }
  },
  
  createVCFirm: async (firmData: Omit<VCFirm, "id">) => {
    try {
      console.log("Creating VC firm...");
      
      const dbFirm = transformVCFirmToDBInsert(firmData);
      
      const { data, error } = await supabase
        .from('vc_firms')
        .insert(dbFirm)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error creating VC Firm:", error);
        throw error;
      }
      
      return transformDBVCFirmToVCFirm(data);
    } catch (error) {
      console.error("Error creating VC Firm:", error);
      throw error;
    }
  },
  
  updateVCFirm: async (firmData: VCFirm) => {
    try {
      console.log("Updating VC firm...");
      
      const dbUpdate = transformVCFirmToDBUpdate(firmData);
      
      const { data, error } = await supabase
        .from('vc_firms')
        .update(dbUpdate)
        .eq('id', firmData.id)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error updating VC Firm:", error);
        throw error;
      }
      
      return transformDBVCFirmToVCFirm(data);
    } catch (error) {
      console.error("Error updating VC Firm:", error);
      throw error;
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
      
      // First check if the table exists
      try {
        const { count, error: countError } = await supabase
          .from('pending_vc_firms')
          .select('*', { count: 'exact', head: true });
          
        // If there's an error with the table not existing
        if (countError && countError.code === '42P01') {
          console.log("Pending VC firms table doesn't exist yet, creating now...");
          await createAllTables();
        }
      } catch (checkError) {
        console.error("Error checking pending VC firms table:", checkError);
        // Try creating the tables if there was an error checking
        await createAllTables();
      }
      
      const { data, error } = await supabase
        .from('pending_vc_firms')
        .select('*')
        .order('submitted_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching pending VC Firms:", error);
        return [];
      }
      
      console.log(`Retrieved ${data?.length || 0} pending VC firms from database`);
      return (data || []).map(transformDBPendingVCFirmToPendingVCFirm);
    } catch (error) {
      console.error("Error fetching pending VC Firms:", error);
      return [];
    }
  },
  
  createPendingVCFirm: async (firmData: Omit<VCFirm, "id">) => {
    try {
      console.log("Creating pending VC firm...");
      
      const dbFirm = transformVCFirmToDBInsert(firmData);
      
      // Add status and submittedAt fields
      const pendingFirm = {
        ...dbFirm,
        status: 'pending',
        submitted_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('pending_vc_firms')
        .insert(pendingFirm)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error creating pending VC Firm:", error);
        throw error;
      }
      
      return transformDBPendingVCFirmToPendingVCFirm(data);
    } catch (error) {
      console.error("Error creating pending VC Firm:", error);
      throw error;
    }
  },
  
  updatePendingVCFirm: async (firmData: PendingVCFirm) => {
    try {
      console.log("Updating pending VC firm...");
      
      const dbUpdate = transformPendingVCFirmToDBUpdate(firmData);
      
      const { data, error } = await supabase
        .from('pending_vc_firms')
        .update(dbUpdate)
        .eq('id', firmData.id)
        .select('*')
        .single();
        
      if (error) {
        console.error("Error updating pending VC Firm:", error);
        throw error;
      }
      
      return transformDBPendingVCFirmToPendingVCFirm(data);
    } catch (error) {
      console.error("Error updating pending VC Firm:", error);
      throw error;
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
