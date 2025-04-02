
import { useState, useEffect } from "react";
import { VCFirm } from "@/data/vcData";
import { supabase, isSupabaseConfigured } from "@/services/supabaseService";
import { toast } from "@/hooks/use-toast";
import { Item } from "@/contexts/DataContext";
import { 
  createTablesIfNeeded, 
  initializeDatabaseWithDefaultData, 
  loadDataFromSupabase 
} from "@/utils/databaseUtils";

export function useDatabaseInitialization(
  defaultData: {
    regions: Item[],
    industries: Item[],
    stages: Item[],
    vcFirms: VCFirm[]
  },
  setItems: {
    setRegionItems: (items: Item[]) => void;
    setIndustryItems: (items: Item[]) => void;
    setStageItems: (items: Item[]) => void;
    setVcFirms: (firms: VCFirm[]) => void;
  }
) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Test Supabase connection and initialize tables if connected
  const initializeTablesIfNeeded = async () => {
    setIsLoading(true);
    
    try {
      // Always set initial data to default values to ensure the app works without Supabase
      let regionsData = defaultData.regions;
      let industriesData = defaultData.industries;
      let stagesData = defaultData.stages;
      let vcFirmsData = defaultData.vcFirms;

      // Only attempt to connect to Supabase if it's configured
      if (isSupabaseConfigured) {
        try {
          console.log("Attempting to connect to Supabase and create tables if needed...");
          
          // First, create the tables if they don't exist
          const tablesCreated = await createTablesIfNeeded();
          
          if (!tablesCreated) {
            console.log("Tables could not be created automatically. SQL has been provided in the console for manual execution.");
            toast({
              title: "Database Setup Required",
              description: "Tables need to be created in your Supabase dashboard. A SQL script has been provided in the console.",
              variant: "destructive",
            });
          } else {
            console.log("Tables exist or were created successfully.");
          }
          
          // Check if we can connect to Supabase by making a simple query
          const { data: connectionTestData, error } = await supabase.from('regions').select('count');
          
          if (error) {
            console.error("Failed to connect to Supabase:", error);
            setIsSupabaseConnected(false);
            toast({
              title: "Database Connection Failed",
              description: "Could not connect to Supabase database. Running in local-only mode.",
              variant: "destructive",
            });
            
            if (error.message.includes("does not exist")) {
              console.log("Tables don't exist in Supabase. Please create them manually using the SQL in the console.");
              toast({
                title: "Database Tables Missing",
                description: "You need to create the necessary tables in your Supabase project. See console for SQL statements.",
                variant: "destructive",
              });
            }
          } else {
            console.log("Successfully connected to Supabase!");
            setIsSupabaseConnected(true);
            toast({
              title: "Database Connected",
              description: "Successfully connected to Supabase database.",
            });
            
            // Now try to load data from Supabase
            await loadDataFromSupabase(regionsData, industriesData, stagesData, vcFirmsData, setItems);
            setIsLoading(false);
            return; // Exit early as we've already set the state in loadDataFromSupabase
          }
        } catch (error) {
          console.error("Error checking Supabase connection:", error);
          setIsSupabaseConnected(false);
          toast({
            title: "Database Error",
            description: "An error occurred while connecting to the database.",
            variant: "destructive",
          });
        }
      } else {
        console.warn("Supabase credentials are missing or invalid. Check your environment variables.");
        setIsSupabaseConnected(false);
      }
      
      // If we reach here, we're using local data
      setItems.setRegionItems(regionsData);
      setItems.setIndustryItems(industriesData);
      setItems.setStageItems(stagesData);
      setItems.setVcFirms(vcFirmsData);
      
    } catch (error) {
      console.error('Error initializing database:', error);
      // In case of error, use the default data
      setItems.setRegionItems(defaultData.regions);
      setItems.setIndustryItems(defaultData.industries);
      setItems.setStageItems(defaultData.stages);
      setItems.setVcFirms(defaultData.vcFirms);
      setIsSupabaseConnected(false);
      toast({
        title: "Database Error",
        description: "Failed to initialize database. Using local data only.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data from database on component mount
  useEffect(() => {
    initializeTablesIfNeeded();
  }, []);

  return { isLoading, isSupabaseConnected };
}
