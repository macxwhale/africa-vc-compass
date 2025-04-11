
import { VCFirm } from './types';

export const vcFirms: VCFirm[] = [
  {
    id: "1",
    name: "Ventures Platform",
    logo: "https://placehold.co/100x100/1A365D/FFFFFF?text=VP",
    description: "Ventures Platform is a Pan-African early-stage fund supporting innovation across Africa by providing pre-seed and seed funding alongside deep support.",
    website: "https://venturesplatform.com",
    headquarters: "Lagos, Nigeria",
    foundedYear: 2016,
    investmentFocus: ["Pre-seed", "Seed"],
    industries: ["Fintech", "Healthtech", "Enterprise Software", "Edtech"],
    stagePreference: ["Pre-seed", "Seed"],
    ticketSize: "$100K-$500K",
    regionsOfInterest: ["West Africa", "Pan-African"],
    portfolioCompanies: ["Paystack", "Seamless HR", "Piggyvest", "MDaaS Global"],
    keyPartners: [
      {
        name: "Kola Aina",
        image: "https://placehold.co/100x100/1A365D/FFFFFF?text=KA",
        title: "General Partner"
      }
    ],
    contactInfo: {
      email: "info@venturesplatform.com",
      twitter: "vplatformhub",
      linkedin: "ventures-platform"
    },
    contactPerson: {
      name: "Investment Team",
      email: "investments@venturesplatform.com"
    }
  },
  {
    id: "2",
    name: "TLcom Capital",
    logo: "https://placehold.co/100x100/1A365D/FFFFFF?text=TL",
    description: "TLcom Capital is a venture capital firm focused on investments in technology-enabled services across Africa.",
    website: "https://tlcomcapital.com",
    headquarters: "London, UK / Nairobi, Kenya / Lagos, Nigeria",
    foundedYear: 1999,
    investmentFocus: ["Series A", "Series B"],
    industries: ["Fintech", "Logistics", "E-commerce", "Enterprise Software"],
    stagePreference: ["Series A", "Series B"],
    ticketSize: "$1M-$10M",
    regionsOfInterest: ["East Africa", "West Africa", "Pan-African"],
    portfolioCompanies: ["Andela", "Twiga Foods", "Kobo360", "uLesson"],
    keyPartners: [
      {
        name: "Maurizio Caio",
        title: "Managing Partner"
      }
    ],
    contactInfo: {
      email: "info@tlcomcapital.com",
      linkedin: "tlcom-capital"
    },
    contactPerson: {
      name: "Investment Team",
      email: "info@tlcomcapital.com",
      linkedinUrl: "https://www.linkedin.com/company/tlcom-capital"
    }
  },
  {
    id: "3",
    name: "Partech Africa",
    logo: "https://placehold.co/100x100/1A365D/FFFFFF?text=PA",
    description: "Partech Africa is the largest VC fund focused exclusively on tech startups in Africa, with a particular focus on financial inclusion, supply chain, mobility, and healthcare.",
    website: "https://partechpartners.com/africa-fund",
    headquarters: "Dakar, Senegal / Nairobi, Kenya",
    foundedYear: 2018,
    investmentFocus: ["Series A", "Series B"],
    industries: ["Fintech", "Logistics", "Mobility", "Healthtech"],
    stagePreference: ["Series A", "Series B", "Growth"],
    ticketSize: "$3M-$15M",
    regionsOfInterest: ["Pan-African"],
    portfolioCompanies: ["Wave", "TradeDepot", "Yoco", "PiggyVest"],
    keyPartners: [
      {
        name: "Tidjane Dème",
        title: "General Partner"
      },
      {
        name: "Cyril Collon",
        title: "General Partner"
      }
    ],
    contactInfo: {
      email: "africa@partechpartners.com",
      twitter: "PartechPartners",
      linkedin: "partech-partners"
    },
    contactPerson: {
      name: "Investment Team",
      email: "africa@partechpartners.com",
      linkedinUrl: "https://www.linkedin.com/showcase/partech-africa"
    }
  }
];
