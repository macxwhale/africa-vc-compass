
import { ReactNode, useMemo, useEffect, useState } from "react";
import { DataContext } from "@/contexts/DataContext";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms } from "@/data/vcData";
import { useDatabaseInitialization } from "@/hooks/useDatabaseInitialization";
import { useDataOperations } from "@/hooks/useDataOperations";
import { Item } from "@/contexts/DataContext";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Only show loading state once
  const [showLoading, setShowLoading] = useState(true);
  
  // Create default data objects
  const defaultRegions = useMemo(() => 
    initialRegions.map((name, index) => ({ id: `region-${index}`, name })), []);
  
  const defaultIndustries = useMemo(() => 
    initialIndustries.map((name, index) => ({ id: `industry-${index}`, name })), []);
  
  const defaultStages = useMemo(() => 
    initialStages.map((name, index) => ({ id: `stage-${index}`, name })), []);
  
  const defaultVcFirms = useMemo(() => initialVcFirms, []);

  // Create initial state for the data operations
  const initialData = useMemo(() => ({
    regionItems: defaultRegions,
    industryItems: defaultIndustries,
    stageItems: defaultStages,
    vcFirms: defaultVcFirms
  }), [defaultRegions, defaultIndustries, defaultStages, defaultVcFirms]);

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
    vcFirms,
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
        vcFirms,
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
