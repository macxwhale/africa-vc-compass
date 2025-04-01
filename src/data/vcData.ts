
export interface VCFirm {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  headquarters: string;
  foundedYear: number;
  investmentFocus: string[];
  industries: string[];
  stagePreference: string[];
  ticketSize: string;
  regionsOfInterest: string[];
  portfolioCompanies: string[];
  keyPartners: Person[];
  contactInfo: {
    email: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Person {
  name: string;
  title: string;
  image?: string;
}

// Sample Data
export const vcFirms: VCFirm[] = [
  {
    id: "1",
    name: "Savannah Fund",
    logo: "https://placehold.co/100x100/1A365D/FFFFFF?text=SF",
    description: "Savannah Fund is a seed capital fund specializing in $25,000-$500,000 investments in early-stage high-growth technology startups in Sub-Saharan Africa.",
    website: "https://savannah.vc",
    headquarters: "Nairobi, Kenya",
    foundedYear: 2012,
    investmentFocus: ["Early Stage", "Seed", "Series A"],
    industries: ["Fintech", "Healthtech", "Edtech", "Agritech"],
    stagePreference: ["Seed", "Pre-Series A"],
    ticketSize: "$100K-$500K",
    regionsOfInterest: ["East Africa", "West Africa"],
    portfolioCompanies: ["Company A", "Company B", "Company C"],
    keyPartners: [
      {
        name: "Mbwana Alliy",
        title: "Managing Partner",
        image: "https://placehold.co/100x100/1A365D/FFFFFF?text=MA"
      }
    ],
    contactInfo: {
      email: "info@savannah.vc",
      twitter: "savannah_vc",
      linkedin: "savannah-fund"
    }
  },
  {
    id: "2",
    name: "Novastar Ventures",
    logo: "https://placehold.co/100x100/276749/FFFFFF?text=NV",
    description: "Novastar Ventures is a venture catalyst firm that invests in early and growth-stage businesses with the potential for transformative social and environmental impact.",
    website: "https://novastarventures.com",
    headquarters: "Nairobi, Kenya & Lagos, Nigeria",
    foundedYear: 2014,
    investmentFocus: ["Early Stage", "Series A", "Series B"],
    industries: ["Essential Services", "Food & Agriculture", "Financial Services", "Education", "Healthcare"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$1M-$8M",
    regionsOfInterest: ["East Africa", "West Africa"],
    portfolioCompanies: ["Company X", "Company Y", "Company Z"],
    keyPartners: [
      {
        name: "Steve Beck",
        title: "Co-Founder & Managing Partner",
        image: "https://placehold.co/100x100/276749/FFFFFF?text=SB"
      }
    ],
    contactInfo: {
      email: "info@novastarventures.com",
      linkedin: "novastar-ventures"
    }
  },
  {
    id: "3",
    name: "TLcom Capital",
    logo: "https://placehold.co/100x100/D69E2E/FFFFFF?text=TL",
    description: "TLcom Capital is a venture capital firm focused on providing equity funding to tech companies in Sub-Saharan Africa.",
    website: "https://tlcomcapital.com",
    headquarters: "Lagos, Nigeria & Nairobi, Kenya",
    foundedYear: 1999,
    investmentFocus: ["Series A", "Series B"],
    industries: ["Fintech", "Healthtech", "Edtech", "Logistics", "E-commerce"],
    stagePreference: ["Series A", "Series B"],
    ticketSize: "$500K-$10M",
    regionsOfInterest: ["West Africa", "East Africa", "Pan-African"],
    portfolioCompanies: ["Andela", "uLesson", "Twiga Foods"],
    keyPartners: [
      {
        name: "Maurizio Caio",
        title: "Founder & Managing Partner",
        image: "https://placehold.co/100x100/D69E2E/FFFFFF?text=MC"
      }
    ],
    contactInfo: {
      email: "info@tlcomcapital.com",
      twitter: "TLcomCapital",
      linkedin: "tlcom-capital"
    }
  },
  {
    id: "4",
    name: "Ventures Platform",
    logo: "https://placehold.co/100x100/2C5282/FFFFFF?text=VP",
    description: "Ventures Platform is an early-stage fund for African tech startups, providing smart capital, networks, and support.",
    website: "https://venturesplatform.com",
    headquarters: "Lagos, Nigeria",
    foundedYear: 2016,
    investmentFocus: ["Pre-seed", "Seed"],
    industries: ["Fintech", "Agritech", "Healthtech", "Edtech", "Enterprise Software"],
    stagePreference: ["Pre-seed", "Seed"],
    ticketSize: "$50K-$250K",
    regionsOfInterest: ["West Africa", "Pan-African"],
    portfolioCompanies: ["Paystack", "MDaaS Global", "Reliance Health"],
    keyPartners: [
      {
        name: "Kola Aina",
        title: "Founding Partner",
        image: "https://placehold.co/100x100/2C5282/FFFFFF?text=KA"
      }
    ],
    contactInfo: {
      email: "info@venturesplatform.com",
      twitter: "VPlatformHub",
      linkedin: "ventures-platform"
    }
  },
  {
    id: "5",
    name: "Future Africa",
    logo: "https://placehold.co/100x100/38A169/FFFFFF?text=FA",
    description: "Future Africa is a venture capital firm investing in mission-driven founders building Africa's future.",
    website: "https://future.africa",
    headquarters: "Lagos, Nigeria",
    foundedYear: 2019,
    investmentFocus: ["Pre-seed", "Seed"],
    industries: ["Fintech", "Healthtech", "Edtech", "Energy", "Logistics"],
    stagePreference: ["Pre-seed", "Seed"],
    ticketSize: "$50K-$250K",
    regionsOfInterest: ["Pan-African"],
    portfolioCompanies: ["54gene", "Bamboo", "Eden Life"],
    keyPartners: [
      {
        name: "Iyin Aboyeji",
        title: "Founder & General Partner",
        image: "https://placehold.co/100x100/38A169/FFFFFF?text=IA"
      }
    ],
    contactInfo: {
      email: "info@future.africa",
      twitter: "FutureAfrica_",
      linkedin: "future-africa"
    }
  }
];

export const industries = [
  "Fintech", "Healthtech", "Edtech", "Agritech", "Logistics", 
  "E-commerce", "Energy", "Enterprise Software", "Media & Entertainment",
  "Essential Services", "Food & Agriculture", "Financial Services"
];

export const stages = [
  "Pre-seed", "Seed", "Early Stage", "Series A", "Series B", "Growth"
];

export const regions = [
  "East Africa", "West Africa", "North Africa", "Southern Africa", "Central Africa", "Pan-African"
];
