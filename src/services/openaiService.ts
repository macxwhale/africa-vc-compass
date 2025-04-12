
// Import the renamed supabaseService
import { supabaseService } from "@/services/supabaseService";
import { toast } from "@/hooks/use-toast";

interface ResearchVCFirmResponse {
  name: string;
  description: string;
  headquarters?: string;
  hqLocation?: string;
  website?: string;
  foundedYear?: number;
  industries: string[];
  regionsOfInterest: string[];
  stagePreference?: string[];
  investmentStage?: string[];
  ticketSize?: string;
  typicalTicketSize?: string;
  contactEmail?: string;
  contactPerson?: {
    name?: string;
    email?: string;
    linkedinUrl?: string;
  };
  linkedinUrl?: string;
  twitterUrl?: string;
  logo?: string;
  portfolioCompanies?: string[];
  keyPartners?: Array<{
    name: string;
    title: string;
    image?: string;
  }>;
  status?: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export const openaiService = {
  async getApiKey(): Promise<string | null> {
    // First try to get from localStorage for quick access
    let apiKey = localStorage.getItem("openai_api_key");
    
    // If not in localStorage but Supabase is configured, try to get from Supabase
    if (!apiKey && supabaseService.isSupabaseConfigured()) {
      try {
        apiKey = await supabaseService.getOpenAIApiKey();
        if (apiKey) {
          // Save to localStorage for future use
          localStorage.setItem("openai_api_key", apiKey);
        }
      } catch (error) {
        console.error("Error getting API key from Supabase:", error);
      }
    }
    
    return apiKey;
  },
  
  async researchVCFirm(query: string): Promise<ResearchVCFirmResponse | null> {
    try {
      // Get API key using the new method
      const apiKey = await this.getApiKey();
      
      if (!apiKey) {
        toast({
          title: "API Key Missing",
          description: "Please set your OpenAI API key in the settings",
          variant: "destructive",
        });
        return null;
      }

      const systemPrompt = `Research venture capital firms that invest in Africa. For each firm, present the data in the following JSON format. Fill in as many fields as possible based on available information. Do not include explanations—only output valid JSON objects for each VC firm:

{
  "name": "Example Capital",
  "website": "https://www.examplecapital.com",
  "hqLocation": "Nairobi, Kenya",
  "regionsOfInterest": ["Sub-Saharan Africa", "East Africa"],
  "industries": ["Fintech", "Agritech"],
  "investmentStage": ["Seed", "Series A"],
  "typicalTicketSize": "$100,000 - $1,000,000",
  "contactPerson": {
    "name": "Jane Doe",
    "email": "jane@examplecapital.com",
    "linkedinUrl": "https://www.linkedin.com/in/janedoe"
  },
  "description": "Example Capital is a VC firm focused on funding early-stage startups in emerging African markets.",
  "linkedinUrl": "https://www.linkedin.com/company/example-capital",
  "twitterUrl": "https://twitter.com/examplecapital",
  "logo": "https://www.examplecapital.com/logo.png",
  "foundedYear": 2015,
  "portfolioCompanies": ["Startup A", "Startup B"],
  "keyPartners": [
    {
      "name": "John Smith",
      "title": "Managing Partner",
      "image": "https://www.examplecapital.com/team/john.png"
    }
  ]
}`;

      console.log("Making OpenAI API request for VC research...");
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Research this African VC firm: ${query}` }
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error("No content returned from OpenAI");
      }

      // Parse the JSON response
      try {
        const parsedData = JSON.parse(content);
        return parsedData;
      } catch (parseError) {
        console.error("Failed to parse OpenAI response:", content);
        throw new Error("Failed to parse OpenAI response");
      }
      
    } catch (error) {
      console.error("OpenAI API call failed:", error);
      toast({
        title: "Research Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      return null;
    }
  }
};

