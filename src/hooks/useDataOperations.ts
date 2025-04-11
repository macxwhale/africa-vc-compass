
import { useState, useEffect, useRef } from "react";
import { VCFirm } from "@/data/types";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/services/supabaseService";
import { vcFirmService, regionService, industryService, stageService, pendingVCFirmService } from "@/services/supabaseService";
import { Item, PendingVCFirm } from "@/contexts/DataContext";
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
          
          try {
            const dbPendingVCFirms = await pendingVCFirmService.getAllPendingVCFirms();
            if (dbPendingVCFirms && dbPendingVCFirms.length > 0) {
              console.log("Loaded pending VC firms from database:", dbPendingVCFirms);
              setPendingVCFirms(dbPendingVCFirms);
            }
          } catch (error) {
            console.error("Error loading pending VC firms:", error);
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
        await updateRegionItems(items, isSupabaseConnected);
        console.log("Regions saved to database");
      } catch (error) {
        console.error("Error saving regions to database:", error);
      }
    }
  };

  const setIndustryItems = async (items: Item[]) => {
    console.log("Setting industry items:", items);
    setIndustryItemsState(items);
    
    if (isSupabaseConnected) {
      try {
        await updateIndustryItems(items, isSupabaseConnected);
        console.log("Industries saved to database");
      } catch (error) {
        console.error("Error saving industries to database:", error);
      }
    }
  };

  const setStageItems = async (items: Item[]) => {
    console.log("Setting stage items:", items);
    setStageItemsState(items);
    
    if (isSupabaseConnected) {
      try {
        await updateStageItems(items, isSupabaseConnected);
        console.log("Stages saved to database");
      } catch (error) {
        console.error("Error saving stages to database:", error);
      }
    }
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
      
      // Create a deep copy before modifying or saving
      const firmToSave = JSON.parse(JSON.stringify(firm));
      
      if (firmToSave.contactPerson) {
        console.log("Contact person being added:", JSON.stringify(firmToSave.contactPerson));
      }
      
      setVcFirmsState(prevFirms => [...prevFirms, firmToSave]);
      
      if (!isSupabaseConnected) {
        return;
      }

      console.log("Attempting to save VC firm to Supabase:", firmToSave);
      const result = await vcFirmService.createVCFirm(firmToSave);
      
      if (result.error) {
        throw result.error;
      }
      
      console.log("VC firm successfully saved to database:", result.data);
    } catch (error) {
      console.error("Error adding VC firm:", error);
      toast({
        title: "Error adding VC firm",
        description: `${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const updateVCFirm = async (firm: VCFirm) => {
    try {
      console.log("Updating VC firm with isSupabaseConnected:", isSupabaseConnected);
      console.log("Full VC firm data being updated:", JSON.stringify(firm, null, 2));
      
      // Create a deep copy for state update
      const updatedFirm = JSON.parse(JSON.stringify(firm)) as VCFirm;
      
      setVcFirmsState(prevFirms => prevFirms.map(f => f.id === firm.id ? updatedFirm : f));
      
      if (!isSupabaseConnected) {
        return;
      }

      // Create another deep copy specifically for Supabase update
      const firmToUpdate = JSON.parse(JSON.stringify(firm)) as VCFirm;
      
      if (firmToUpdate.contactPerson) {
        console.log("Contact person data being sent:", JSON.stringify(firmToUpdate.contactPerson, null, 2));
      } else {
        console.log("No contact person data in the firm object");
      }
      
      console.log("Attempting to update VC firm in Supabase:", firmToUpdate);
      const result = await vcFirmService.updateVCFirm(firmToUpdate);
      
      if (result.error) {
        throw result.error;
      }
      
      // Check if contact person data came back correctly from the database
      if (result.data) {
        console.log("VC firm successfully updated in database:", result.data);
        if (result.data.contactPerson) {
          console.log("Contact person data returned from database:", 
            JSON.stringify(result.data.contactPerson, null, 2));
        } else {
          console.log("No contact person data in the database response");
        }
      }
    } catch (error) {
      console.error("Error updating VC firm:", error);
      toast({
        title: "Error updating VC firm",
        description: `${error instanceof Error ? error.message : 'Unknown error'}`,
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
    }
  };

  const submitVCFirm = async (firm: Omit<VCFirm, "id">) => {
    try {
      console.log("Submitting VC firm with isSupabaseConnected:", isSupabaseConnected);
      
      const newFirm: PendingVCFirm = {
        ...firm,
        id: `pending-${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };
      
      // Make sure contact person is included
      if (newFirm.contactPerson) {
        console.log("Contact person being submitted:", JSON.stringify(newFirm.contactPerson));
      }
      
      setPendingVCFirms(prev => [...prev, newFirm]);
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm submitted for review (local only)",
        });
        return;
      }

      // Create a deep copy specifically for Supabase
      const firmToSave = JSON.parse(JSON.stringify(newFirm));
      
      console.log("Attempting to save pending VC firm to Supabase:", firmToSave);
      const result = await pendingVCFirmService.createPendingVCFirm(firmToSave);
      
      if (result.error) {
        throw result.error;
      }
      
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
      
      const approvedFirm: VCFirm = {
        id: `firm-${Date.now()}`,
        name: pendingFirm.name,
        logo: pendingFirm.logo,
        description: pendingFirm.description,
        website: pendingFirm.website,
        headquarters: pendingFirm.headquarters,
        foundedYear: pendingFirm.foundedYear,
        investmentFocus: pendingFirm.investmentFocus,
        industries: pendingFirm.industries,
        stagePreference: pendingFirm.stagePreference,
        ticketSize: pendingFirm.ticketSize,
        regionsOfInterest: pendingFirm.regionsOfInterest,
        portfolioCompanies: pendingFirm.portfolioCompanies,
        keyPartners: pendingFirm.keyPartners,
        contactInfo: pendingFirm.contactInfo,
        contactPerson: pendingFirm.contactPerson
      };
      
      setVcFirmsState(prev => [...prev, approvedFirm]);
      
      const updatedPendingFirm = {
        ...pendingFirm,
        status: 'approved' as const,
        reviewedAt: new Date().toISOString()
      };
      
      setPendingVCFirms(prev => 
        prev.map(firm => firm.id === pendingFirm.id ? updatedPendingFirm : firm)
      );
      
      if (!isSupabaseConnected) {
        toast({
          title: "Success",
          description: "VC firm approved (local only)",
        });
        return;
      }
      
      const approveResult = await vcFirmService.createVCFirm(approvedFirm);
      if (approveResult.error) {
        throw approveResult.error;
      }
      
      const updateResult = await pendingVCFirmService.updatePendingVCFirm(updatedPendingFirm);
      if (updateResult.error) {
        throw updateResult.error;
      }
      
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
