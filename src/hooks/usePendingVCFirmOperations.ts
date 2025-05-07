
import { useState, useEffect } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { pendingVCFirmService, vcFirmService } from "@/services/supabaseService";
import { PendingVCFirm } from "@/types/vcTypes";

export function usePendingVCFirmOperations(
  isSupabaseConnected: boolean,
  updateVCFirms: (newFirm: VCFirm) => void
) {
  const [pendingVCFirms, setPendingVCFirms] = useState<PendingVCFirm[]>([]);

  // Load any pending firms from local storage on initialization
  useEffect(() => {
    const localPendingFirms = localStorage.getItem('pendingVCFirms');
    if (localPendingFirms) {
      try {
        const parsedFirms = JSON.parse(localPendingFirms);
        if (Array.isArray(parsedFirms) && parsedFirms.length > 0) {
          setPendingVCFirms(parsedFirms);
        }
      } catch (error) {
        console.error("Error parsing local pending firms:", error);
      }
    }
  }, []);

  // Update local storage whenever pendingVCFirms changes
  useEffect(() => {
    if (pendingVCFirms.length > 0) {
      localStorage.setItem('pendingVCFirms', JSON.stringify(pendingVCFirms));
    }
  }, [pendingVCFirms]);

  const submitVCFirm = async (firm: Omit<VCFirm, "id">) => {
    try {
      console.log("Submitting VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      // Create the transformed firm object to match database schema
      const transformedFirm = {
        ...firm,
        // Extract contact info if it exists
        contactInfo: undefined // We'll remove this before creating the PendingVCFirm
      };
      
      // Process contactPerson to avoid empty objects
      if (transformedFirm.contactPerson) {
        transformedFirm.contactPerson = {
          name: transformedFirm.contactPerson.name || "",
          email: transformedFirm.contactPerson.email || "",
          linkedinUrl: transformedFirm.contactPerson.linkedinUrl || "",
        };
        
        if (!transformedFirm.contactPerson.name && !transformedFirm.contactPerson.email && 
            !transformedFirm.contactPerson.linkedinUrl) {
          transformedFirm.contactPerson = undefined;
        }
      }
      
      // Always create a local pending firm with a temporary ID
      const tempPendingFirm: PendingVCFirm = {
        ...transformedFirm,
        id: `pending-${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        // Add contactInfo properties as direct properties for compatibility with PendingVCFirm type
        // and the database schema
        linkedinUrl: firm.contactInfo?.linkedin || "",
        twitterUrl: firm.contactInfo?.twitter || "",
      };
      
      // Update local state first
      setPendingVCFirms(prev => [...prev, tempPendingFirm]);
      
      // Show a toast to inform the user
      toast({
        title: "Success",
        description: `VC firm added to pending queue${isSupabaseConnected ? " but not saved to database yet" : ""}`,
      });
      
      // Don't try to save to database yet - we'll do that when approving
      console.log("Pending firm saved locally:", tempPendingFirm);
      
      return tempPendingFirm;
    } catch (error) {
      console.error("Error submitting VC firm:", error);
      toast({
        title: "Error",
        description: `Failed to submit VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      return undefined;
    }
  };

  const approveVCFirm = async (pendingFirm: PendingVCFirm) => {
    try {
      console.log("Approving VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      // Extract all fields except those specific to pending status
      const { id, status, submittedAt, reviewedAt, reviewNotes, contactPerson, linkedinUrl, twitterUrl, ...approvedFirmData } = pendingFirm;
      
      // Format the data to match VCFirm structure
      const approvedFirmWithContactInfo = {
        ...approvedFirmData,
        // Add the contact info properly structured for a VCFirm
        contactInfo: {
          linkedin: linkedinUrl || "",
          twitter: twitterUrl || "",
          email: contactPerson?.email || "",
        },
      };
      
      // For local-only operation or connected to database
      const tempApprovedFirm: VCFirm = {
        ...approvedFirmWithContactInfo,
        id: `approved-${Date.now()}`
      };
      
      // Update the local VCFirms state first
      updateVCFirms(tempApprovedFirm);
      
      // Mark the local pending firm as approved
      const updatedPendingFirm = {
        ...pendingFirm,
        status: 'approved' as const,
        reviewedAt: new Date().toISOString()
      };
      
      // Update the local pendingVCFirms state
      setPendingVCFirms(prev => 
        prev.map(firm => firm.id === pendingFirm.id ? updatedPendingFirm : firm)
      );
      
      // Only try to save to database if connected
      if (isSupabaseConnected) {
        try {
          // Let the database handle creating a new ID for the approved firm
          const approveResult = await vcFirmService.createVCFirm(approvedFirmWithContactInfo);
          if (approveResult.error) {
            throw approveResult.error;
          }
          
          // Update the UI with the newly created firm (with database-generated ID)
          updateVCFirms(approveResult.data);
          
          // Mark the pending firm as approved in the database
          const updateResult = await pendingVCFirmService.updatePendingVCFirm(updatedPendingFirm);
          if (updateResult.error) {
            console.warn("Firm approved but could not update pending status in database:", updateResult.error);
          }
          
          console.log("VC firm approved and saved to database");
        } catch (dbError) {
          console.error("Database error during approval:", dbError);
          toast({
            title: "Database Error",
            description: "Firm approved locally but could not be saved to database.",
            variant: "destructive",
          });
        }
      }
      
      toast({
        title: "Success",
        description: `VC firm approved and added to directory`,
      });
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
      
      // Update local state
      setPendingVCFirms(prev => 
        prev.map(firm => firm.id === pendingFirm.id ? updatedPendingFirm : firm)
      );
      
      toast({
        title: "Success",
        description: `VC firm rejected`,
      });
      
      // Only try to update in database if connected
      if (isSupabaseConnected) {
        try {
          const updateResult = await pendingVCFirmService.updatePendingVCFirm(updatedPendingFirm);
          if (updateResult.error) {
            console.warn("Firm rejected locally but could not update in database:", updateResult.error);
          }
        } catch (dbError) {
          console.error("Database error during rejection:", dbError);
          toast({
            title: "Database Warning",
            description: "Firm rejected locally but could not be updated in database.",
            variant: "destructive",
          });
        }
      }
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
