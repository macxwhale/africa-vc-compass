
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { industries, stages, regions, vcFirms as initialVcFirms, VCFirm } from "@/data/vcData";

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

  // Initialize data on component mount
  useEffect(() => {
    // Convert string arrays to Item arrays with IDs
    setRegionItems(regions.map((name, index) => ({ id: `region-${index}`, name })));
    setIndustryItems(industries.map((name, index) => ({ id: `industry-${index}`, name })));
    setStageItems(stages.map((name, index) => ({ id: `stage-${index}`, name })));
  }, []);

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
