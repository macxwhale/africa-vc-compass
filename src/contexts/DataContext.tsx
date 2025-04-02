
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms, VCFirm } from "@/data/vcData";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [regionItems, setRegionItems] = useState<Item[]>([]);
  const [industryItems, setIndustryItems] = useState<Item[]>([]);
  const [stageItems, setStageItems] = useState<Item[]>([]);
  const [vcFirms, setVcFirms] = useState<VCFirm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Initialize tables if they don't exist yet
  const initializeTablesIfNeeded = async () => {
    setIsLoading(true);
    try {
      // Check if tables have data
      const { data: regionsData, error: regionsError } = await supabase
        .from('regions')
        .select('*');
      
      if (regionsError) {
        console.error('Error checking regions:', regionsError);
      }

      // If no regions data, initialize with default data
      if (!regionsData || regionsData.length === 0) {
        const defaultRegions = initialRegions.map((name, index) => ({ 
          id: `region-${index}`, 
          name 
        }));
        await supabase.from('regions').insert(defaultRegions);
        setRegionItems(defaultRegions);
      } else {
        setRegionItems(regionsData as Item[]);
      }

      // Check industries
      const { data: industriesData, error: industriesError } = await supabase
        .from('industries')
        .select('*');
      
      if (industriesError) {
        console.error('Error checking industries:', industriesError);
      }

      // If no industries data, initialize with default data
      if (!industriesData || industriesData.length === 0) {
        const defaultIndustries = initialIndustries.map((name, index) => ({ 
          id: `industry-${index}`, 
          name 
        }));
        await supabase.from('industries').insert(defaultIndustries);
        setIndustryItems(defaultIndustries);
      } else {
        setIndustryItems(industriesData as Item[]);
      }

      // Check stages
      const { data: stagesData, error: stagesError } = await supabase
        .from('stages')
        .select('*');
      
      if (stagesError) {
        console.error('Error checking stages:', stagesError);
      }

      // If no stages data, initialize with default data
      if (!stagesData || stagesData.length === 0) {
        const defaultStages = initialStages.map((name, index) => ({ 
          id: `stage-${index}`, 
          name 
        }));
        await supabase.from('stages').insert(defaultStages);
        setStageItems(defaultStages);
      } else {
        setStageItems(stagesData as Item[]);
      }

      // Check VC firms
      const { data: vcFirmsData, error: vcFirmsError } = await supabase
        .from('vc_firms')
        .select('*');
      
      if (vcFirmsError) {
        console.error('Error checking VC firms:', vcFirmsError);
      }

      // If no VC firms data, initialize with default data
      if (!vcFirmsData || vcFirmsData.length === 0) {
        await supabase.from('vc_firms').insert(initialVcFirms);
        setVcFirms(initialVcFirms);
      } else {
        setVcFirms(vcFirmsData as VCFirm[]);
      }
    } catch (error) {
      console.error('Error initializing database:', error);
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
        getVCsByRegion
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
