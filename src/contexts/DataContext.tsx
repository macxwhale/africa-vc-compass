
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

  // Load data from localStorage on component mount
  useEffect(() => {
    // Try to get stored data from localStorage first
    const loadStoredItems = (key: string, initialItems: string[]) => {
      try {
        const storedItems = localStorage.getItem(key);
        if (storedItems) {
          return JSON.parse(storedItems);
        }
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
      }
      // Fall back to initial data if nothing in localStorage or error occurs
      return initialItems.map((name, index) => ({ id: `${key.toLowerCase()}-${index}`, name }));
    };

    setRegionItems(loadStoredItems('regions', initialRegions));
    setIndustryItems(loadStoredItems('industries', initialIndustries));
    setStageItems(loadStoredItems('stages', initialStages));

    // Try to load VC firms
    try {
      const storedVcFirms = localStorage.getItem('vcFirms');
      if (storedVcFirms) {
        setVcFirms(JSON.parse(storedVcFirms));
      }
    } catch (error) {
      console.error('Error loading VC firms from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Watch for changes in the state and update localStorage
  useEffect(() => {
    saveToLocalStorage('regions', regionItems);
  }, [regionItems]);

  useEffect(() => {
    saveToLocalStorage('industries', industryItems);
  }, [industryItems]);

  useEffect(() => {
    saveToLocalStorage('stages', stageItems);
  }, [stageItems]);

  useEffect(() => {
    saveToLocalStorage('vcFirms', vcFirms);
  }, [vcFirms]);

  return (
    <DataContext.Provider 
      value={{ 
        regionItems, 
        industryItems, 
        stageItems,
        vcFirms,
        setRegionItems, 
        setIndustryItems, 
        setStageItems,
        setVcFirms,
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
