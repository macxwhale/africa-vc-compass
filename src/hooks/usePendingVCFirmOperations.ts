
import { useState } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { pendingVCFirmService, vcFirmService } from "@/services/supabaseService";
import { PendingVCFirm } from "@/types/vcTypes";

export function usePendingVCFirmOperations(
  isSupabaseConnected: boolean,
  updateVCFirms: (newFirm: VCFirm) => void
) {
  const [pendingVCFirms, setPendingVCFirms] = useState<PendingVCFirm[]>([]);

  const submitVCFirm = async (firm: Omit<VCFirm, "id">) => {
    try {
      console.log("Submitting VC firm with isSupabaseConnected:", isSupabaseConnected);
      
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
      
      if (!isSupabaseConnected) {
        // For local-only operation, generate a temporary ID
        const tempPendingFirm: PendingVCFirm = {
          ...firm,
          id: `pending-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        };
        
        setPendingVCFirms(prev => [...prev, tempPendingFirm]);
        return;
      }

      console.log("Attempting to save pending VC firm to Supabase:", firm);
      const result = await pendingVCFirmService.createPendingVCFirm(firm);
      
      if (result.error) {
        throw result.error;
      }
      
      // Add the firm with the database-generated ID to the state
      setPendingVCFirms(prev => [...prev, result.data]);
      
      console.log("Pending VC firm successfully saved to database:", result.data);
    } catch (error) {
      console.error("Error submitting VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to submit VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const approveVCFirm = async (pendingFirm: PendingVCFirm) => {
    try {
      console.log("Approving VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      // Extract all fields except those specific to pending status
      const { id, status, submittedAt, reviewedAt, reviewNotes, ...approvedFirmData } = pendingFirm;
      
      if (!isSupabaseConnected) {
        // For local-only operation, generate a temporary ID
        const tempApprovedFirm: VCFirm = {
          ...approvedFirmData,
          id: `approved-${Date.now()}`
        };
        
        updateVCFirms(tempApprovedFirm);
        
        const updatedPendingFirm = {
          ...pendingFirm,
          status: 'approved' as const,
          reviewedAt: new Date().toISOString()
        };
        
        setPendingVCFirms(prev => 
          prev.map(firm => firm.id === pendingFirm.id ? updatedPendingFirm : firm)
        );
        
        return;
      }
      
      // Let the database handle creating a new ID for the approved firm
      const approveResult = await vcFirmService.createVCFirm(approvedFirmData);
      if (approveResult.error) {
        throw approveResult.error;
      }
      
      // Update the UI with the newly created firm (with database-generated ID)
      updateVCFirms(approveResult.data);
      
      // Mark the pending firm as approved
      const updatedPendingFirm = {
        ...pendingFirm,
        status: 'approved' as const,
        reviewedAt: new Date().toISOString()
      };
      
      const updateResult = await pendingVCFirmService.updatePendingVCFirm(updatedPendingFirm);
      if (updateResult.error) {
        throw updateResult.error;
      }
      
      // Update the pending firms list
      setPendingVCFirms(prev => 
        prev.map(firm => firm.id === pendingFirm.id ? updateResult.data : firm)
      );
      
      console.log("VC firm approved and saved to database");
    } catch (error) {
      console.error("Error approving VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to approve VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };
  
  const rejectVCFirm = async (pendingFirm: PendingVCFirm, notes?: string) => {
    try {
      console.log("Rejecting VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      const updatedPendingFirm = {
        ...pendingFirm,
        status: 'rejected' as const,
        reviewedAt: new Date().toISOString(),
        reviewNotes: notes
      };
      
      setPendingVCFirms(prev => 
        prev.map(firm => firm.id === pendingFirm.id ? updatedPendingFirm : firm)
      );
      
      if (!isSupabaseConnected) {
        return;
      }
      
      const updateResult = await pendingVCFirmService.updatePendingVCFirm(updatedPendingFirm);
      if (updateResult.error) {
        throw updateResult.error;
      }
      
      console.log("VC firm rejected and updated in database");
    } catch (error) {
      console.error("Error rejecting VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to reject VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  return {
    pendingVCFirms,
    setPendingVCFirms,
    submitVCFirm,
    approveVCFirm,
    rejectVCFirm
  };
}
