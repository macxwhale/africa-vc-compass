
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { regionService, industryService, stageService } from "@/services/supabaseService";
import { Item } from "@/contexts/DataContext";

export function useCategoryOperations(
  initialData: {
    regionItems: Item[];
    industryItems: Item[];
    stageItems: Item[];
  },
  isSupabaseConnected: boolean
) {
  const [regionItems, setRegionItemsState] = useState<Item[]>(initialData.regionItems);
  const [industryItems, setIndustryItemsState] = useState<Item[]>(initialData.industryItems);
  const [stageItems, setStageItemsState] = useState<Item[]>(initialData.stageItems);

  const regionNames = regionItems.map(item => item.name);
  const industryNames = industryItems.map(item => item.name);
  const stageNames = stageItems.map(item => item.name);

  const setRegionItems = async (items: Item[]) => {
    console.log("Setting region items:", items);
    setRegionItemsState(items);
    
    if (isSupabaseConnected) {
      try {
        await regionService.updateAllRegions(items);
        console.log("Regions saved to database");
      } catch (error) {
        console.error("Error saving regions to database:", error);
        toast({
          title: "Error",
          description: "Failed to save regions to database",
          variant: "destructive",
        });
      }
    }
  };

  const setIndustryItems = async (items: Item[]) => {
    console.log("Setting industry items:", items);
    setIndustryItemsState(items);
    
    if (isSupabaseConnected) {
      try {
        await industryService.updateAllIndustries(items);
        console.log("Industries saved to database");
      } catch (error) {
        console.error("Error saving industries to database:", error);
        toast({
          title: "Error",
          description: "Failed to save industries to database",
          variant: "destructive",
        });
      }
    }
  };

  const setStageItems = async (items: Item[]) => {
    console.log("Setting stage items:", items);
    setStageItemsState(items);
    
    if (isSupabaseConnected) {
      try {
        await stageService.updateAllStages(items);
        console.log("Stages saved to database");
      } catch (error) {
        console.error("Error saving stages to database:", error);
        toast({
          title: "Error",
          description: "Failed to save stages to database",
          variant: "destructive",
        });
      }
    }
  };

  return {
    regionItems,
    industryItems,
    stageItems,
    regionNames,
    industryNames,
    stageNames,
    setRegionItems,
    setIndustryItems,
    setStageItems
  };
}
