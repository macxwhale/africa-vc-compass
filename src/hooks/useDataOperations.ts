import { useState, useEffect, useRef } from "react";
import { VCFirm } from "@/data/vcData";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/services/supabaseService";
import { vcFirmService, regionService, industryService, stageService, pendingVCFirmService } from "@/services/supabaseService";
import { Item } from "@/contexts/DataContext";
import { updateRegionItems, updateIndustryItems, updateStageItems } from "@/utils/databaseUtils";

export interface PendingVCFirm extends VCFirm {
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

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
  const [pendingVCFirms, setPendingVCFirms] = useState<PendingVCFirm[]>([]);
  
  const dataLoadedRef = useRef(false);

  useEffect(() => {
    const loadDataFromSupabase = async () => {
      if (isSupabaseConnected && !dataLoadedRef.current) {
        dataLoadedRef.current = true;
        try {
          console.log("Loading data from Supabase...");
          
          const dbRegions = await regionService.getAllRegions();
          if (dbRegions && dbRegions.length > 0) {
            console.log("Loaded regions from database:", dbRegions);
            setRegionItemsState(dbRegions as Item[]);
          }
          
          const dbIndustries = await industryService.getAllIndustries();
          if (dbIndustries && dbIndustries.length > 0) {
            console.log("Loaded industries from database:", dbIndustries);
            setIndustryItemsState(dbIndustries as Item[]);
          }
          
          const dbStages = await stageService.getAllStages();
          if (dbStages && dbStages.length > 0) {
            console.log("Loaded stages from database:", dbStages);
            setStageItemsState(dbStages as Item[]);
          }
          
          const dbVCFirms = await vcFirmService.getAllVCFirms();
          if (dbVCFirms && dbVCFirms.length > 0) {
            console.log("Loaded VC firms from database:", dbVCFirms);
            setVcFirmsState(dbVCFirms as VCFirm[]);
          }
          
          const dbPendingVCFirms = await pendingVCFirmService.getAllPendingVCFirms();
          if (dbPendingVCFirms && dbPendingVCFirms.length > 0) {
            console.log("Loaded pending VC firms from database:", dbPendingVCFirms);
            setPendingVCFirms(dbPendingVCFirms);
          }
        } catch (error) {
          console.error("Error loading data from Supabase:", error);
        }
      }
    };
    
    loadDataFromSupabase();
  }, [isSupabaseConnected]);

  const regionNames = regionItems.map(item => item.name);
  const industryNames = industryItems.map(item => item.name);
  const stageNames = stageItems.map(item => item.name);

  const getVCsByIndustry = (industry: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.industries.includes(industry));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  const getVCsByRegion = (region: string, limit?: number): VCFirm[] => {
    const filteredVCs = vcFirms.filter(vc => vc.regionsOfInterest.includes(region));
    return limit ? filteredVCs.slice(0, limit) : filteredVCs;
  };

  const setRegionItems = async (items: Item[]) => {
    console.log("Setting region items:", items);
    setRegionItemsState(items);
    
    if (isSupabaseConnected) {
      try {
        await regionService.updateAllRegions(items);
        console.log("Regions saved to database");
        toast({
          title: "Success",
          description: `Regions updated successfully and saved to database`,
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
          description: `Industries updated successfully and saved to database`,
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
          description: `Investment stages updated successfully and saved to database`,
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
        
        toast({
          title: "Success",
          description: "VC firm added successfully (local only)",
        });
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
        
        toast({
          title: "Success",
          description: "VC firm submitted for review (local only)",
        });
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
      toast({
        title: "Success",
        description: "VC firm submitted for review and saved to database",
      });
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
        
        setVcFirmsState(prev => [...prev, tempApprovedFirm]);
        
        const updatedPendingFirm = {
          ...pendingFirm,
          status: 'approved' as const,
          reviewedAt: new Date().toISOString()
        };
        
        setPendingVCFirms(prev => 
          prev.map(firm => firm.id === pendingFirm.id ? updatedPendingFirm : firm)
        );
        
        toast({
          title: "Success",
          description: "VC firm approved (local only)",
        });
        return;
      }
      
      // Let the database handle creating a new ID for the approved firm
      const approveResult = await vcFirmService.createVCFirm(approvedFirmData);
      if (approveResult.error) {
        throw approveResult.error;
      }
      
      // Update the UI with the newly created firm (with database-generated ID)
      setVcFirmsState(prev => [...prev, approveResult.data]);
      
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
      toast({
        title: "Success",
        description: "VC firm approved and added to directory",
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
      
      setPendingVCFirms(prev => 
        prev.map(firm => firm.id === pendingFirm.id ? updatedPendingFirm : firm)
      );
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm rejected (local only)",
        });
        return;
      }
      
      const updateResult = await pendingVCFirmService.updatePendingVCFirm(updatedPendingFirm);
      if (updateResult.error) {
        throw updateResult.error;
      }
      
      console.log("VC firm rejected and updated in database");
      toast({
        title: "Success",
        description: "VC firm submission rejected",
      });
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
    vcFirms,
    regionItems,
    industryItems,
    stageItems,
    pendingVCFirms,
    
    regionNames,
    industryNames,
    stageNames,
    
    setVcFirms,
    setRegionItems,
    setIndustryItems,
    setStageItems,
    
    getVCsByIndustry,
    getVCsByRegion,
    
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    
    submitVCFirm,
    approveVCFirm,
    rejectVCFirm
  };
}
