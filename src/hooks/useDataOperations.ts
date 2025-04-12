
import { useState } from "react";
import { VCFirm } from "@/data/vcData";
import { Item } from "@/contexts/DataContext";
import { PendingVCFirm, DataOperationsInitialData } from "@/types/vcTypes";
import { useVCFirmOperations } from "./useVCFirmOperations";
import { useCategoryOperations } from "./useCategoryOperations";
import { usePendingVCFirmOperations } from "./usePendingVCFirmOperations";
import { useDataLoader } from "./useDataLoader";

export type { PendingVCFirm } from "@/types/vcTypes";

export function useDataOperations(
  initialData: DataOperationsInitialData,
  isSupabaseConnected: boolean
) {
  // Use the hook for VC firm operations
  const {
    vcFirms,
    setVcFirms,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    getVCsByIndustry,
    getVCsByRegion
  } = useVCFirmOperations(initialData.vcFirms, isSupabaseConnected);

  // Use the hook for category operations
  const {
    regionItems,
    industryItems,
    stageItems,
    regionNames,
    industryNames,
    stageNames,
    setRegionItems,
    setIndustryItems,
    setStageItems
  } = useCategoryOperations({
    regionItems: initialData.regionItems,
    industryItems: initialData.industryItems,
    stageItems: initialData.stageItems
  }, isSupabaseConnected);

  // Helper function to update VC firms for the pending operations hook
  const updateVCFirmsState = (newFirm: VCFirm) => {
    setVcFirms([...vcFirms, newFirm]);
  };

  // Use the hook for pending VC firm operations
  const {
    pendingVCFirms,
    setPendingVCFirms,
    submitVCFirm,
    approveVCFirm,
    rejectVCFirm
  } = usePendingVCFirmOperations(isSupabaseConnected, updateVCFirmsState);

  // Use the data loader hook to load data from Supabase
  useDataLoader(isSupabaseConnected, {
    setVcFirms,
    setRegionItems,
    setIndustryItems,
    setStageItems,
    setPendingVCFirms
  });

  return {
    vcFirms,
    regionItems,
    industryItems,
    stageItems,
    pendingVCFirms,
    
    regionNames,
    industryNames,
    stageNames,
    
    setVcFirms,
    setRegionItems,
    setIndustryItems,
    setStageItems,
    
    getVCsByIndustry,
    getVCsByRegion,
    
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    
    submitVCFirm,
    approveVCFirm,
    rejectVCFirm
  };
}
