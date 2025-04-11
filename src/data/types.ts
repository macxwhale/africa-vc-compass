
export interface Person {
  name: string;
  image?: string;
  title?: string;
}

export interface ContactPerson {
  name: string;
  email: string;
  linkedinUrl?: string;
  phone?: string;
}

export interface VCFirm {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  headquarters?: string;
  foundedYear?: number;
  investmentFocus?: string[];
  industries: string[];
  stagePreference: string[];
  ticketSize?: string;
  regionsOfInterest: string[];
  portfolioCompanies?: string[];
  keyPartners?: Person[];
  contactInfo?: {
    email?: string;
    phone?: string;
    twitter?: string;
    linkedin?: string;
  };
  contactPerson?: ContactPerson;
}
