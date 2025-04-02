
import { supabase, isSupabaseConfigured } from './supabaseClient';

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
