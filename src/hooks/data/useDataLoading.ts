
import { useEffect } from "react";
import { VCFirm } from "@/data/vcData";
import { Item } from "@/contexts/DataContext";
import { toast } from "@/hooks/use-toast";
import { 
  regionService, 
  industryService, 
  stageService, 
  vcFirmService 
} from "@/services/supabaseService";

export function useDataLoading(
  initialData: {
    vcFirms: VCFirm[],
    regionItems: Item[],
    industryItems: Item[],
    stageItems: Item[],
  },
  isSupabaseConnected: boolean,
  setRegionItemsState: (items: Item[]) => void,
  setIndustryItemsState: (items: Item[]) => void,
  setStageItemsState: (items: Item[]) => void,
  setVcFirmsState: (firms: VCFirm[]) => void
) {
  useEffect(() => {
    const loadDataFromSupabase = async () => {
      if (isSupabaseConnected) {
        try {
          console.log("Loading data from Supabase...");
          
          const dbRegions = await regionService.getAllRegions();
          if (dbRegions && dbRegions.length > 0) {
            console.log("Loaded regions from database:", dbRegions);
            setRegionItemsState(dbRegions as Item[]);
          }
          
          const dbIndustries = await industryService.getAllIndustries();
          if (dbIndustries && dbIndustries.length > 0) {
            console.log("Loaded industries from database:", dbIndustries);
            setIndustryItemsState(dbIndustries as Item[]);
          }
          
          const dbStages = await stageService.getAllStages();
          if (dbStages && dbStages.length > 0) {
            console.log("Loaded stages from database:", dbStages);
            setStageItemsState(dbStages as Item[]);
          }
          
          const dbVCFirms = await vcFirmService.getAllVCFirms();
          if (dbVCFirms && dbVCFirms.length > 0) {
            console.log("Loaded VC firms from database:", dbVCFirms);
            setVcFirmsState(dbVCFirms as VCFirm[]);
          }
          
          toast({
            title: "Data Loaded",
            description: "Data successfully loaded from Supabase",
          });
        } catch (error) {
          console.error("Error loading data from Supabase:", error);
          toast({
            title: "Data Load Error",
            description: "Error loading data from Supabase. Using local data.",
            variant: "destructive",
          });
        }
      }
    };
    
    loadDataFromSupabase();
  }, [isSupabaseConnected, setRegionItemsState, setIndustryItemsState, setStageItemsState, setVcFirmsState]);
}
