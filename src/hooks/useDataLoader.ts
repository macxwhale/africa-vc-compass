
import { useEffect, useRef } from "react";
import { vcFirmService, regionService, industryService, stageService, pendingVCFirmService } from "@/services/supabaseService";
import { PendingVCFirm } from "@/types/vcTypes";
import { VCFirm } from "@/data/vcData";
import { Item } from "@/contexts/DataContext";

export function useDataLoader(setters: {
  setVcFirms: (firms: VCFirm[]) => Promise<void>;
  setRegionItems: (items: Item[]) => Promise<void>;
  setIndustryItems: (items: Item[]) => Promise<void>;
  setStageItems: (items: Item[]) => Promise<void>;
  setPendingVCFirms: (firms: PendingVCFirm[]) => void;
}) {
  const { setVcFirms, setRegionItems, setIndustryItems, setStageItems, setPendingVCFirms } = setters;
  const dataLoadedRef = useRef(false);
  
  useEffect(() => {
    const loadDataFromCloud = async () => {
      // Step 5: Enhanced data loading with verification
      if (!dataLoadedRef.current) {
        dataLoadedRef.current = true;
        try {
          console.log("Step 5: Loading data from Lovable Cloud...");
          
          const dbRegions = await regionService.getAllRegions();
          console.log(`Loaded ${dbRegions?.length || 0} regions from database`);
          if (dbRegions && dbRegions.length > 0) {
            await setRegionItems(dbRegions as Item[]);
          }
          
          const dbIndustries = await industryService.getAllIndustries();
          console.log(`Loaded ${dbIndustries?.length || 0} industries from database`);
          if (dbIndustries && dbIndustries.length > 0) {
            await setIndustryItems(dbIndustries as Item[]);
          }
          
          const dbStages = await stageService.getAllStages();
          console.log(`Loaded ${dbStages?.length || 0} stages from database`);
          if (dbStages && dbStages.length > 0) {
            await setStageItems(dbStages as Item[]);
          }
          
          const dbVCFirms = await vcFirmService.getAllVCFirms();
          console.log(`Loaded ${dbVCFirms?.length || 0} VC firms from database`);
          if (dbVCFirms && dbVCFirms.length > 0) {
            await setVcFirms(dbVCFirms);
          }
          
          const dbPendingVCFirms = await pendingVCFirmService.getAllPendingVCFirms();
          console.log(`Loaded ${dbPendingVCFirms?.length || 0} pending VC firms from database`);
          if (dbPendingVCFirms && dbPendingVCFirms.length > 0) {
            setPendingVCFirms(dbPendingVCFirms);
          }
          
          console.log("Step 5: Data loading complete from Lovable Cloud");
        } catch (error) {
          console.error("Step 5: Critical error loading data from Lovable Cloud:", error);
        }
      }
    };
    
    loadDataFromCloud();
  }, [setVcFirms, setRegionItems, setIndustryItems, setStageItems, setPendingVCFirms]);
}
