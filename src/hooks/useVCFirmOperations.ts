
import { useState } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { vcFirmService } from "@/services/supabaseService";
import { PendingVCFirm } from "@/types/vcTypes";

export function useVCFirmOperations(initialData: VCFirm[], isSupabaseConnected: boolean) {
  const [vcFirms, setVcFirmsState] = useState<VCFirm[]>(initialData);

  const setVcFirms = async (firms: VCFirm[]) => {
    console.log("Setting VC firms:", firms);
    setVcFirmsState(firms);
  };

  const addVCFirm = async (firm: Omit<VCFirm, "id">) => {
    try {
      console.log("Adding VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      // Remove id field so database can auto-generate it
      const { id, ...firmWithoutId } = firm as VCFirm;
      
      if (firmWithoutId.contactPerson) {
        firmWithoutId.contactPerson = {
          name: firmWithoutId.contactPerson.name || "",
          email: firmWithoutId.contactPerson.email || "",
          linkedinUrl: firmWithoutId.contactPerson.linkedinUrl || "",
        };
        
        if (!firmWithoutId.contactPerson.name && !firmWithoutId.contactPerson.email && 
            !firmWithoutId.contactPerson.linkedinUrl) {
          firmWithoutId.contactPerson = undefined;
        }
      }
      
      console.log("Adding VC firm with contactPerson:", firmWithoutId.contactPerson);
      
      if (!isSupabaseConnected) {
        // For local-only operation, generate a temporary ID
        const tempFirm = {
          ...firmWithoutId,
          id: `temp-${Date.now()}`
        };
        setVcFirmsState(prevFirms => [...prevFirms, tempFirm]);
        return;
      }

      console.log("Attempting to save VC firm to Supabase:", firmWithoutId);
      const result = await vcFirmService.createVCFirm(firmWithoutId);
      
      if (result.error) {
        throw result.error;
      }
      
      // Add the firm with the database-generated ID to the state
      setVcFirmsState(prevFirms => [...prevFirms, result.data]);
      
      console.log("VC firm successfully saved to database:", result.data);
    } catch (error) {
      console.error("Error adding VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to add VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const updateVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Updating VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      if (firm.contactPerson) {
        firm.contactPerson = {
          name: firm.contactPerson.name || "",
          email: firm.contactPerson.email || "",
          linkedinUrl: firm.contactPerson.linkedinUrl || "",
        };
        
        if (!firm.contactPerson.name && !firm.contactPerson.email && 
            !firm.contactPerson.linkedinUrl) {
          firm.contactPerson = undefined;
        }
      }
      
      console.log("Updating VC firm with contactPerson:", firm.contactPerson);
      
      setVcFirmsState(prevFirms => prevFirms.map(f => f.id === firm.id ? firm : f));
      
      if (!isSupabaseConnected) {
        return;
      }

      console.log("Attempting to update VC firm in Supabase:", firm);
      const result = await vcFirmService.updateVCFirm(firm);
      
      if (result.error) {
        throw result.error;
      }
      
      console.log("VC firm successfully updated in database:", result.data);
    } catch (error) {
      console.error("Error updating VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to update VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const deleteVCFirm = async (id: string) => {
    try {
      console.log("Deleting VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      setVcFirmsState(prevFirms => prevFirms.filter(f => f.id !== id));
      
      if (!isSupabaseConnected) {
        return;
      }

      console.log("Attempting to delete VC firm from Supabase:", id);
      const success = await vcFirmService.deleteVCFirm(id);
      
      if (!success) {
        throw new Error("Failed to delete VC firm from database");
      }
      
      console.log("VC firm successfully deleted from database");
    } catch (error) {
      console.error("Error deleting VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to delete VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const getVCsByIndustry = (industry: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.industries.includes(industry));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  const getVCsByRegion = (region: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.regionsOfInterest.includes(region));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  return {
    vcFirms,
    setVcFirms,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    getVCsByIndustry,
    getVCsByRegion
  };
}
