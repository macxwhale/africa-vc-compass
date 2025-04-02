
import { createContext, useContext } from "react";
import { VCFirm } from "@/data/vcData";

// Type definitions
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

// Create the context with undefined as initial value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Hook for using the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export type { DataContextType, Item };
export { DataContext };
