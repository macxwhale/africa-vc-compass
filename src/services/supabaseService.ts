import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { VCFirm } from '@/data/vcData';
import { PendingVCFirm } from '@/hooks/useDataOperations';

// Singleton pattern to ensure only one instance of the SupabaseClient
let supabase: SupabaseClient | null = null;

// Check if Supabase is configured
const isSupabaseConfigured = (): boolean => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// Initialize Supabase client
const initializeSupabase = (): SupabaseClient => {
  if (supabase) {
    return supabase;
  }

  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured');
  }

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  return supabase;
};

// Store regions in Supabase
const storeRegions = async (regions: { id: string; name: string }[]): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Regions will not be stored.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    const { error } = await supabase
      .from('regions')
      .upsert(regions);

    if (error) {
      console.error('Error storing regions:', error);
    }
  } catch (error) {
    console.error('Failed to store regions:', error);
  }
};

// Get regions from Supabase
const getRegions = async (): Promise<{ id: string; name: string }[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty regions.');
    return [];
  }

  const supabase = initializeSupabase();

  try {
    const { data, error } = await supabase
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
};

// Store industries in Supabase
const storeIndustries = async (industries: { id: string; name: string }[]): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Industries will not be stored.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    const { error } = await supabase
      .from('industries')
      .upsert(industries);

    if (error) {
      console.error('Error storing industries:', error);
    }
  } catch (error) {
    console.error('Failed to store industries:', error);
  }
};

// Get industries from Supabase
const getIndustries = async (): Promise<{ id: string; name: string }[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty industries.');
    return [];
  }

  const supabase = initializeSupabase();

  try {
    const { data, error } = await supabase
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
};

// Store stages in Supabase
const storeStages = async (stages: { id: string; name: string }[]): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Stages will not be stored.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    const { error } = await supabase
      .from('stages')
      .upsert(stages);

    if (error) {
      console.error('Error storing stages:', error);
    }
  } catch (error) {
    console.error('Failed to store stages:', error);
  }
};

// Get stages from Supabase
const getStages = async (): Promise<{ id: string; name: string }[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty stages.');
    return [];
  }

  const supabase = initializeSupabase();

  try {
    const { data, error } = await supabase
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
};

const storeVCFirm = async (firm: VCFirm): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. VC Firm will not be stored.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    const { error } = await supabase
      .from('vc_firms')
      .upsert(firm);

    if (error) {
      console.error('Error storing VC Firm:', error);
    }
  } catch (error) {
    console.error('Failed to store VC Firm:', error);
  }
};

const getVCFirms = async (): Promise<VCFirm[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty VC Firms.');
    return [];
  }

  const supabase = initializeSupabase();

  try {
    const { data, error } = await supabase
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
};

const deleteVCFirm = async (firmId: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. VC Firm will not be deleted.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    const { error } = await supabase
      .from('vc_firms')
      .delete()
      .eq('id', firmId);

    if (error) {
      console.error('Error deleting VC Firm:', error);
    }
  } catch (error) {
    console.error('Failed to delete VC Firm:', error);
  }
};

const updateVCFirm = async (firm: VCFirm): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. VC Firm will not be updated.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    const { error } = await supabase
      .from('vc_firms')
      .update(firm)
      .eq('id', firm.id);

    if (error) {
      console.error('Error updating VC Firm:', error);
    }
  } catch (error) {
    console.error('Failed to update VC Firm:', error);
  }
};

const getPendingVCFirms = async (): Promise<PendingVCFirm[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Returning empty pending VC Firms.');
    return [];
  }

  const supabase = initializeSupabase();

  try {
    const { data, error } = await supabase
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
};

const approvePendingVCFirm = async (firm: PendingVCFirm): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Pending VC Firm will not be approved.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    // Start a transaction
    await supabase.from('pending_vc_firms').update({ status: 'approving' }).eq('id', firm.id);

    // Insert the approved firm into the vc_firms table
    const { error: insertError } = await supabase
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
      await supabase.from('pending_vc_firms').update({ status: 'pending' }).eq('id', firm.id);
      throw insertError;
    }

    // Delete the firm from the pending_vc_firms table
    const { error: deleteError } = await supabase
      .from('pending_vc_firms')
      .delete()
      .eq('id', firm.id);

    if (deleteError) {
      console.error('Error deleting pending VC Firm:', deleteError);
      // Rollback transaction by deleting the inserted firm
      await supabase.from('vc_firms').delete().eq('id', firm.id);
      throw deleteError;
    }

    // If all operations were successful, commit the transaction implicitly
    console.log(`VC Firm ${firm.name} approved and moved to VC Firms table.`);
  } catch (error) {
    console.error('Transaction failed:', error);
    // Handle the error appropriately, e.g., show a user-friendly message
    throw error;
  }
};

const rejectPendingVCFirm = async (firm: PendingVCFirm, rejectionNotes?: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Pending VC Firm will not be rejected.');
    return;
  }

  const supabase = initializeSupabase();

  try {
    const { error } = await supabase
      .from('pending_vc_firms')
      .update({ status: 'rejected', rejectionNotes })
      .eq('id', firm.id);

    if (error) {
      console.error('Error rejecting pending VC Firm:', error);
    }
  } catch (error) {
    console.error('Failed to reject pending VC Firm:', error);
  }
};

export const supabaseService = {
  isSupabaseConfigured,
  initializeSupabase,
  storeRegions,
  getRegions,
  storeIndustries,
  getIndustries,
  storeStages,
  getStages,
  storeVCFirm,
  getVCFirms,
  deleteVCFirm,
  updateVCFirm,
  getPendingVCFirms,
  approvePendingVCFirm,
  rejectPendingVCFirm,
  async saveOpenAIApiKey(apiKey: string): Promise<void> {
    try {
      const supabase = initializeSupabase();
      
      // Check if settings table exists and create it if it doesn't
      try {
        const { error: checkError } = await supabase
          .from("app_settings")
          .select("count")
          .limit(1);
        
        if (checkError) {
          console.log("Creating app_settings table...");
          await supabase.rpc("execute_sql", { 
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
      const { error } = await supabase
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
      
      const supabase = initializeSupabase();
      
      const { data, error } = await supabase
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
      console.error("Failed to get OpenAI API key:", error);
      return null;
    }
  },

  async submitPendingVCFirm(firm: Omit<PendingVCFirm, "id" | "status" | "submittedAt">): Promise<PendingVCFirm> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured. Pending VC Firm will not be submitted.');
      return null;
    }

    const supabase = initializeSupabase();

    try {
      const { data, error } = await supabase
        .from('pending_vc_firms')
        .insert([
          {
            ...firm,
            status: 'pending',
            submittedAt: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error submitting pending VC Firm:', error);
        throw error;
      }

      return data as PendingVCFirm;
    } catch (error) {
      console.error('Failed to submit pending VC Firm:', error);
      throw error;
    }
  },
};
