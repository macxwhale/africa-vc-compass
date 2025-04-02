
import { supabase, isSupabaseConfigured } from './supabaseClient';

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
