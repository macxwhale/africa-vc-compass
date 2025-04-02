
import { useState } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { vcFirmService } from "@/services/supabaseService";
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
  const [vcFirms, setVcFirms] = useState<VCFirm[]>(initialData.vcFirms);
  const [regionItems, setRegionItems] = useState<Item[]>(initialData.regionItems);
  const [industryItems, setIndustryItems] = useState<Item[]>(initialData.industryItems);
  const [stageItems, setStageItems] = useState<Item[]>(initialData.stageItems);

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

  // Update regions
  const updateRegions = async (items: Item[]) => {
    console.log("Updating regions with isSupabaseConnected:", isSupabaseConnected);
    setRegionItems(items);
    await updateRegionItems(items, isSupabaseConnected);
  };

  // Update industries
  const updateIndustries = async (items: Item[]) => {
    console.log("Updating industries with isSupabaseConnected:", isSupabaseConnected);
    setIndustryItems(items);
    await updateIndustryItems(items, isSupabaseConnected);
  };

  // Update stages
  const updateStages = async (items: Item[]) => {
    console.log("Updating stages with isSupabaseConnected:", isSupabaseConnected);
    setStageItems(items);
    await updateStageItems(items, isSupabaseConnected);
  };

  // CRUD Operations for VC Firms
  const addVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Adding VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms([...vcFirms, firm]);
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
      
      // Update local state
      setVcFirms([...vcFirms, firm]);
      
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
      
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms(vcFirms.map(f => f.id === firm.id ? firm : f));
        toast({
          title: "Success",
          description: "VC firm updated successfully (local only)",
        });
        return;
      }

      // Update in Supabase
      await vcFirmService.updateVCFirm(firm);
      
      // Update local state
      setVcFirms(vcFirms.map(f => f.id === firm.id ? firm : f));
      
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
      
      if (!isSupabaseConnected) {
        // Local only operation
        setVcFirms(vcFirms.filter(f => f.id !== id));
        toast({
          title: "Success",
          description: "VC firm deleted successfully (local only)",
        });
        return;
      }

      // Delete from Supabase
      await vcFirmService.deleteVCFirm(id);
      
      // Update local state
      setVcFirms(vcFirms.filter(f => f.id !== id));
      
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
    setRegionItems: updateRegions,
    setIndustryItems: updateIndustries,
    setStageItems: updateStages,
    
    // Helper functions
    getVCsByIndustry,
    getVCsByRegion,
    
    // CRUD operations
    addVCFirm,
    updateVCFirm,
    deleteVCFirm
  };
}
