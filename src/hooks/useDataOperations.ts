
import { useState, useEffect } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/services/supabaseService";
import { vcFirmService, regionService, industryService, stageService } from "@/services/supabaseService";
import { Item } from "@/contexts/DataContext";
import { updateRegionItems, updateIndustryItems, updateStageItems } from "@/utils/databaseUtils";

export function useDataOperations(
  initialData: {
    vcFirms: VCFirm[],
    regionItems: Item[],
    industryItems: Item[],
    stageItems: Item[],
  },
  isSupabaseConnected: boolean
) {
  const [vcFirms, setVcFirmsState] = useState<VCFirm[]>(initialData.vcFirms);
  const [regionItems, setRegionItemsState] = useState<Item[]>(initialData.regionItems);
  const [industryItems, setIndustryItemsState] = useState<Item[]>(initialData.industryItems);
  const [stageItems, setStageItemsState] = useState<Item[]>(initialData.stageItems);

  // Load data from Supabase if connected
  useEffect(() => {
    const loadDataFromSupabase = async () => {
      if (isSupabaseConnected) {
        try {
          console.log("Loading data from Supabase...");
          
          // Load regions
          const dbRegions = await regionService.getAllRegions();
          if (dbRegions && dbRegions.length > 0) {
            console.log("Loaded regions from database:", dbRegions);
            setRegionItemsState(dbRegions as Item[]);
          }
          
          // Load industries
          const dbIndustries = await industryService.getAllIndustries();
          if (dbIndustries && dbIndustries.length > 0) {
            console.log("Loaded industries from database:", dbIndustries);
            setIndustryItemsState(dbIndustries as Item[]);
          }
          
          // Load stages
          const dbStages = await stageService.getAllStages();
          if (dbStages && dbStages.length > 0) {
            console.log("Loaded stages from database:", dbStages);
            setStageItemsState(dbStages as Item[]);
          }
          
          // Load VC firms
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
  }, [isSupabaseConnected]);

  // Derived data - just the names as string arrays for the filters
  const regionNames = regionItems.map(item => item.name);
  const industryNames = industryItems.map(item => item.name);
  const stageNames = stageItems.map(item => item.name);

  // Get VCs by industry with optional limit
  const getVCsByIndustry = (industry: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.industries.includes(industry));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  // Get VCs by region with optional limit
  const getVCsByRegion = (region: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.regionsOfInterest.includes(region));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  // Update regions wrapper
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

  // Update industries wrapper
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

  // Update stages wrapper
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

  // Update VC firms wrapper
  const setVcFirms = async (firms: VCFirm[]) => {
    console.log("Setting VC firms:", firms);
    setVcFirmsState(firms);
  };

  // CRUD Operations for VC Firms
  const addVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Adding VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      // Update local state immediately
      setVcFirmsState([...vcFirms, firm]);
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm added successfully (local only)",
        });
        return;
      }

      // Add to Supabase
      const { error } = await vcFirmService.createVCFirm(firm);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "VC firm added successfully and saved to database",
      });
    } catch (error) {
      console.error("Error adding VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to add VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Updating VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      // Update local state immediately
      setVcFirmsState(vcFirms.map(f => f.id === firm.id ? firm : f));
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm updated successfully (local only)",
        });
        return;
      }

      // Update in Supabase
      await vcFirmService.updateVCFirm(firm);
      
      toast({
        title: "Success",
        description: "VC firm updated successfully and saved to database",
      });
    } catch (error) {
      console.error("Error updating VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to update VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteVCFirm = async (id: string) => {
    try {
      console.log("Deleting VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      // Update local state immediately
      setVcFirmsState(vcFirms.filter(f => f.id !== id));
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm deleted successfully (local only)",
        });
        return;
      }

      // Delete from Supabase
      await vcFirmService.deleteVCFirm(id);
      
      toast({
        title: "Success",
        description: "VC firm deleted successfully and removed from database",
      });
    } catch (error) {
      console.error("Error deleting VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to delete VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      throw error;
    }
  };

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
    
    // State setters
    setVcFirms,
    setRegionItems,
    setIndustryItems,
    setStageItems,
    
    // Helper functions
    getVCsByIndustry,
    getVCsByRegion,
    
    // CRUD operations
    addVCFirm,
    updateVCFirm,
    deleteVCFirm
  };
}
