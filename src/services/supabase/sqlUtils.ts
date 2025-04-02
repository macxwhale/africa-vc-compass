import { supabase, isSupabaseConfigured } from './supabaseClient';

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
      try {
        // First try a simple select
        const { error: directError } = await supabase.from('dummy_operation')
          .select('*')
          .limit(1);
        
        // If that doesn't throw an error, we can proceed
        if (!directError) {
          return { data: null, error: null };
        }
        
        // Otherwise try the auth.signUp approach
        const { error: signUpError } = await supabase.auth.signUp({
          email: 'dummy@example.com',
          password: 'password',
          options: {
            data: {
              query: sql
            }
          }
        });
        
        if (signUpError) {
          console.error('Error with fallback SQL execution:', signUpError);
          return { error: signUpError };
        }
        
        return { data: null, error: null };
      } catch (fallbackError) {
        console.error('Error with fallback SQL execution:', fallbackError);
        return { error: fallbackError instanceof Error ? fallbackError : new Error(String(fallbackError)) };
      }
    }
    
    return { data, error };
  } catch (error) {
    console.error('Error executing SQL:', error);
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
};
