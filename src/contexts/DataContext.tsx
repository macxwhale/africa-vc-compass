
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { industries, stages, regions } from "@/data/vcData";

interface Item {
  id: string;
  name: string;
}

interface DataContextType {
  regionItems: Item[];
  industryItems: Item[];
  stageItems: Item[];
  setRegionItems: (items: Item[]) => void;
  setIndustryItems: (items: Item[]) => void;
  setStageItems: (items: Item[]) => void;
  regionNames: string[];
  industryNames: string[];
  stageNames: string[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [regionItems, setRegionItems] = useState<Item[]>([]);
  const [industryItems, setIndustryItems] = useState<Item[]>([]);
  const [stageItems, setStageItems] = useState<Item[]>([]);

  // Derived data - just the names as string arrays for the filters
  const regionNames = regionItems.map(item => item.name);
  const industryNames = industryItems.map(item => item.name);
  const stageNames = stageItems.map(item => item.name);

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
        setRegionItems, 
        setIndustryItems, 
        setStageItems,
        regionNames,
        industryNames,
        stageNames
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
