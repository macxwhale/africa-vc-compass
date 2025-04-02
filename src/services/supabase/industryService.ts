
import { supabase, isSupabaseConfigured } from './supabaseClient';

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
