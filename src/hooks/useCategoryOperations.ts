
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

  // Synchronous setters for data loading only
  const setRegionItems = (items: Item[]) => {
    setRegionItemsState(items);
  };

  const setIndustryItems = (items: Item[]) => {
    setIndustryItemsState(items);
  };

  const setStageItems = (items: Item[]) => {
    setStageItemsState(items);
  };

  // Individual region operations
  const createRegion = async (region: Item) => {
    try {
      const newRegion = await regionService.createRegion(region);
      setRegionItemsState([...regionItems, newRegion]);
      toast({
        title: "Success",
        description: "Region created successfully",
      });
    } catch (error) {
      console.error("Error creating region:", error);
      toast({
        title: "Error",
        description: "Failed to create region",
        variant: "destructive",
      });
    }
  };

  const updateRegion = async (region: Item) => {
    try {
      const updatedRegion = await regionService.updateRegion(region);
      setRegionItemsState(regionItems.map(r => r.id === region.id ? updatedRegion : r));
      toast({
        title: "Success",
        description: "Region updated successfully",
      });
    } catch (error) {
      console.error("Error updating region:", error);
      toast({
        title: "Error",
        description: "Failed to update region",
        variant: "destructive",
      });
    }
  };

  const deleteRegion = async (id: string) => {
    try {
      await regionService.deleteRegion(id);
      setRegionItemsState(regionItems.filter(r => r.id !== id));
      toast({
        title: "Success",
        description: "Region deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting region:", error);
      toast({
        title: "Error",
        description: "Failed to delete region",
        variant: "destructive",
      });
    }
  };

  // Individual industry operations
  const createIndustry = async (industry: Item) => {
    try {
      const newIndustry = await industryService.createIndustry(industry);
      setIndustryItemsState([...industryItems, newIndustry]);
      toast({
        title: "Success",
        description: "Industry created successfully",
      });
    } catch (error) {
      console.error("Error creating industry:", error);
      toast({
        title: "Error",
        description: "Failed to create industry",
        variant: "destructive",
      });
    }
  };

  const updateIndustry = async (industry: Item) => {
    try {
      const updatedIndustry = await industryService.updateIndustry(industry);
      setIndustryItemsState(industryItems.map(i => i.id === industry.id ? updatedIndustry : i));
      toast({
        title: "Success",
        description: "Industry updated successfully",
      });
    } catch (error) {
      console.error("Error updating industry:", error);
      toast({
        title: "Error",
        description: "Failed to update industry",
        variant: "destructive",
      });
    }
  };

  const deleteIndustry = async (id: string) => {
    try {
      await industryService.deleteIndustry(id);
      setIndustryItemsState(industryItems.filter(i => i.id !== id));
      toast({
        title: "Success",
        description: "Industry deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting industry:", error);
      toast({
        title: "Error",
        description: "Failed to delete industry",
        variant: "destructive",
      });
    }
  };

  // Individual stage operations
  const createStage = async (stage: Item) => {
    try {
      const newStage = await stageService.createStage(stage);
      setStageItemsState([...stageItems, newStage]);
      toast({
        title: "Success",
        description: "Investment stage created successfully",
      });
    } catch (error) {
      console.error("Error creating stage:", error);
      toast({
        title: "Error",
        description: "Failed to create investment stage",
        variant: "destructive",
      });
    }
  };

  const updateStage = async (stage: Item) => {
    try {
      const updatedStage = await stageService.updateStage(stage);
      setStageItemsState(stageItems.map(s => s.id === stage.id ? updatedStage : s));
      toast({
        title: "Success",
        description: "Investment stage updated successfully",
      });
    } catch (error) {
      console.error("Error updating stage:", error);
      toast({
        title: "Error",
        description: "Failed to update investment stage",
        variant: "destructive",
      });
    }
  };

  const deleteStage = async (id: string) => {
    try {
      await stageService.deleteStage(id);
      setStageItemsState(stageItems.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Investment stage deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting stage:", error);
      toast({
        title: "Error",
        description: "Failed to delete investment stage",
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
    setStageItems,
    createRegion,
    updateRegion,
    deleteRegion,
    createIndustry,
    updateIndustry,
    deleteIndustry,
    createStage,
    updateStage,
    deleteStage
  };
}
