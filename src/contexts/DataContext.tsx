
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms, VCFirm } from "@/data/vcData";

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

const DATA_STORAGE_KEY = {
  REGIONS: 'africa_vc_regions',
  INDUSTRIES: 'africa_vc_industries',
  STAGES: 'africa_vc_stages',
  VC_FIRMS: 'africa_vc_firms'
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [regionItems, setRegionItems] = useState<Item[]>([]);
  const [industryItems, setIndustryItems] = useState<Item[]>([]);
  const [stageItems, setStageItems] = useState<Item[]>([]);
  const [vcFirms, setVcFirms] = useState<VCFirm[]>(initialVcFirms);

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

  // Save data to localStorage function
  const saveToLocalStorage = <T,>(key: string, data: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Load data from localStorage function
  const loadFromLocalStorage = <T,>(key: string, defaultData: T): T => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        return JSON.parse(storedData) as T;
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
    return defaultData;
  };

  // Set regions with persistence
  const setPersistentRegionItems = (items: Item[]) => {
    setRegionItems(items);
    saveToLocalStorage(DATA_STORAGE_KEY.REGIONS, items);
  };

  // Set industries with persistence
  const setPersistentIndustryItems = (items: Item[]) => {
    setIndustryItems(items);
    saveToLocalStorage(DATA_STORAGE_KEY.INDUSTRIES, items);
  };

  // Set stages with persistence
  const setPersistentStageItems = (items: Item[]) => {
    setStageItems(items);
    saveToLocalStorage(DATA_STORAGE_KEY.STAGES, items);
  };

  // Set VC firms with persistence
  const setPersistentVcFirms = (firms: VCFirm[]) => {
    setVcFirms(firms);
    saveToLocalStorage(DATA_STORAGE_KEY.VC_FIRMS, firms);
  };

  // Load all data on component mount
  useEffect(() => {
    // Initialize regions
    const storedRegions = loadFromLocalStorage<Item[]>(
      DATA_STORAGE_KEY.REGIONS, 
      initialRegions.map((name, index) => ({ id: `region-${index}`, name }))
    );
    setRegionItems(storedRegions);

    // Initialize industries
    const storedIndustries = loadFromLocalStorage<Item[]>(
      DATA_STORAGE_KEY.INDUSTRIES, 
      initialIndustries.map((name, index) => ({ id: `industry-${index}`, name }))
    );
    setIndustryItems(storedIndustries);

    // Initialize stages
    const storedStages = loadFromLocalStorage<Item[]>(
      DATA_STORAGE_KEY.STAGES, 
      initialStages.map((name, index) => ({ id: `stage-${index}`, name }))
    );
    setStageItems(storedStages);

    // Initialize VC firms
    const storedVcFirms = loadFromLocalStorage<VCFirm[]>(
      DATA_STORAGE_KEY.VC_FIRMS, 
      initialVcFirms
    );
    setVcFirms(storedVcFirms);
  }, []);

  return (
    <DataContext.Provider 
      value={{ 
        regionItems, 
        industryItems, 
        stageItems,
        vcFirms,
        setRegionItems: setPersistentRegionItems, 
        setIndustryItems: setPersistentIndustryItems, 
        setStageItems: setPersistentStageItems,
        setVcFirms: setPersistentVcFirms,
        regionNames,
        industryNames,
        stageNames,
        getVCsByIndustry,
        getVCsByRegion
      }}
    >
      {children}
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
