import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms, VCFirm } from "@/data/vcData";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid credentials
const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;

// Create a mock Supabase client that just logs operations
const createMockClient = () => {
  console.warn('Using mock Supabase client. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  
  const mockClient = {
    from: (table: string) => ({
      select: (query: string) => ({ 
        data: null, 
        error: new Error('Mock Supabase client: No connection available'),
        count: 0
      }),
      insert: (data: any) => ({ 
        data: null, 
        error: new Error('Mock Supabase client: No connection available') 
      }),
      update: (data: any) => ({ 
        data: null, 
        error: new Error('Mock Supabase client: No connection available') 
      }),
      delete: () => ({ 
        data: null, 
        error: new Error('Mock Supabase client: No connection available') 
      }),
      eq: (column: string, value: any) => ({ 
        data: null, 
        error: new Error('Mock Supabase client: No connection available') 
      }),
      neq: (column: string, value: any) => mockClient.from(table),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    }
  };
  
  return mockClient as unknown as SupabaseClient;
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
  if (!isSupabaseConfigured) return;

  try {
    // Define SQL statements to create tables if they don't exist
    const createTableStatements = [
      `
      CREATE TABLE IF NOT EXISTS regions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      )
      `,
      `
      CREATE TABLE IF NOT EXISTS industries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      )
      `,
      `
      CREATE TABLE IF NOT EXISTS stages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
      )
      `,
      `
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
      )
      `
    ];

    // Execute each statement to create tables
    for (const sql of createTableStatements) {
      const { error } = await supabase.rpc('exec', { query: sql });
      if (error) {
        console.error('Error creating table:', error);
        
        // If the 'exec' RPC function doesn't exist, we need to handle it differently
        if (error.message.includes('function "exec" does not exist')) {
          console.log('The exec RPC function does not exist. Tables need to be created manually in the Supabase dashboard.');
          return false;
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error creating tables:', error);
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
        return;
      }

      // Add to Supabase
      const { error } = await supabase.from('vc_firms').insert(firm);
      if (error) throw error;
      
      // Update local state
      setVcFirms([...vcFirms, firm]);
    } catch (error) {
      console.error("Error adding VC firm:", error);
      throw error;
    }
  };

  const updateVCFirm = async (firm: VCFirm) => {
    try {
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms(vcFirms.map(f => f.id === firm.id ? firm : f));
        return;
      }

      // Update in Supabase
      const { error } = await supabase
        .from('vc_firms')
        .update(firm)
        .eq('id', firm.id);
        
      if (error) throw error;
      
      // Update local state
      setVcFirms(vcFirms.map(f => f.id === firm.id ? firm : f));
    } catch (error) {
      console.error("Error updating VC firm:", error);
      throw error;
    }
  };

  const deleteVCFirm = async (id: string) => {
    try {
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms(vcFirms.filter(f => f.id !== id));
        return;
      }

      // Delete from Supabase
      const { error } = await supabase
        .from('vc_firms')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setVcFirms(vcFirms.filter(f => f.id !== id));
    } catch (error) {
      console.error("Error deleting VC firm:", error);
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
    } catch (error) {
      console.error('Error saving regions to database:', error);
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
    } catch (error) {
      console.error('Error saving industries to database:', error);
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
    } catch (error) {
      console.error('Error saving stages to database:', error);
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
      
      // If we got here without throwing, we have a Supabase connection
      setIsSupabaseConnected(true);
      
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
          }
          
          // Check if we can connect to Supabase by making a simple query
          const { data, error } = await supabase.from('regions').select('count');
          
          if (error) {
            console.error("Failed to connect to Supabase:", error);
            setIsSupabaseConnected(false);
            
            if (error.message.includes("does not exist")) {
              console.log("Tables don't exist in Supabase. Going to try creating them...");
              
              // Retry creating tables one more time
              await createTablesIfNeeded();
              
              // Try to initialize the tables with default data
              await initializeDatabaseWithDefaultData(regionsData, industriesData, stagesData, vcFirmsData);
            }
          } else {
            console.log("Successfully connected to Supabase!");
            setIsSupabaseConnected(true);
            
            // Now try to load data from Supabase
            await loadDataFromSupabase(regionsData, industriesData, stagesData, vcFirmsData);
            setIsLoading(false);
            return; // Exit early as we've already set the state in loadDataFromSupabase
          }
        } catch (error) {
          console.error("Error checking Supabase connection:", error);
          setIsSupabaseConnected(false);
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
        setVcFirms: updateVcFirms,
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
