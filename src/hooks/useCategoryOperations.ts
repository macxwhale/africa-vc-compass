
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { regionService, industryService, stageService } from "@/services/supabaseService";
import { Item } from "@/contexts/DataContext";

export function useCategoryOperations(initialData: {
  regionItems: Item[];
  industryItems: Item[];
  stageItems: Item[];
}) {
  const [regionItems, setRegionItemsState] = useState<Item[]>(initialData.regionItems);
  const [industryItems, setIndustryItemsState] = useState<Item[]>(initialData.industryItems);
  const [stageItems, setStageItemsState] = useState<Item[]>(initialData.stageItems);

  const regionNames = regionItems.map(item => item.name);
  const industryNames = industryItems.map(item => item.name);
  const stageNames = stageItems.map(item => item.name);

  const setRegionItems = async (items: Item[]) => {
    console.log("Setting region items:", items);
    
    try {
      await regionService.updateAllRegions(items);
      console.log("Regions saved to database");
      setRegionItemsState(items);
    } catch (error) {
      console.error("Error saving regions to database:", error);
      toast({
        title: "Error",
        description: "Failed to save regions to database",
        variant: "destructive",
      });
    }
  };

  const setIndustryItems = async (items: Item[]) => {
    console.log("Setting industry items:", items);
    
    try {
      await industryService.updateAllIndustries(items);
      console.log("Industries saved to database");
      setIndustryItemsState(items);
    } catch (error) {
      console.error("Error saving industries to database:", error);
      toast({
        title: "Error",
        description: "Failed to save industries to database",
        variant: "destructive",
      });
    }
  };

  const setStageItems = async (items: Item[]) => {
    console.log("Setting stage items:", items);
    
    try {
      await stageService.updateAllStages(items);
      console.log("Stages saved to database");
      setStageItemsState(items);
    } catch (error) {
      console.error("Error saving stages to database:", error);
      toast({
        title: "Error",
        description: "Failed to save stages to database",
        variant: "destructive",
      });
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
