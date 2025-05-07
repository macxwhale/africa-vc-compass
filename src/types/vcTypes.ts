
import { VCFirm } from "@/data/vcData";
import { Item } from "@/contexts/DataContext";

export interface PendingVCFirm extends VCFirm {
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
  linkedinUrl?: string; // Add these properties to match database schema
  twitterUrl?: string;  // Add these properties to match database schema
}

export interface DataOperationsInitialData {
  vcFirms: VCFirm[];
  regionItems: Item[];
  industryItems: Item[];
  stageItems: Item[];
}
