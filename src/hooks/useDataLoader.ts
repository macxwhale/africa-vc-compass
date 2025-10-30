
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
      if (!dataLoadedRef.current) {
        dataLoadedRef.current = true;
        try {
          console.log("Loading data from Lovable Cloud...");
          
          const dbRegions = await regionService.getAllRegions();
          if (dbRegions && dbRegions.length > 0) {
            console.log("Loaded regions from database:", dbRegions);
            await setRegionItems(dbRegions as Item[]);
          }
          
          const dbIndustries = await industryService.getAllIndustries();
          if (dbIndustries && dbIndustries.length > 0) {
            console.log("Loaded industries from database:", dbIndustries);
            await setIndustryItems(dbIndustries as Item[]);
          }
          
          const dbStages = await stageService.getAllStages();
          if (dbStages && dbStages.length > 0) {
            console.log("Loaded stages from database:", dbStages);
            await setStageItems(dbStages as Item[]);
          }
          
          const dbVCFirms = await vcFirmService.getAllVCFirms();
          if (dbVCFirms && dbVCFirms.length > 0) {
            console.log("Loaded VC firms from database:", dbVCFirms);
            await setVcFirms(dbVCFirms);
          }
          
          const dbPendingVCFirms = await pendingVCFirmService.getAllPendingVCFirms();
          if (dbPendingVCFirms && dbPendingVCFirms.length > 0) {
            console.log("Loaded pending VC firms from database:", dbPendingVCFirms);
            setPendingVCFirms(dbPendingVCFirms);
          }
        } catch (error) {
          console.error("Error loading data from Lovable Cloud:", error);
        }
      }
    };
    
    loadDataFromCloud();
  }, [setVcFirms, setRegionItems, setIndustryItems, setStageItems, setPendingVCFirms]);
}
