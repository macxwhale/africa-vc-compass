
import { useState } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { vcFirmService } from "@/services/supabaseService";

export function useVCFirmOperations(initialData: VCFirm[]) {
  const [vcFirms, setVcFirmsState] = useState<VCFirm[]>(initialData);

  const setVcFirms = async (firms: VCFirm[]) => {
    console.log("Setting VC firms:", firms);
    setVcFirmsState(firms);
  };

  const addVCFirm = async (firm: Omit<VCFirm, "id">) => {
    try {
      console.log("Adding VC firm:", firm);

      // Clean up contactPerson data before sending to database
      const firmToSave = {
        ...firm,
        contactPerson: firm.contactPerson ? {
          name: firm.contactPerson.name || "",
          email: firm.contactPerson.email || "",
          linkedinUrl: firm.contactPerson.linkedinUrl || "",
        } : undefined,
      };

      console.log("Creating VC firm in database");
      const createdFirm = await vcFirmService.createVCFirm(firmToSave);
      
      if (createdFirm) {
        console.log("VC firm created successfully:", createdFirm);
        setVcFirmsState([...vcFirms, createdFirm]);
        toast({
          title: "Success",
          description: "VC firm added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding VC firm:", error);
      toast({
        title: "Error",
        description: "Failed to add VC firm",
        variant: "destructive",
      });
    }
  };

  const updateVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Updating VC firm:", firm);

      // Clean up contactPerson data before sending to database
      const firmToSave = {
        ...firm,
        contactPerson: firm.contactPerson ? {
          name: firm.contactPerson.name || "",
          email: firm.contactPerson.email || "",
          linkedinUrl: firm.contactPerson.linkedinUrl || "",
        } : undefined,
      };

      console.log("Updating VC firm in database");
      await vcFirmService.updateVCFirm(firmToSave);
      console.log("VC firm updated successfully");
      
      // Update local state after successful database update
      setVcFirmsState(vcFirms.map(f => f.id === firm.id ? firm : f));
      
      toast({
        title: "Success",
        description: "VC firm updated successfully",
      });
    } catch (error) {
      console.error("Error updating VC firm:", error);
      toast({
        title: "Error",
        description: "Failed to update VC firm",
        variant: "destructive",
      });
    }
  };

  const deleteVCFirm = async (id: string) => {
    try {
      console.log("Deleting VC firm:", id);

      console.log("Deleting VC firm from database");
      await vcFirmService.deleteVCFirm(id);
      console.log("VC firm deleted successfully");
      
      // Update local state after successful database deletion
      setVcFirmsState(vcFirms.filter(f => f.id !== id));
      
      toast({
        title: "Success",
        description: "VC firm deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting VC firm:", error);
      toast({
        title: "Error",
        description: "Failed to delete VC firm",
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
