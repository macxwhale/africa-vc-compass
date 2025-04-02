
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid credentials
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;

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

export { supabase };
