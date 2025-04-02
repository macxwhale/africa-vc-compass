
import { useDataState } from "./data/useDataState";
import { useVCFirmOperations } from "./data/useVCFirmOperations";
import { useTaxonomyOperations } from "./data/useTaxonomyOperations";
import { useDataLoading } from "./data/useDataLoading";
import { VCFirm } from "@/data/vcData";
import { Item } from "@/contexts/DataContext";

export function useDataOperations(
  initialData: {
    vcFirms: VCFirm[],
    regionItems: Item[],
    industryItems: Item[],
    stageItems: Item[],
  },
  isSupabaseConnected: boolean
) {
  // Initialize data state
  const {
    vcFirms,
    regionItems,
    industryItems,
    stageItems,
    setVcFirmsState,
    setRegionItemsState,
    setIndustryItemsState,
    setStageItemsState,
    regionNames,
    industryNames,
    stageNames
  } = useDataState(initialData);

  // Load data from Supabase
  useDataLoading(
    initialData,
    isSupabaseConnected,
    setRegionItemsState,
    setIndustryItemsState,
    setStageItemsState,
    setVcFirmsState
  );

  // Initialize VC firm operations
  const {
    getVCsByIndustry,
    getVCsByRegion,
    setVcFirms,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm
  } = useVCFirmOperations(vcFirms, setVcFirmsState, isSupabaseConnected);

  // Initialize taxonomy operations
  const {
    setRegionItems,
    setIndustryItems,
    setStageItems
  } = useTaxonomyOperations(
    setRegionItemsState,
    setIndustryItemsState,
    setStageItemsState,
    isSupabaseConnected
  );

  return {
    // State
    vcFirms,
    regionItems,
    industryItems,
    stageItems,
    
    // Derived data
    regionNames,
    industryNames,
    stageNames,
    
    // VC firm operations
    setVcFirms,
    getVCsByIndustry,
    getVCsByRegion,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    
    // Taxonomy operations
    setRegionItems,
    setIndustryItems,
    setStageItems
  };
}
