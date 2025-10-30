
import { ReactNode, useMemo, useEffect, useState } from "react";
import { DataContext } from "@/contexts/DataContext";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms } from "@/data/vcData";
import { useDatabaseInitialization } from "@/hooks/useDatabaseInitialization";
import { useDataOperations } from "@/hooks/useDataOperations";
import { Item } from "@/contexts/DataContext";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Step 2: Create default data objects with robust, content-based IDs
  const defaultRegions = useMemo(() => 
    initialRegions.map((name, index) => ({ 
      id: `region-${name.toLowerCase().replace(/\s+/g, '-')}-${index}`, 
      name 
    })), []);
  
  const defaultIndustries = useMemo(() => 
    initialIndustries.map((name, index) => ({ 
      id: `industry-${name.toLowerCase().replace(/\s+/g, '-')}-${index}`, 
      name 
    })), []);
  
  const defaultStages = useMemo(() => 
    initialStages.map((name, index) => ({ 
      id: `stage-${name.toLowerCase().replace(/\s+/g, '-')}-${index}`, 
      name 
    })), []);
  
  const defaultVcFirms = useMemo(() => initialVcFirms, []);

  // Create initial state for the data operations
  const initialData = useMemo(() => ({
    regionItems: defaultRegions,
    industryItems: defaultIndustries,
    stageItems: defaultStages,
    vcFirms: defaultVcFirms
  }), [defaultRegions, defaultIndustries, defaultStages, defaultVcFirms]);

  // Initialize database and connection
  const { isLoading } = useDatabaseInitialization(
    {
      regions: defaultRegions,
      industries: defaultIndustries,
      stages: defaultStages,
      vcFirms: defaultVcFirms
    }
  );

  // Initialize data operations
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
    createRegion,
    updateRegion,
    deleteRegion,
    createIndustry,
    updateIndustry,
    deleteIndustry,
    createStage,
    updateStage,
    deleteStage,
    getVCsByIndustry,
    getVCsByRegion,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    submitVCFirm,
    approveVCFirm,
    rejectVCFirm
  } = useDataOperations(initialData);

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
        createRegion,
        updateRegion,
        deleteRegion,
        createIndustry,
        updateIndustry,
        deleteIndustry,
        createStage,
        updateStage,
        deleteStage,
        getVCsByIndustry,
        getVCsByRegion,
        addVCFirm,
        updateVCFirm,
        deleteVCFirm,
        submitVCFirm,
        approveVCFirm,
        rejectVCFirm
      }}
    >
      {isLoading ? <div>Loading data...</div> : children}
    </DataContext.Provider>
  );
};

// Export the provider for use in App.tsx
export default DataProvider;
