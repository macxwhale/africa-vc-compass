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
  contactPerson?: {
    name: string;
    email: string;
    linkedinUrl?: string;
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
      email: "info@thevccompass",
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
      email: "info@thevccompass",
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
      email: "info@thevccompass",
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
      email: "info@thevccompass",
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
      email: "info@thevccompass",
      twitter: "FutureAfrica_",
      linkedin: "future-africa"
    }
  },
  {
    id: "6",
    name: "Antler East Africa",
    logo: "https://placehold.co/100x100/4C51BF/FFFFFF?text=AEA",
    description: "Antler is a global early-stage venture capital firm that invests in exceptional founders building the defining companies of tomorrow.",
    website: "https://www.antler.co/locations/nairobi",
    headquarters: "Nairobi, Kenya",
    foundedYear: 2018,
    investmentFocus: ["Pre-seed", "Seed"],
    industries: ["Fintech", "Agritech", "Healthtech", "Logistics", "E-commerce"],
    stagePreference: ["Pre-seed", "Seed"],
    ticketSize: "$100K-$500K",
    regionsOfInterest: ["East Africa"],
    portfolioCompanies: ["Marketforce", "Honeycoin", "Digiduka"],
    keyPartners: [
      {
        name: "Selam Kebede",
        title: "Partner",
        image: "https://placehold.co/100x100/4C51BF/FFFFFF?text=SK"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "antlereastafrica",
      linkedin: "antler-east-africa"
    }
  },
  {
    id: "7",
    name: "Partech Africa",
    logo: "https://placehold.co/100x100/667EEA/FFFFFF?text=PA",
    description: "Partech Africa is the African arm of Partech, a global investment platform for tech and digital companies, focusing on Series A and B investments.",
    website: "https://partechpartners.com/",
    headquarters: "Nairobi, Kenya & Dakar, Senegal",
    foundedYear: 2015,
    investmentFocus: ["Series A", "Series B", "Growth"],
    industries: ["Fintech", "Insurtech", "Enterprise Software", "Mobility", "E-commerce"],
    stagePreference: ["Series A", "Series B"],
    ticketSize: "$1M-$15M",
    regionsOfInterest: ["East Africa", "West Africa", "Pan-African"],
    portfolioCompanies: ["TradeDepot", "Yoco", "Wave", "Terrapay", "Tugende"],
    keyPartners: [
      {
        name: "Tidjane Deme",
        title: "General Partner",
        image: "https://placehold.co/100x100/667EEA/FFFFFF?text=TD"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "PartechPartners",
      linkedin: "partech-partners"
    }
  },
  {
    id: "8",
    name: "Equator VC",
    logo: "https://placehold.co/100x100/4299E1/FFFFFF?text=EQ",
    description: "Equator VC invests in early-stage startups that leverage technology to solve critical challenges across East Africa.",
    website: "https://equator.vc",
    headquarters: "Kampala, Uganda",
    foundedYear: 2017,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Healthtech", "Edtech", "Clean Energy", "Financial Inclusion"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$250K-$2M",
    regionsOfInterest: ["East Africa"],
    portfolioCompanies: ["Motorcycle Health", "SolarPesa", "LearnConnect", "AgriValue"],
    keyPartners: [
      {
        name: "Joshua Wanyama",
        title: "Managing Partner",
        image: "https://placehold.co/100x100/4299E1/FFFFFF?text=JW"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "equatorvc",
      linkedin: "equator-vc"
    }
  },
  {
    id: "9",
    name: "4Di Capital",
    logo: "https://placehold.co/100x100/2C5282/FFFFFF?text=4Di",
    description: "4Di Capital is an independent venture capital firm based in South Africa's Western Cape, with a focus on investing in early-stage technology ventures.",
    website: "https://4dicapital.com",
    headquarters: "Cape Town, South Africa",
    foundedYear: 2009,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Fintech", "Healthtech", "Insuretech", "Agritech"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$250K-$5M",
    regionsOfInterest: ["East Africa", "Southern Africa"],
    portfolioCompanies: ["Aerobotics", "LifeQ", "Lumkani", "Silvertree"],
    keyPartners: [
      {
        name: "Justin Stanford",
        title: "Co-Founding Partner",
        image: "https://placehold.co/100x100/2C5282/FFFFFF?text=JS"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "4dicapital",
      linkedin: "4di-capital"
    }
  },
  {
    id: "10",
    name: "Atlantica Ventures",
    logo: "https://placehold.co/100x100/2B6CB0/FFFFFF?text=AV",
    description: "Atlantica Ventures is a seed fund focused on tech-enabled businesses across Sub-Saharan Africa, partnering with founders building sustainable growth companies.",
    website: "https://atlantica.vc",
    headquarters: "Nairobi, Kenya",
    foundedYear: 2019,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Fintech", "Logistics", "Agritech", "Health"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$200K-$1M",
    regionsOfInterest: ["East Africa", "West Africa"],
    portfolioCompanies: ["Sendy", "OnePipe", "betPawa", "Curacel"],
    keyPartners: [
      {
        name: "Aniko Szigetvari",
        title: "Founding Partner",
        image: "https://placehold.co/100x100/2B6CB0/FFFFFF?text=AS"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      linkedin: "atlantica-ventures"
    }
  },
  {
    id: "11",
    name: "Microtraction",
    logo: "https://placehold.co/100x100/38A169/FFFFFF?text=MT",
    description: "Microtraction is an early-stage venture capital firm that invests in remarkable African tech entrepreneurs solving important problems.",
    website: "https://microtraction.com",
    headquarters: "Lagos, Nigeria",
    foundedYear: 2017,
    investmentFocus: ["Pre-seed"],
    industries: ["Fintech", "SaaS", "Healthtech", "Edtech", "E-commerce"],
    stagePreference: ["Pre-seed"],
    ticketSize: "$50K-$150K",
    regionsOfInterest: ["West Africa"],
    portfolioCompanies: ["54gene", "Cowrywise", "ThankUCash", "Buycoins"],
    keyPartners: [
      {
        name: "Kwamena Afful",
        title: "Managing Partner",
        image: "https://placehold.co/100x100/38A169/FFFFFF?text=KA"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "microtraction",
      linkedin: "microtraction"
    }
  },
  {
    id: "12",
    name: "Ingressive Capital",
    logo: "https://placehold.co/100x100/276749/FFFFFF?text=IC",
    description: "Ingressive Capital is a $10 million VC fund targeting early-stage startups across Sub-Saharan Africa's B2B and technology markets.",
    website: "https://ingressivecapital.com",
    headquarters: "Lagos, Nigeria",
    foundedYear: 2017,
    investmentFocus: ["Seed"],
    industries: ["Fintech", "Mobility", "Edtech", "Enterprise SaaS"],
    stagePreference: ["Seed"],
    ticketSize: "$200K-$400K",
    regionsOfInterest: ["West Africa", "Pan-African"],
    portfolioCompanies: ["Paystack", "Tizeti", "Bamboo", "Mono"],
    keyPartners: [
      {
        name: "Maya Horgan Famodu",
        title: "Founder & Partner",
        image: "https://placehold.co/100x100/276749/FFFFFF?text=MH"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "ingressivecap",
      linkedin: "ingressive-capital"
    }
  },
  {
    id: "13",
    name: "GreenTec Capital Partners",
    logo: "https://placehold.co/100x100/48BB78/FFFFFF?text=GC",
    description: "GreenTec Capital Partners is a long-term investor that joins forces with entrepreneurs to grow sustainable businesses throughout Africa.",
    website: "https://greentec-capital.com",
    headquarters: "Frankfurt, Germany & Accra, Ghana",
    foundedYear: 2015,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Agritech", "Cleantech", "Smart Logistics", "E-commerce"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$100K-$500K",
    regionsOfInterest: ["West Africa", "North Africa", "East Africa"],
    portfolioCompanies: ["Farmcrowdy", "ARED", "Bismart", "Powerstove"],
    keyPartners: [
      {
        name: "Erick Yong",
        title: "Co-Founder & CEO",
        image: "https://placehold.co/100x100/48BB78/FFFFFF?text=EY"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "GreentecCapital",
      linkedin: "greentec-capital-partners"
    }
  },
  {
    id: "14",
    name: "Kepple Africa Ventures",
    logo: "https://placehold.co/100x100/68D391/FFFFFF?text=KA",
    description: "Kepple Africa Ventures is a seed investment fund focused on providing early-stage funding to tech startups with scalable business models across Africa.",
    website: "https://africa.kepple.vc",
    headquarters: "Lagos, Nigeria & Nairobi, Kenya",
    foundedYear: 2018,
    investmentFocus: ["Seed"],
    industries: ["Fintech", "Logistics", "Healthtech", "Agritech", "E-commerce"],
    stagePreference: ["Seed"],
    ticketSize: "$50K-$150K",
    regionsOfInterest: ["West Africa", "East Africa"],
    portfolioCompanies: ["Bamboo", "Helium Health", "Decagon", "Sent.io"],
    keyPartners: [
      {
        name: "Takahiro Kanzaki",
        title: "Managing Director",
        image: "https://placehold.co/100x100/68D391/FFFFFF?text=TK"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "KeppleAfrica",
      linkedin: "kepple-africa-ventures"
    }
  },
  {
    id: "15",
    name: "Lateral Capital",
    logo: "https://placehold.co/100x100/9AE6B4/FFFFFF?text=LC",
    description: "Lateral Capital is an Africa-focused venture fund dedicated to providing growth capital to early-stage businesses that deliver practical products and services.",
    website: "https://lateral.capital",
    headquarters: "Lagos, Nigeria & New York, USA",
    foundedYear: 2014,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Financial Services", "Healthcare", "Education", "Employment"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$250K-$1M",
    regionsOfInterest: ["West Africa", "Pan-African"],
    portfolioCompanies: ["Mono", "Max.ng", "BFREE", "Seamless HR"],
    keyPartners: [
      {
        name: "Rob Eloff",
        title: "Managing Partner",
        image: "https://placehold.co/100x100/9AE6B4/FFFFFF?text=RE"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      linkedin: "lateral-capital"
    }
  },
  {
    id: "16",
    name: "Algebra Ventures",
    logo: "https://placehold.co/100x100/F56565/FFFFFF?text=AV",
    description: "Algebra Ventures is a leading venture capital firm in Egypt focusing on Series A investments in high-growth tech startups.",
    website: "https://algebraventures.com",
    headquarters: "Cairo, Egypt",
    foundedYear: 2016,
    investmentFocus: ["Series A", "Series B"],
    industries: ["Fintech", "E-commerce", "Transport & Logistics", "Healthcare"],
    stagePreference: ["Series A", "Series B"],
    ticketSize: "$500K-$2M",
    regionsOfInterest: ["North Africa"],
    portfolioCompanies: ["Halan", "Elmenus", "Khazna", "Trella"],
    keyPartners: [
      {
        name: "Tarek Assaad",
        title: "Managing Partner",
        image: "https://placehold.co/100x100/F56565/FFFFFF?text=TA"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "algebraventures",
      linkedin: "algebra-ventures"
    }
  },
  {
    id: "17",
    name: "Sawari Ventures",
    logo: "https://placehold.co/100x100/FC8181/FFFFFF?text=SV",
    description: "Sawari Ventures is a leading venture capital firm investing in technology companies throughout the Middle East and North Africa.",
    website: "https://sawariventures.com",
    headquarters: "Cairo, Egypt",
    foundedYear: 2010,
    investmentFocus: ["Series A", "Series B"],
    industries: ["Fintech", "Edtech", "Healthtech", "Enterprise SaaS"],
    stagePreference: ["Series A", "Series B"],
    ticketSize: "$1M-$5M",
    regionsOfInterest: ["North Africa"],
    portfolioCompanies: ["Swvl", "MoneyFellows", "Si-Ware", "Instabug"],
    keyPartners: [
      {
        name: "Ahmed El Alfi",
        title: "Founder & Chairman",
        image: "https://placehold.co/100x100/FC8181/FFFFFF?text=AE"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      linkedin: "sawari-ventures"
    }
  },
  {
    id: "18",
    name: "Flat6Labs",
    logo: "https://placehold.co/100x100/FEB2B2/FFFFFF?text=F6L",
    description: "Flat6Labs is a regional early-stage venture capital firm that manages seed funds in North Africa, offering funding and mentorship to innovative startups.",
    website: "https://flat6labs.com",
    headquarters: "Cairo, Egypt & Tunis, Tunisia",
    foundedYear: 2011,
    investmentFocus: ["Pre-seed", "Seed"],
    industries: ["Fintech", "Edtech", "Healthtech", "E-commerce", "Logistics"],
    stagePreference: ["Pre-seed", "Seed"],
    ticketSize: "$50K-$200K",
    regionsOfInterest: ["North Africa"],
    portfolioCompanies: ["Instabug", "Mintrics", "Mumm", "Harmonica"],
    keyPartners: [
      {
        name: "Ramez El-Serafy",
        title: "CEO",
        image: "https://placehold.co/100x100/FEB2B2/FFFFFF?text=RS"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "Flat6Labs",
      linkedin: "flat6labs"
    }
  },
  {
    id: "19",
    name: "Disruptech",
    logo: "https://placehold.co/100x100/FED7D7/FFFFFF?text=DT",
    description: "Disruptech is an Egypt-focused fintech fund supporting early-stage startups that are transforming the financial landscape in Egypt and the region.",
    website: "https://disruptech.vc",
    headquarters: "Cairo, Egypt",
    foundedYear: 2019,
    investmentFocus: ["Pre-seed", "Seed", "Series A"],
    industries: ["Fintech", "Insurtech", "Proptech", "Financial Inclusion"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$500K-$2M",
    regionsOfInterest: ["North Africa"],
    portfolioCompanies: ["Khazna", "Lucky", "Amenli", "Fatura"],
    keyPartners: [
      {
        name: "Mohamed Okasha",
        title: "Managing Partner",
        image: "https://placehold.co/100x100/FED7D7/FFFFFF?text=MO"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      linkedin: "disruptech"
    }
  },
  {
    id: "20",
    name: "Outlierz Ventures",
    logo: "https://placehold.co/100x100/F687B3/FFFFFF?text=OV",
    description: "Outlierz Ventures is a Morocco-based VC fund focused on early-stage investments in tech-enabled companies across Francophone Africa.",
    website: "https://outlierz.co",
    headquarters: "Casablanca, Morocco",
    foundedYear: 2017,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Fintech", "Logistics", "Agritech", "Mobility", "B2B Marketplaces"],
    stagePreference: ["Seed"],
    ticketSize: "$50K-$500K",
    regionsOfInterest: ["North Africa", "West Africa"],
    portfolioCompanies: ["WaystoCap", "Sokowatch", "MaxAB", "Yassir"],
    keyPartners: [
      {
        name: "Kenza Lahlou",
        title: "Founding Partner",
        image: "https://placehold.co/100x100/F687B3/FFFFFF?text=KL"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "OutlierzV",
      linkedin: "outlierz-ventures"
    }
  },
  {
    id: "21",
    name: "Knife Capital",
    logo: "https://placehold.co/100x100/ED8936/FFFFFF?text=KC",
    description: "Knife Capital is a venture capital firm that focuses on innovation-driven ventures with proven traction, helping them become sustainable and successful African businesses.",
    website: "https://knifecap.com",
    headquarters: "Cape Town, South Africa",
    foundedYear: 2010,
    investmentFocus: ["Series A"],
    industries: ["Fintech", "Healthtech", "Edtech", "Agritech", "Enterprise Software"],
    stagePreference: ["Series A"],
    ticketSize: "$1M-$5M",
    regionsOfInterest: ["Southern Africa"],
    portfolioCompanies: ["DataProphet", "Aerobotics", "PharmaScout", "SnapScan"],
    keyPartners: [
      {
        name: "Keet van Zyl",
        title: "Co-Founder & Partner",
        image: "https://placehold.co/100x100/ED8936/FFFFFF?text=KV"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "KnifeCap",
      linkedin: "knife-capital"
    }
  },
  {
    id: "22",
    name: "Naspers Foundry",
    logo: "https://placehold.co/100x100/F6AD55/FFFFFF?text=NF",
    description: "Naspers Foundry is a South African-focused, early-stage business investment vehicle that aims to fund local technology entrepreneurs and startups.",
    website: "https://naspers.com/foundry",
    headquarters: "Cape Town, South Africa",
    foundedYear: 2018,
    investmentFocus: ["Series A", "Series B"],
    industries: ["E-commerce", "Food Delivery", "Fintech", "Edtech", "Mobility"],
    stagePreference: ["Series A", "Series B"],
    ticketSize: "$2M-$10M",
    regionsOfInterest: ["Southern Africa"],
    portfolioCompanies: ["SweepSouth", "Aerobotics", "Food Supply Network", "WhereIsMyTransport"],
    keyPartners: [
      {
        name: "Fabian Whate",
        title: "Head of Naspers Foundry",
        image: "https://placehold.co/100x100/F6AD55/FFFFFF?text=FW"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      linkedin: "naspers"
    }
  },
  {
    id: "23",
    name: "Kalon Venture Partners",
    logo: "https://placehold.co/100x100/FBD38D/FFFFFF?text=KV",
    description: "Kalon Venture Partners is a venture capital fund investing in disruptive digital technologies solving African problems with global relevance.",
    website: "https://kalonvp.com",
    headquarters: "Johannesburg, South Africa",
    foundedYear: 2016,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Fintech", "Healthtech", "Insuretech", "Proptech"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$250K-$1.5M",
    regionsOfInterest: ["Southern Africa", "Pan-African"],
    portfolioCompanies: ["Ozow", "Flow", "FinChatBot", "Sendmarc"],
    keyPartners: [
      {
        name: "Clive Butkow",
        title: "CEO",
        image: "https://placehold.co/100x100/FBD38D/FFFFFF?text=CB"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "KalonVP",
      linkedin: "kalon-venture-partners"
    }
  },
  {
    id: "24",
    name: "Chandaria Capital",
    logo: "https://placehold.co/100x100/4FD1C5/FFFFFF?text=CC",
    description: "Chandaria Capital is the investment arm of Chandaria Industries, focusing on early-stage technology startups across East Africa.",
    website: "https://chandariacapital.com",
    headquarters: "Nairobi, Kenya",
    foundedYear: 2017,
    investmentFocus: ["Seed", "Series A"],
    industries: ["Fintech", "Healthtech", "E-commerce", "Logistics", "Cleantech"],
    stagePreference: ["Seed", "Series A"],
    ticketSize: "$100K-$1M",
    regionsOfInterest: ["East Africa"],
    portfolioCompanies: ["Sokowatch", "Kobo360", "Ilara Health", "Turaco"],
    keyPartners: [
      {
        name: "Darshan Chandaria",
        title: "CEO",
        image: "https://placehold.co/100x100/4FD1C5/FFFFFF?text=DC"
      }
    ],
    contactInfo: {
      email: "info@thevccompass",
      twitter: "chandariafund",
      linkedin: "chandaria-capital"
    }
  },
  {
    id: "25",
    name: "Unconventional Capital",
    logo: "https://placehold.co/100x100/2DD4BF/FFFFFF?text=UC",
    description: "Unconventional Capital provides accessible capital to early-stage entrepreneurs in East Africa through a data-driven, automated approach.",
    website: "https://unconventional.capital",
    headquarters: "Kigali, Rwanda",
    foundedYear: 2016,
    investmentFocus: ["Pre-seed", "Seed"],
    industries: ["Financial Inclusion", "Agritech", "Retail Tech", "SME Solutions"],
    stagePreference: ["Pre-seed", "Seed"],
    ticketSize: "$25K-$100K",
    regionsOfInterest: ["East Africa"],
    portfolioCompanies: ["Numida", "Kibanda TopUp", "M-Shule", "Teheca"],
    keyPartners: [
      {
        name
