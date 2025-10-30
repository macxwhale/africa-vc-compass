
import { createContext, useContext } from "react";
import { VCFirm } from "@/data/vcData";
import { PendingVCFirm } from "@/hooks/useDataOperations";

export interface Item {
  id: string;
  name: string;
}

interface DataContextType {
  vcFirms: VCFirm[];
  regionItems: Item[];
  industryItems: Item[];
  stageItems: Item[];
  pendingVCFirms: PendingVCFirm[];
  
  regionNames: string[];
  industryNames: string[];
  stageNames: string[];
  
  setVcFirms: (firms: VCFirm[]) => Promise<void>;
  setRegionItems: (items: Item[]) => Promise<void>;
  setIndustryItems: (items: Item[]) => Promise<void>;
  setStageItems: (items: Item[]) => Promise<void>;
  
  getVCsByIndustry: (industry: string, limit?: number) => VCFirm[];
  getVCsByRegion: (region: string, limit?: number) => VCFirm[];
  
  addVCFirm: (firm: VCFirm) => Promise<void>;
  updateVCFirm: (firm: VCFirm) => Promise<void>;
  deleteVCFirm: (id: string) => Promise<void>;
  
  submitVCFirm: (firm: Omit<VCFirm, "id">) => Promise<PendingVCFirm | undefined>;
  approveVCFirm: (firm: PendingVCFirm) => Promise<void>;
  rejectVCFirm: (firm: PendingVCFirm, notes?: string) => Promise<void>;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
