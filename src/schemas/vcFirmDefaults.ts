
import { VCFirm } from "@/data/vcData";
import { PendingVCFirm } from "@/types/vcTypes";

/**
 * Default values for a new VC Firm
 */
export const defaultVCFirm: Omit<VCFirm, "id"> = {
  name: "",
  logo: "/placeholder.svg",
  description: "",
  website: "",
  headquarters: "",
  foundedYear: new Date().getFullYear(),
  investmentFocus: [],
  industries: [],
  stagePreference: [],
  ticketSize: "",
  regionsOfInterest: [],
  portfolioCompanies: [],
  keyPartners: [],
  contactInfo: {
    email: "",
    twitter: "",
    linkedin: ""
  },
  contactPerson: {
    name: "",
    email: "",
    linkedinUrl: ""
  }
};

/**
 * Default values for a new Pending VC Firm submission
 */
export const defaultPendingVCFirm: Omit<PendingVCFirm, "id"> = {
  ...defaultVCFirm,
  status: "pending",
  submittedAt: new Date().toISOString(),
  reviewedAt: undefined,
  reviewNotes: undefined
};

/**
 * Example VC Firm data for testing purposes
 */
export const sampleVCFirm: VCFirm = {
  id: "sample-id",
  name: "Sample Ventures",
  logo: "/placeholder.svg",
  description: "A sample venture capital firm focused on tech startups across Africa.",
  website: "https://example.com",
  headquarters: "Nairobi, Kenya",
  foundedYear: 2020,
  investmentFocus: ["Early Stage", "Seed"],
  industries: ["Fintech", "Healthtech"],
  stagePreference: ["Seed", "Pre-Series A"],
  ticketSize: "$50K-$250K",
  regionsOfInterest: ["East Africa", "West Africa"],
  portfolioCompanies: ["Company A", "Company B"],
  keyPartners: [
    {
      name: "Jane Doe",
      title: "Managing Partner",
      image: "/placeholder.svg"
    }
  ],
  contactInfo: {
    email: "info@sampleventures.com",
    twitter: "samplevc",
    linkedin: "sample-ventures"
  },
  contactPerson: {
    name: "John Smith",
    email: "john@sampleventures.com",
    linkedinUrl: "https://linkedin.com/in/johnsmith"
  }
};
