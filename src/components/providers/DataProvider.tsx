import { ReactNode, useMemo, useEffect, useState } from "react";
import { DataContext } from "@/contexts/DataContext";
import { industries, stages, regions, vcFirms as defaultVcFirms } from "@/data";
import { useDatabaseInitialization } from "@/hooks/useDatabaseInitialization";
import { useDataOperations } from "@/hooks/useDataOperations";
import { Item } from "@/contexts/DataContext";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Only show loading state once
  const [showLoading, setShowLoading] = useState(true);
  
  // Create default data objects - fix the initialization order
  const defaultRegions = useMemo(() => 
    regions.map((name, index) => ({ id: `region-${index}`, name })), []);
  
  const defaultIndustries = useMemo(() => 
    industries.map((name, index) => ({ id: `industry-${index}`, name })), []);
  
  const defaultStages = useMemo(() => 
    stages.map((name, index) => ({ id: `stage-${index}`, name })), []);
  
  // Rename the variable to avoid the reference before initialization error
  const initialVcFirms = useMemo(() => defaultVcFirms, []);

  // Create initial state for the data operations
  const initialData = useMemo(() => ({
    regionItems: defaultRegions,
    industryItems: defaultIndustries,
    stageItems: defaultStages,
    vcFirms: initialVcFirms
  }), [defaultRegions, defaultIndustries, defaultStages, initialVcFirms]);

  // Initialize database and connection
  const { isLoading, isSupabaseConnected } = useDatabaseInitialization(
    {
      regions: defaultRegions,
      industries: defaultIndustries,
      stages: defaultStages,
      vcFirms: defaultVcFirms
    }
  );

  // Initialize data operations with the isSupabaseConnected flag
  const {
    vcFirms: operationVcFirms,
    regionItems,
    industryItems,
    stageItems,
    pendingVCFirms,
    setVcFirms,
    setRegionItems, 
    setIndustryItems,
    setStageItems,
    regionNames,
    industryNames,
    stageNames,
    getVCsByIndustry,
    getVCsByRegion,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    submitVCFirm,
    approveVCFirm,
    rejectVCFirm
  } = useDataOperations(initialData, isSupabaseConnected);

  // Hide loading state after first load
  useEffect(() => {
    if (!isLoading && showLoading) {
      setShowLoading(false);
    }
  }, [isLoading, showLoading]);

  // Output the connection status for debugging - only once
  useEffect(() => {
    console.log("DataProvider - isSupabaseConnected:", isSupabaseConnected);
  }, [isSupabaseConnected]);

  return (
    <DataContext.Provider 
      value={{ 
        regionItems, 
        industryItems, 
        stageItems,
        vcFirms: operationVcFirms,
        pendingVCFirms,
        setRegionItems, 
        setIndustryItems, 
        setStageItems,
        setVcFirms,
        regionNames,
        industryNames,
        stageNames,
        getVCsByIndustry,
        getVCsByRegion,
        isSupabaseConnected,
        addVCFirm,
        updateVCFirm,
        deleteVCFirm,
        submitVCFirm,
        approveVCFirm,
        rejectVCFirm
      }}
    >
      {showLoading && isLoading ? <div>Loading data...</div> : children}
    </DataContext.Provider>
  );
};

// Export the provider for use in App.tsx
export default DataProvider;
