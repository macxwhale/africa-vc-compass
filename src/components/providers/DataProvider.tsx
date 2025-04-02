
import { ReactNode, useMemo } from "react";
import { DataContext } from "@/contexts/DataContext";
import { industries as initialIndustries, stages as initialStages, regions as initialRegions, vcFirms as initialVcFirms } from "@/data/vcData";
import { useDatabaseInitialization } from "@/hooks/useDatabaseInitialization";
import { useDataOperations } from "@/hooks/useDataOperations";
import { Item } from "@/contexts/DataContext";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Create default data objects
  const defaultRegions = useMemo(() => 
    initialRegions.map((name, index) => ({ id: `region-${index}`, name })), []);
  
  const defaultIndustries = useMemo(() => 
    initialIndustries.map((name, index) => ({ id: `industry-${index}`, name })), []);
  
  const defaultStages = useMemo(() => 
    initialStages.map((name, index) => ({ id: `stage-${index}`, name })), []);
  
  const defaultVcFirms = useMemo(() => initialVcFirms, []);

  // Create initial state for the data operations
  const initialData = {
    regionItems: defaultRegions,
    industryItems: defaultIndustries,
    stageItems: defaultStages,
    vcFirms: defaultVcFirms
  };

  // Initialize data operations (this is where the state is managed)
  const {
    vcFirms,
    regionItems,
    industryItems,
    stageItems,
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
    deleteVCFirm
  } = useDataOperations(initialData, false); // Initially false, updated after initialization

  // Create a setter object for database initialization
  const setters = {
    setRegionItems,
    setIndustryItems,
    setStageItems,
    setVcFirms
  };

  // Initialize database and connection
  const { isLoading, isSupabaseConnected } = useDatabaseInitialization(
    {
      regions: defaultRegions,
      industries: defaultIndustries,
      stages: defaultStages,
      vcFirms: defaultVcFirms
    },
    setters
  );

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
        getVCsByRegion,
        isSupabaseConnected,
        addVCFirm,
        updateVCFirm,
        deleteVCFirm
      }}
    >
      {isLoading ? <div>Loading data...</div> : children}
    </DataContext.Provider>
  );
};

// Export the provider for use in App.tsx
export default DataProvider;
