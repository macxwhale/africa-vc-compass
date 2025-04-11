import { useState, useEffect, useRef } from "react";
import { VCFirm } from "@/data/types";
import { supabase, isSupabaseConfigured, testDatabaseConnection, fixDatabaseSchema } from "@/services/supabaseService";
import { Item } from "@/contexts/DataContext";
import { 
  createTablesIfNeeded, 
  initializeDatabaseWithDefaultData, 
  loadDataFromSupabase 
} from "@/utils/databaseUtils";

type DefaultData = {
  regions: Item[],
  industries: Item[],
  stages: Item[],
  vcFirms: VCFirm[]
};

export function useDatabaseInitialization(defaultData: DefaultData) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const initAttemptedRef = useRef(false);

  // Test Supabase connection and initialize tables if connected
  useEffect(() => {
    // Use ref to prevent multiple initialization attempts
    if (initAttemptedRef.current) return;
    
    const initializeTablesIfNeeded = async () => {
      // Mark initialization as attempted
      initAttemptedRef.current = true;
      setIsLoading(true);
      
      try {
        // Only attempt to connect to Supabase if it's configured
        if (isSupabaseConfigured) {
          try {
            console.log("Checking Supabase connection...");
            
            // Test connection
            const isConnected = await testDatabaseConnection();
            
            if (!isConnected) {
              console.error("Failed to connect to Supabase");
              setIsSupabaseConnected(false);
            } else {
              console.log("Successfully connected to Supabase!");
              setIsSupabaseConnected(true);
              
              // Fix any schema issues first
              console.log("Running database schema fixes during initialization...");
              await fixDatabaseSchema();
              
              // Create tables if they don't exist
              await createTablesIfNeeded();
              
              // Check if data exists in Supabase, if not, initialize with default data
              const tablesHaveData = await checkTablesHaveData();
              
              if (!tablesHaveData) {
                console.log("Tables exist but no data found. Initializing with default data...");
                await initializeDatabaseWithDefaultData(
                  defaultData.regions,
                  defaultData.industries,
                  defaultData.stages,
                  defaultData.vcFirms
                );
              }
            }
          } catch (error) {
            console.error("Error checking Supabase connection:", error);
            setIsSupabaseConnected(false);
          }
        } else {
          console.warn("Supabase credentials are missing or invalid. Check your environment variables.");
          setIsSupabaseConnected(false);
        }
      } catch (error) {
        console.error('Error initializing database:', error);
        setIsSupabaseConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTablesIfNeeded();
  }, []); // Remove defaultData from dependency array to prevent multiple initializations

  // Helper function to check if tables have data
  const checkTablesHaveData = async () => {
    try {
      // Check if there's any data in the regions table
      const { data: regionsData, error: regionsError } = await supabase
        .from('regions')
        .select('count')
        .single();
        
      if (regionsError || !regionsData || regionsData.count === 0) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking if tables have data:', error);
      return false;
    }
  };

  return { isLoading, isSupabaseConnected };
}
