
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { VCFirm } from '@/data/vcData';

// CRUD operations for VC firms
export const vcFirmService = {
  // Create a new VC firm
  createVCFirm: async (firm: VCFirm) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot create VC firm.');
      return { data: null, error: new Error('Supabase not configured') };
    }

    console.log('Creating VC firm in Supabase:', firm);
    
    try {
      // Ensure the key partners and portfolio companies are properly formatted
      const formattedFirm = {
        ...firm,
        keyPartners: Array.isArray(firm.keyPartners) ? firm.keyPartners : [],
        portfolioCompanies: Array.isArray(firm.portfolioCompanies) ? firm.portfolioCompanies : []
      };
      
      const { data, error } = await supabase
        .from('vc_firms')
        .insert(formattedFirm)
        .select();
        
      if (error) {
        console.error('Error creating VC firm:', error);
        return { data: null, error };
      }
      
      console.log('VC firm created successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error creating VC firm:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error creating VC firm') 
      };
    }
  },
  
  // Read all VC firms
  getAllVCFirms: async () => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot fetch VC firms.');
      return [] as VCFirm[];
    }
    
    console.log('Fetching all VC firms...');
    
    try {
      const { data, error } = await supabase
        .from('vc_firms')
        .select('*');
        
      if (error) {
        console.error('Error fetching VC firms:', error);
        throw error;
      }
      
      console.log('VC firms fetched successfully:', data);
      return data as VCFirm[];
    } catch (error) {
      console.error('Unexpected error fetching VC firms:', error);
      return [] as VCFirm[];
    }
  },
  
  // Update a VC firm
  updateVCFirm: async (firm: VCFirm) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot update VC firm.');
      return { data: null, error: new Error('Supabase not configured') };
    }
    
    console.log('Updating VC firm:', firm);
    
    try {
      // Ensure the key partners and portfolio companies are properly formatted
      const formattedFirm = {
        ...firm,
        keyPartners: Array.isArray(firm.keyPartners) ? firm.keyPartners : [],
        portfolioCompanies: Array.isArray(firm.portfolioCompanies) ? firm.portfolioCompanies : []
      };
      
      const { data, error } = await supabase
        .from('vc_firms')
        .update(formattedFirm)
        .eq('id', firm.id)
        .select();
        
      if (error) {
        console.error('Error updating VC firm:', error);
        return { data: null, error };
      }
      
      console.log('VC firm updated successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error updating VC firm:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error updating VC firm') 
      };
    }
  },
  
  // Delete a VC firm
  deleteVCFirm: async (id: string) => {
    if (!isSupabaseConfigured) {
      console.error('Supabase not configured. Cannot delete VC firm.');
      return false;
    }
    
    console.log('Deleting VC firm with ID:', id);
    
    try {
      const { error } = await supabase
        .from('vc_firms')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting VC firm:', error);
        return false;
      }
      
      console.log('VC firm deleted successfully');
      return true;
    } catch (error) {
      console.error('Unexpected error deleting VC firm:', error);
      return false;
    }
  }
};
