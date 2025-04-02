
import { 
  supabase, 
  isSupabaseConfigured, 
  executeSQL, 
  testDatabaseConnection, 
  createAllTables, 
  regionService, 
  industryService, 
  stageService, 
  vcFirmService 
} from "@/services/supabaseService";
import { Item } from "@/contexts/DataContext";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";

// Function to check if tables exist and create them if they don't
export const createTablesIfNeeded = async () => {
  if (!isSupabaseConfigured) return false;

  try {
    console.log("Testing database connection...");
    const isConnected = await testDatabaseConnection();
    
    if (!isConnected) {
      console.error("Failed to connect to database or create tables");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking/creating tables:', error);
    return false;
  }
};

// Helper function to initialize the database with default data
export const initializeDatabaseWithDefaultData = async (
  defaultRegions: Item[], 
  defaultIndustries: Item[], 
  defaultStages: Item[],
  defaultVcFirms: VCFirm[]
) => {
  try {
    console.log("Initializing database with default data...");
    
    // Create tables first if they don't exist
    const tablesCreated = await createAllTables();
    
    if (!tablesCreated) {
      console.error("Failed to create tables for default data");
      return false;
    }
    
    // Try to insert the default data into each table
    console.log("Inserting default regions...");
    try {
      await regionService.updateAllRegions(defaultRegions);
      console.log('Successfully initialized regions table with default data');
    } catch (regionsError) {
      console.error('Error initializing regions:', regionsError);
    }
    
    console.log("Inserting default industries...");
    try {
      await industryService.updateAllIndustries(defaultIndustries);
      console.log('Successfully initialized industries table with default data');
    } catch (industriesError) {
      console.error('Error initializing industries:', industriesError);
    }
    
    console.log("Inserting default stages...");
    try {
      await stageService.updateAllStages(defaultStages);
      console.log('Successfully initialized stages table with default data');
    } catch (stagesError) {
      console.error('Error initializing stages:', stagesError);
    }
    
    console.log("Inserting default VC firms...");
    try {
      // Delete any existing firms first
      const { data: existingFirms } = await supabase
        .from('vc_firms')
        .select('id');
        
      if (existingFirms && existingFirms.length > 0) {
        for (const firm of existingFirms) {
          await supabase
            .from('vc_firms')
            .delete()
            .eq('id', firm.id);
        }
      }
      
      // Insert default firms one by one
      for (const firm of defaultVcFirms) {
        await supabase
          .from('vc_firms')
          .insert(firm);
      }
      
      console.log('Successfully initialized VC firms table with default data');
    } catch (vcFirmsError) {
      console.error('Error initializing VC firms:', vcFirmsError);
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing database with default data:', error);
    return false;
  }
};

// Helper function to load data from Supabase
export const loadDataFromSupabase = async (
  defaultRegions: Item[], 
  defaultIndustries: Item[], 
  defaultStages: Item[],
  defaultVcFirms: VCFirm[],
  setItems: {
    setRegionItems: (items: Item[]) => void;
    setIndustryItems: (items: Item[]) => void;
    setStageItems: (items: Item[]) => void;
    setVcFirms: (items: VCFirm[]) => void;
  }
) => {
  try {
    console.log("Loading data from Supabase...");
    
    // First make sure the tables exist
    const tablesExist = await createTablesIfNeeded();
    
    if (!tablesExist) {
      console.error("Tables don't exist and couldn't be created. Using default data.");
      setItems.setRegionItems(defaultRegions);
      setItems.setIndustryItems(defaultIndustries);
      setItems.setStageItems(defaultStages);
      setItems.setVcFirms(defaultVcFirms);
      return false;
    }
    
    // Check regions
    console.log("Loading regions...");
    try {
      const dbRegionsData = await regionService.getAllRegions();
      
      // If regions data exists in database, use it
      if (dbRegionsData && dbRegionsData.length > 0) {
        setItems.setRegionItems(dbRegionsData as Item[]);
        console.log("Loaded regions from database:", dbRegionsData);
      } else {
        // Otherwise initialize with default data
        await regionService.updateAllRegions(defaultRegions);
        setItems.setRegionItems(defaultRegions);
        console.log("Initialized regions with default data:", defaultRegions);
      }
    } catch (regionsError) {
      console.error('Error loading regions:', regionsError);
      setItems.setRegionItems(defaultRegions);
    }

    // Check industries
    console.log("Loading industries...");
    try {
      const dbIndustriesData = await industryService.getAllIndustries();
      
      // If industries data exists in database, use it
      if (dbIndustriesData && dbIndustriesData.length > 0) {
        setItems.setIndustryItems(dbIndustriesData as Item[]);
        console.log("Loaded industries from database:", dbIndustriesData);
      } else {
        // Otherwise initialize with default data
        await industryService.updateAllIndustries(defaultIndustries);
        setItems.setIndustryItems(defaultIndustries);
        console.log("Initialized industries with default data:", defaultIndustries);
      }
    } catch (industriesError) {
      console.error('Error loading industries:', industriesError);
      setItems.setIndustryItems(defaultIndustries);
    }

    // Check stages
    console.log("Loading stages...");
    try {
      const dbStagesData = await stageService.getAllStages();
      
      // If stages data exists in database, use it
      if (dbStagesData && dbStagesData.length > 0) {
        setItems.setStageItems(dbStagesData as Item[]);
        console.log("Loaded stages from database:", dbStagesData);
      } else {
        // Otherwise initialize with default data
        await stageService.updateAllStages(defaultStages);
        setItems.setStageItems(defaultStages);
        console.log("Initialized stages with default data:", defaultStages);
      }
    } catch (stagesError) {
      console.error('Error loading stages:', stagesError);
      setItems.setStageItems(defaultStages);
    }

    // Check VC firms
    console.log("Loading VC firms...");
    try {
      const dbVCFirmsData = await vcFirmService.getAllVCFirms();
      
      // If VC firms data exists in database, use it
      if (dbVCFirmsData && dbVCFirmsData.length > 0) {
        setItems.setVcFirms(dbVCFirmsData as VCFirm[]);
        console.log("Loaded VC firms from database:", dbVCFirmsData);
      } else {
        // Otherwise initialize with default data
        for (const firm of defaultVcFirms) {
          await vcFirmService.createVCFirm(firm);
        }
        setItems.setVcFirms(defaultVcFirms);
        console.log("Initialized VC firms with default data:", defaultVcFirms);
      }
    } catch (vcFirmsError) {
      console.error('Error loading VC firms:', vcFirmsError);
      setItems.setVcFirms(defaultVcFirms);
    }
    
    return true;
  } catch (error) {
    console.error('Error loading data from Supabase:', error);
    setItems.setRegionItems(defaultRegions);
    setItems.setIndustryItems(defaultIndustries);
    setItems.setStageItems(defaultStages);
    setItems.setVcFirms(defaultVcFirms);
    return false;
  }
};

// Function to update regions and save to database
export const updateRegionItems = async (items: Item[], isSupabaseConnected: boolean) => {
  if (!isSupabaseConnected) {
    console.log("Supabase not connected. Changes will only persist in memory.");
    return items;
  }
  
  try {
    console.log("Updating regions in database:", items);
    await regionService.updateAllRegions(items);
    
    toast({
      title: "Success",
      description: "Regions updated successfully and saved to database",
    });
    return items;
  } catch (error) {
    console.error('Error saving regions to database:', error);
    toast({
      title: "Error",
      description: `Failed to save regions to database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      variant: "destructive",
    });
    return items;
  }
};

// Function to update industries and save to database
export const updateIndustryItems = async (items: Item[], isSupabaseConnected: boolean) => {
  if (!isSupabaseConnected) {
    console.log("Supabase not connected. Changes will only persist in memory.");
    return items;
  }
  
  try {
    console.log("Updating industries in database:", items);
    await industryService.updateAllIndustries(items);
    
    toast({
      title: "Success",
      description: "Industries updated successfully and saved to database",
    });
    return items;
  } catch (error) {
    console.error('Error saving industries to database:', error);
    toast({
      title: "Error",
      description: `Failed to save industries to database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      variant: "destructive",
    });
    return items;
  }
};

// Function to update stages and save to database
export const updateStageItems = async (items: Item[], isSupabaseConnected: boolean) => {
  if (!isSupabaseConnected) {
    console.log("Supabase not connected. Changes will only persist in memory.");
    return items;
  }
  
  try {
    console.log("Updating stages in database:", items);
    await stageService.updateAllStages(items);
    
    toast({
      title: "Success",
      description: "Investment stages updated successfully and saved to database",
    });
    return items;
  } catch (error) {
    console.error('Error saving stages to database:', error);
    toast({
      title: "Error",
      description: `Failed to save stages to database: ${error instanceof Error ? error.message : 'Unknown error'}`,
      variant: "destructive",
    });
    return items;
  }
};
