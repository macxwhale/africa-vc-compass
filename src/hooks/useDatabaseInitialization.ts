
import { useState, useEffect, useRef } from "react";
import { VCFirm } from "@/data/vcData";
import { supabase, testDatabaseConnection } from "@/services/supabaseService";
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
        console.log("Checking Lovable Cloud connection...");
        
        // Test connection
        const isConnected = await testDatabaseConnection();
        
        if (!isConnected) {
          console.error("Failed to connect to Lovable Cloud");
          setIsSupabaseConnected(false);
        } else {
          console.log("Successfully connected to Lovable Cloud!");
          setIsSupabaseConnected(true);
          
          // Create tables if they don't exist
          await createTablesIfNeeded();
          
          // Check if data exists, if not, initialize with default data
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
      const { count, error: regionsError } = await supabase
        .from('regions')
        .select('*', { count: 'exact', head: true });
        
      if (regionsError || !count || count === 0) {
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
