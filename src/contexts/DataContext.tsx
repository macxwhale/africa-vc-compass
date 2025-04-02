import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms, VCFirm } from "@/data/vcData";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a supabase client - we'll use this regardless, but handle missing credentials gracefully
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Check if we have valid credentials
const isSupabaseConfigured = !!supabaseUrl && !!supabaseKey;

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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [regionItems, setRegionItems] = useState<Item[]>([]);
  const [industryItems, setIndustryItems] = useState<Item[]>([]);
  const [stageItems, setStageItems] = useState<Item[]>([]);
  const [vcFirms, setVcFirms] = useState<VCFirm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(isSupabaseConfigured);

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

  // Set VC firms and save to database
  const updateVcFirms = async (firms: VCFirm[]) => {
    setVcFirms(firms);
    
    if (!isSupabaseConnected) {
      console.log("Supabase not connected. Changes will only persist in memory.");
      return;
    }
    
    try {
      // First delete all existing VC firms
      await supabase.from('vc_firms').delete().neq('id', 'placeholder');
      
      // Then insert the new ones
      const { error } = await supabase.from('vc_firms').insert(firms);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving VC firms to database:', error);
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

      // Check if we can connect to Supabase by making a simple query
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('regions').select('count');
        
        if (error) {
          console.error("Failed to connect to Supabase:", error);
          setIsSupabaseConnected(false);
        } else {
          console.log("Successfully connected to Supabase!");
          setIsSupabaseConnected(true);
          
          // Now try to load data from Supabase
          await loadDataFromSupabase(regionsData, industriesData, stagesData, vcFirmsData);
          return; // Exit early as we've already set the state in loadDataFromSupabase
        }
      } else {
        console.warn("Supabase credentials are missing. Using local data only.");
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
        isSupabaseConnected
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
