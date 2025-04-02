
import { Item } from "@/contexts/DataContext";
import { toast } from "@/hooks/use-toast";
import { regionService, industryService, stageService } from "@/services/supabaseService";

export function useTaxonomyOperations(
  setRegionItemsState: (items: Item[]) => void,
  setIndustryItemsState: (items: Item[]) => void,
  setStageItemsState: (items: Item[]) => void,
  isSupabaseConnected: boolean
) {
  const setRegionItems = async (items: Item[]) => {
    console.log("Setting region items:", items);
    setRegionItemsState(items);
    
    if (isSupabaseConnected) {
      try {
        await regionService.updateAllRegions(items);
        console.log("Regions saved to database");
        toast({
          title: "Success",
          description: "Regions updated successfully and saved to database",
        });
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
        toast({
          title: "Success",
          description: "Industries updated successfully and saved to database",
        });
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
        toast({
          title: "Success",
          description: "Investment stages updated successfully and saved to database",
        });
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
    setRegionItems,
    setIndustryItems,
    setStageItems
  };
}
