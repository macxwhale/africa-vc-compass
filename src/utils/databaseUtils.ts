
import { supabase, isSupabaseConfigured, executeSQL } from "@/services/supabaseService";
import { Item } from "@/contexts/DataContext";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";

// Function to check if tables exist and create them if they don't
export const createTablesIfNeeded = async () => {
  if (!isSupabaseConfigured) return false;

  try {
    // Generate the SQL to create tables
    const createTableSQL = `
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
    `;
    
    console.log("Attempting to create tables with SQL:", createTableSQL);
    
    // Try to execute the SQL directly using custom functions
    const { error } = await executeSQL(createTableSQL);
    
    if (error) {
      console.error('Error creating tables:', error);
      // Try an alternative approach - check if we can query any existing table
      const { data, error: queryError } = await supabase
        .from('regions')
        .select('count');
      
      if (queryError) {
        console.error('Tables need to be created manually in Supabase dashboard:', queryError.message);
        // Show the SQL in the console for manual execution
        console.log(`
          To create the necessary tables in Supabase, go to the SQL Editor in your Supabase dashboard and run the following SQL:
          
          ${createTableSQL}
        `);
        return false;
      }
    }
    
    // Verify that tables were created successfully
    const { data, error: verifyError } = await supabase
      .from('regions')
      .select('count');
    
    if (verifyError) {
      console.error('Tables were not created successfully:', verifyError);
      return false;
    }
    
    console.log('Tables created or already exist!');
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
    
  } catch (error) {
    console.error('Error initializing database with default data:', error);
    throw error;
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
    // Check regions
    const { data: dbRegionsData, error: regionsError } = await supabase
      .from('regions')
      .select('*');
    
    if (regionsError) {
      console.error('Error checking regions:', regionsError);
    }

    // If regions data exists in database, use it
    if (dbRegionsData && dbRegionsData.length > 0) {
      setItems.setRegionItems(dbRegionsData as Item[]);
    } else {
      // Otherwise initialize with default data
      await supabase.from('regions').insert(defaultRegions);
      setItems.setRegionItems(defaultRegions);
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
      setItems.setIndustryItems(dbIndustriesData as Item[]);
    } else {
      // Otherwise initialize with default data
      await supabase.from('industries').insert(defaultIndustries);
      setItems.setIndustryItems(defaultIndustries);
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
      setItems.setStageItems(dbStagesData as Item[]);
    } else {
      // Otherwise initialize with default data
      await supabase.from('stages').insert(defaultStages);
      setItems.setStageItems(defaultStages);
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
      setItems.setVcFirms(dbVCFirmsData as VCFirm[]);
    } else {
      // Otherwise initialize with default data
      await supabase.from('vc_firms').insert(defaultVcFirms);
      setItems.setVcFirms(defaultVcFirms);
    }
  } catch (error) {
    console.error('Error loading data from Supabase:', error);
    throw error;
  }
};

// Function to update regions and save to database
export const updateRegionItems = async (items: Item[], isSupabaseConnected: boolean) => {
  if (!isSupabaseConnected) {
    console.log("Supabase not connected. Changes will only persist in memory.");
    return items;
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
