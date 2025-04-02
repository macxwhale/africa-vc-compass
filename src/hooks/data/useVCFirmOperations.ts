
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { vcFirmService } from "@/services/supabaseService";

export function useVCFirmOperations(
  vcFirms: VCFirm[],
  setVcFirmsState: (firms: VCFirm[]) => void,
  isSupabaseConnected: boolean
) {
  const getVCsByIndustry = (industry: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.industries.includes(industry));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  const getVCsByRegion = (region: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.regionsOfInterest.includes(region));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  const setVcFirms = async (firms: VCFirm[]) => {
    console.log("Setting VC firms:", firms);
    setVcFirmsState(firms);
  };

  const addVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Adding VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      if (!firm.id) {
        firm.id = `firm-${Date.now()}`;
      }
      
      setVcFirmsState(prevFirms => [...prevFirms, firm]);
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm added successfully (local only)",
        });
        return;
      }

      console.log("Attempting to save VC firm to Supabase:", firm);
      const result = await vcFirmService.createVCFirm(firm);
      
      if (result.error) {
        throw result.error;
      }
      
      console.log("VC firm successfully saved to database:", result.data);
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
    }
  };

  const updateVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Updating VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      setVcFirmsState(prevFirms => prevFirms.map(f => f.id === firm.id ? firm : f));
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm updated successfully (local only)",
        });
        return;
      }

      console.log("Attempting to update VC firm in Supabase:", firm);
      const result = await vcFirmService.updateVCFirm(firm);
      
      if (result.error) {
        throw result.error;
      }
      
      console.log("VC firm successfully updated in database:", result.data);
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
    }
  };

  const deleteVCFirm = async (id: string) => {
    try {
      console.log("Deleting VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      setVcFirmsState(prevFirms => prevFirms.filter(f => f.id !== id));
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm deleted successfully (local only)",
        });
        return;
      }

      console.log("Attempting to delete VC firm from Supabase:", id);
      const success = await vcFirmService.deleteVCFirm(id);
      
      if (!success) {
        throw new Error("Failed to delete VC firm from database");
      }
      
      console.log("VC firm successfully deleted from database");
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
    }
  };

  return {
    getVCsByIndustry,
    getVCsByRegion,
    setVcFirms,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm
  };
}
