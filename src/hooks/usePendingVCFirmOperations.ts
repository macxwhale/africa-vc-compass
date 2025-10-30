
import { useState } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { pendingVCFirmService, vcFirmService } from "@/services/supabaseService";
import { PendingVCFirm } from "@/types/vcTypes";

export function usePendingVCFirmOperations(updateVCFirms: (newFirm: VCFirm) => void) {
  const [pendingVCFirms, setPendingVCFirms] = useState<PendingVCFirm[]>([]);

  const submitVCFirm = async (firm: Omit<VCFirm, "id">): Promise<PendingVCFirm | undefined> => {
    try {
      console.log("Submitting VC firm:", firm);

      // Clean up contactPerson data before sending to database
      const firmToSave = {
        ...firm,
        contactPerson: firm.contactPerson ? {
          name: firm.contactPerson.name || "",
          email: firm.contactPerson.email || "",
          linkedinUrl: firm.contactPerson.linkedinUrl || "",
        } : undefined,
      };
      
      // Submit to database
      console.log("Submitting to database...");
      const createdPendingFirm = await pendingVCFirmService.createPendingVCFirm(firmToSave);
      
      if (createdPendingFirm) {
        console.log("Submitted to database successfully:", createdPendingFirm);
        
        // Update local state
        setPendingVCFirms(prev => [...prev, createdPendingFirm]);
        
        toast({
          title: "Success",
          description: "Your submission has been received and will be reviewed.",
        });
        
        return createdPendingFirm;
      }
    } catch (error) {
      console.error("Error submitting VC firm:", error);
      toast({
        title: "Error",
        description: "Failed to submit VC firm. Please try again.",
        variant: "destructive",
      });
    }
  };

  const approveVCFirm = async (pendingFirm: PendingVCFirm): Promise<void> => {
    try {
      console.log("Approving pending VC firm:", pendingFirm);
      
      // Create the VC firm in the main table
      const { id, status, submittedAt, reviewedAt, reviewNotes, ...firmData } = pendingFirm;
      
      // Clean up contactPerson data
      const firmToSave = {
        ...firmData,
        contactPerson: firmData.contactPerson ? {
          name: firmData.contactPerson.name || "",
          email: firmData.contactPerson.email || "",
          linkedinUrl: firmData.contactPerson.linkedinUrl || "",
        } : undefined,
      };
      
      const createdFirm = await vcFirmService.createVCFirm(firmToSave);
      
      if (createdFirm) {
        console.log("VC firm created successfully:", createdFirm);
        
        // Update the pending firm status in database
        await pendingVCFirmService.updatePendingVCFirm({
          ...pendingFirm,
          status: "approved",
          reviewedAt: new Date().toISOString(),
        });
        
        // Update local state
        setPendingVCFirms(prevFirms => 
          prevFirms.map(firm => 
            firm.id === pendingFirm.id 
              ? { ...firm, status: "approved" as const, reviewedAt: new Date().toISOString() }
              : firm
          )
        );
        
        // Update parent component's VC firms list
        updateVCFirms(createdFirm);
        
        toast({
          title: "Success",
          description: "VC firm approved and added to directory",
        });
      }
    } catch (error) {
      console.error("Error approving VC firm:", error);
      toast({
        title: "Error",
        description: "Failed to approve VC firm",
        variant: "destructive",
      });
    }
  };
  
  const rejectVCFirm = async (pendingFirm: PendingVCFirm, notes?: string): Promise<void> => {
    try {
      console.log("Rejecting pending VC firm:", pendingFirm);
      
      // Update the pending firm status in database
      await pendingVCFirmService.updatePendingVCFirm({
        ...pendingFirm,
        status: "rejected",
        reviewedAt: new Date().toISOString(),
        reviewNotes: notes,
      });
      
      // Update local state after successful database update
      setPendingVCFirms(prevFirms => 
        prevFirms.map(firm => 
          firm.id === pendingFirm.id 
            ? { 
                ...firm, 
                status: "rejected" as const, 
                reviewedAt: new Date().toISOString(),
                reviewNotes: notes 
              }
            : firm
        )
      );
      
      toast({
        title: "Success",
        description: "VC firm rejected",
      });
    } catch (error) {
      console.error("Error rejecting VC firm:", error);
      toast({
        title: "Error",
        description: "Failed to reject VC firm",
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
