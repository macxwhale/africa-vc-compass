import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms, VCFirm } from "@/data/vcData";
import { supabase, isSupabaseConfigured, vcFirmService } from "@/services/supabaseService";
import { toast } from "@/hooks/use-toast";

interface Item {
  id: string;
  name: string;
}

interface DataContextType {
  regionItems: Item[];
  industryItems: Item[];
  stageItems: Item[];
  vcFirms: VCFirm[];
  setRegionItems: (items: Item[]) => void;
  setIndustryItems: (items: Item[]) => void;
  setStageItems: (items: Item[]) => void;
  setVcFirms: (firms: VCFirm[]) => void;
  regionNames: string[];
  industryNames: string[];
  stageNames: string[];
  getVCsByIndustry: (industry: string, limit?: number) => VCFirm[];
  getVCsByRegion: (region: string, limit?: number) => VCFirm[];
  isSupabaseConnected: boolean;
  addVCFirm: (firm: VCFirm) => Promise<void>;
  updateVCFirm: (firm: VCFirm) => Promise<void>;
  deleteVCFirm: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Function to create the necessary tables in Supabase if they don't exist
const createTablesIfNeeded = async () => {
  if (!isSupabaseConfigured) return false;

  try {
    // To create tables, we need to use the SQL editor in Supabase dashboard
    // Here we'll just log instructions for the user
    console.log(`
      To create the necessary tables in Supabase, go to the SQL Editor in your Supabase dashboard and run the following SQL:
      
      CREATE TABLE IF NOT EXISTS regions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS industries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS stages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS vc_firms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        logo TEXT,
        description TEXT,
        website TEXT,
        headquarters TEXT,
        "foundedYear" INTEGER,
        "investmentFocus" TEXT[],
        industries TEXT[],
        "stagePreference" TEXT[],
        "ticketSize" TEXT,
        "regionsOfInterest" TEXT[],
        "portfolioCompanies" TEXT[],
        "keyPartners" JSONB,
        "contactInfo" JSONB
      );
    `);
    
    // Check if we can access any of the tables
    const { data, error } = await supabase.from('regions').select('count');
    if (error) {
      console.error('Tables need to be created manually in Supabase dashboard:', error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error checking tables:', error);
    return false;
  }
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [regionItems, setRegionItems] = useState<Item[]>([]);
  const [industryItems, setIndustryItems] = useState<Item[]>([]);
  const [stageItems, setStageItems] = useState<Item[]>([]);
  const [vcFirms, setVcFirms] = useState<VCFirm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Derived data - just the names as string arrays for the filters
  const regionNames = regionItems.map(item => item.name);
  const industryNames = industryItems.map(item => item.name);
  const stageNames = stageItems.map(item => item.name);

  // Get VCs by industry with optional limit
  const getVCsByIndustry = (industry: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.industries.includes(industry));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  // Get VCs by region with optional limit
  const getVCsByRegion = (region: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.regionsOfInterest.includes(region));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  // CRUD Operations for VC Firms
  const addVCFirm = async (firm: VCFirm) => {
    try {
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms([...vcFirms, firm]);
        toast({
          title: "Success",
          description: "VC firm added successfully (local only)",
        });
        return;
      }

      // Add to Supabase
      const { data } = await vcFirmService.createVCFirm(firm);
      
      // Update local state
      setVcFirms([...vcFirms, firm]);
      
      toast({
        title: "Success",
        description: "VC firm added successfully and saved to database",
      });
    } catch (error) {
      console.error("Error adding VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to add VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateVCFirm = async (firm: VCFirm) => {
    try {
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms(vcFirms.map(f => f.id === firm.id ? firm : f));
        toast({
          title: "Success",
          description: "VC firm updated successfully (local only)",
        });
        return;
      }

      // Update in Supabase
      await vcFirmService.updateVCFirm(firm);
      
      // Update local state
      setVcFirms(vcFirms.map(f => f.id === firm.id ? firm : f));
      
      toast({
        title: "Success",
        description: "VC firm updated successfully and saved to database",
      });
    } catch (error) {
      console.error("Error updating VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to update VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteVCFirm = async (id: string) => {
    try {
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms(vcFirms.filter(f => f.id !== id));
        toast({
          title: "Success",
          description: "VC firm deleted successfully (local only)",
        });
        return;
      }

      // Delete from Supabase
      await vcFirmService.deleteVCFirm(id);
      
      // Update local state
      setVcFirms(vcFirms.filter(f => f.id !== id));
      
      toast({
        title: "Success",
        description: "VC firm deleted successfully and removed from database",
      });
    } catch (error) {
      console.error("Error deleting VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to delete VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Set regions and save to database
  const updateRegionItems = async (items: Item[]) => {
    setRegionItems(items);
    
    if (!isSupabaseConnected) {
      console.log("Supabase not connected. Changes will only persist in memory.");
      return;
    }
    
    try {
      // First delete all existing regions
      await supabase.from('regions').delete().neq('id', 'placeholder');
      
      // Then insert the new ones
      const { error } = await supabase.from('regions').insert(
        items.map(item => ({ id: item.id, name: item.name }))
      );
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Regions updated successfully and saved to database",
      });
    } catch (error) {
      console.error('Error saving regions to database:', error);
      toast({
        title: "Error",
        description: `Failed to save regions to database: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  // Set industries and save to database
  const updateIndustryItems = async (items: Item[]) => {
    setIndustryItems(items);
    
    if (!isSupabaseConnected) {
      console.log("Supabase not connected. Changes will only persist in memory.");
      return;
    }
    
    try {
      // First delete all existing industries
      await supabase.from('industries').delete().neq('id', 'placeholder');
      
      // Then insert the new ones
      const { error } = await supabase.from('industries').insert(
        items.map(item => ({ id: item.id, name: item.name }))
      );
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Industries updated successfully and saved to database",
      });
    } catch (error) {
      console.error('Error saving industries to database:', error);
      toast({
        title: "Error",
        description: `Failed to save industries to database: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  // Set stages and save to database
  const updateStageItems = async (items: Item[]) => {
    setStageItems(items);
    
    if (!isSupabaseConnected) {
      console.log("Supabase not connected. Changes will only persist in memory.");
      return;
    }
    
    try {
      // First delete all existing stages
      await supabase.from('stages').delete().neq('id', 'placeholder');
      
      // Then insert the new ones
      const { error } = await supabase.from('stages').insert(
        items.map(item => ({ id: item.id, name: item.name }))
      );
      
      if (error) throw error;
      toast({
        title: "Success",
        description: "Investment stages updated successfully and saved to database",
      });
    } catch (error) {
      console.error('Error saving stages to database:', error);
      toast({
        title: "Error",
        description: `Failed to save stages to database: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  // Helper function to initialize the database with default data
  const initializeDatabaseWithDefaultData = async (
    defaultRegions: Item[], 
    defaultIndustries: Item[], 
    defaultStages: Item[],
    defaultVcFirms: VCFirm[]
  ) => {
    try {
      // Try to insert the default data into each table
      const { error: regionsError } = await supabase.from('regions').insert(defaultRegions);
      if (regionsError) {
        console.error('Error initializing regions:', regionsError);
      } else {
        console.log('Successfully initialized regions table with default data');
      }
      
      const { error: industriesError } = await supabase.from('industries').insert(defaultIndustries);
      if (industriesError) {
        console.error('Error initializing industries:', industriesError);
      } else {
        console.log('Successfully initialized industries table with default data');
      }
      
      const { error: stagesError } = await supabase.from('stages').insert(defaultStages);
      if (stagesError) {
        console.error('Error initializing stages:', stagesError);
      } else {
        console.log('Successfully initialized stages table with default data');
      }
      
      const { error: vcFirmsError } = await supabase.from('vc_firms').insert(defaultVcFirms);
      if (vcFirmsError) {
        console.error('Error initializing VC firms:', vcFirmsError);
      } else {
        console.log('Successfully initialized VC firms table with default data');
      }
      
      // Set the state with the default data
      setRegionItems(defaultRegions);
      setIndustryItems(defaultIndustries);
      setStageItems(defaultStages);
      setVcFirms(defaultVcFirms);
      
    } catch (error) {
      console.error('Error initializing database with default data:', error);
      throw error;
    }
  };
  
  // Helper function to load data from Supabase
  const loadDataFromSupabase = async (
    defaultRegions: Item[], 
    defaultIndustries: Item[], 
    defaultStages: Item[],
    defaultVcFirms: VCFirm[]
  ) => {
    try {
      // Check regions
      const { data: dbRegionsData, error: regionsError } = await supabase
        .from('regions')
        .select('*');
      
      if (regionsError) {
        console.error('Error checking regions:', regionsError);
      }

      // If regions data exists in database, use it
      if (dbRegionsData && dbRegionsData.length > 0) {
        setRegionItems(dbRegionsData as Item[]);
      } else {
        // Otherwise initialize with default data
        await supabase.from('regions').insert(defaultRegions);
        setRegionItems(defaultRegions);
      }

      // Check industries
      const { data: dbIndustriesData, error: industriesError } = await supabase
        .from('industries')
        .select('*');
      
      if (industriesError) {
        console.error('Error checking industries:', industriesError);
      }

      // If industries data exists in database, use it
      if (dbIndustriesData && dbIndustriesData.length > 0) {
        setIndustryItems(dbIndustriesData as Item[]);
      } else {
        // Otherwise initialize with default data
        await supabase.from('industries').insert(defaultIndustries);
        setIndustryItems(defaultIndustries);
      }

      // Check stages
      const { data: dbStagesData, error: stagesError } = await supabase
        .from('stages')
        .select('*');
      
      if (stagesError) {
        console.error('Error checking stages:', stagesError);
      }

      // If stages data exists in database, use it
      if (dbStagesData && dbStagesData.length > 0) {
        setStageItems(dbStagesData as Item[]);
      } else {
        // Otherwise initialize with default data
        await supabase.from('stages').insert(defaultStages);
        setStageItems(defaultStages);
      }

      // Check VC firms
      const { data: dbVCFirmsData, error: vcFirmsError } = await supabase
        .from('vc_firms')
        .select('*');
      
      if (vcFirmsError) {
        console.error('Error checking VC firms:', vcFirmsError);
      }

      // If VC firms data exists in database, use it
      if (dbVCFirmsData && dbVCFirmsData.length > 0) {
        setVcFirms(dbVCFirmsData as VCFirm[]);
      } else {
        // Otherwise initialize with default data
        await supabase.from('vc_firms').insert(defaultVcFirms);
        setVcFirms(defaultVcFirms);
      }
    } catch (error) {
      console.error('Error loading data from Supabase:', error);
      throw error;
    }
  };

  // Test Supabase connection and initialize tables if connected
  const initializeTablesIfNeeded = async () => {
    setIsLoading(true);
    
    try {
      // Always set initial data to default values to ensure the app works without Supabase
      let regionsData = initialRegions.map((name, index) => ({ id: `region-${index}`, name }));
      let industriesData = initialIndustries.map((name, index) => ({ id: `industry-${index}`, name }));
      let stagesData = initialStages.map((name, index) => ({ id: `stage-${index}`, name }));
      let vcFirmsData = initialVcFirms;

      // Only attempt to connect to Supabase if it's configured
      if (isSupabaseConfigured) {
        try {
          // First, create the tables if they don't exist
          const tablesCreated = await createTablesIfNeeded();
          
          if (!tablesCreated) {
            console.log("Tables could not be created automatically. You may need to create them manually.");
            toast({
              title: "Database Setup Required",
              description: "Tables need to be created in your Supabase dashboard. Check console for SQL statements.",
              variant: "destructive",
            });
          }
          
          // Check if we can connect to Supabase by making a simple query
          const { data, error } = await supabase.from('regions').select('count');
          
          if (error) {
            console.error("Failed to connect to Supabase:", error);
            setIsSupabaseConnected(false);
            toast({
              title: "Database Connection Failed",
              description: "Could not connect to Supabase database. Running in local-only mode.",
              variant: "destructive",
            });
            
            if (error.message.includes("does not exist")) {
              console.log("Tables don't exist in Supabase. Going to try creating them...");
              
              // Try to initialize the tables with default data
              try {
                await initializeDatabaseWithDefaultData(regionsData, industriesData, stagesData, vcFirmsData);
                toast({
                  title: "Database Tables Missing",
                  description: "You need to create the necessary tables in Supabase. Check console for SQL statements.",
                });
              } catch (initError) {
                console.error("Failed to initialize database:", initError);
              }
            }
          } else {
            console.log("Successfully connected to Supabase!");
            setIsSupabaseConnected(true);
            toast({
              title: "Database Connected",
              description: "Successfully connected to Supabase database.",
            });
            
            // Now try to load data from Supabase
            await loadDataFromSupabase(regionsData, industriesData, stagesData, vcFirmsData);
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
        console.warn("Supabase credentials are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables to enable Supabase integration.");
        setIsSupabaseConnected(false);
      }
      
      // If we reach here, we're using local data
      setRegionItems(regionsData);
      setIndustryItems(industriesData);
      setStageItems(stagesData);
      setVcFirms(vcFirmsData);
      
    } catch (error) {
      console.error('Error initializing database:', error);
      // In case of error, use the default data
      setRegionItems(initialRegions.map((name, index) => ({ id: `region-${index}`, name })));
      setIndustryItems(initialIndustries.map((name, index) => ({ id: `industry-${index}`, name })));
      setStageItems(initialStages.map((name, index) => ({ id: `stage-${index}`, name })));
      setVcFirms(initialVcFirms);
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

  // Load all data on component mount
  useEffect(() => {
    // Initialize database tables and load data
    initializeTablesIfNeeded();
  }, []);

  return (
    <DataContext.Provider 
      value={{ 
        regionItems, 
        industryItems, 
        stageItems,
        vcFirms,
        setRegionItems: updateRegionItems, 
        setIndustryItems: updateIndustryItems, 
        setStageItems: updateStageItems,
        setVcFirms,
        regionNames,
        industryNames,
        stageNames,
        getVCsByIndustry,
        getVCsByRegion,
        isSupabaseConnected,
        addVCFirm,
        updateVCFirm,
        deleteVCFirm
      }}
    >
      {isLoading ? <div>Loading data...</div> : children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
