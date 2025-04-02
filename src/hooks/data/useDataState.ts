
import { useState } from "react";
import { VCFirm } from "@/data/vcData";
import { Item } from "@/contexts/DataContext";

export interface DataState {
  vcFirms: VCFirm[];
  regionItems: Item[];
  industryItems: Item[];
  stageItems: Item[];
}

export function useDataState(initialData: DataState) {
  const [vcFirms, setVcFirmsState] = useState<VCFirm[]>(initialData.vcFirms);
  const [regionItems, setRegionItemsState] = useState<Item[]>(initialData.regionItems);
  const [industryItems, setIndustryItemsState] = useState<Item[]>(initialData.industryItems);
  const [stageItems, setStageItemsState] = useState<Item[]>(initialData.stageItems);

  // Derived data
  const regionNames = regionItems.map(item => item.name);
  const industryNames = industryItems.map(item => item.name);
  const stageNames = stageItems.map(item => item.name);

  return {
    // State
    vcFirms,
    regionItems,
    industryItems,
    stageItems,
    
    // State setters
    setVcFirmsState,
    setRegionItemsState,
    setIndustryItemsState,
    setStageItemsState,
    
    // Derived data
    regionNames,
    industryNames,
    stageNames,
  };
}
