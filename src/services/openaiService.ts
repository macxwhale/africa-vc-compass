
import { toast } from "@/hooks/use-toast";

interface ResearchVCFirmResponse {
  name: string;
  description: string;
  headquarters: string;
  website?: string;
  foundedYear?: number;
  industries: string[];
  regionsOfInterest: string[];
  stagePreference: string[];
  ticketSize?: string;
  contactEmail?: string;
}

export const openaiService = {
  async researchVCFirm(query: string): Promise<ResearchVCFirmResponse | null> {
    try {
      // Check if API key is available
      const apiKey = localStorage.getItem("openai_api_key");
      
      if (!apiKey) {
        toast({
          title: "API Key Missing",
          description: "Please set your OpenAI API key in the settings",
          variant: "destructive",
        });
        return null;
      }

      const systemPrompt = `You are a helpful assistant that researches venture capital firms in Africa. 
      Respond with ONLY a JSON object containing the following information about the VC firm:
      - name: string (required)
      - description: string (required, at least 100 characters)
      - headquarters: string (required)
      - website: string (optional)
      - foundedYear: number (optional)
      - industries: string[] (required, at least 1 industry)
      - regionsOfInterest: string[] (required, at least 1 region from: East Africa, West Africa, North Africa, Southern Africa, Central Africa, Pan-African)
      - stagePreference: string[] (required, at least 1 stage from: Pre-seed, Seed, Early Stage, Series A, Series B, Growth)
      - ticketSize: string (optional)
      - contactEmail: string (optional)
      
      DO NOT include any explanations, notes or other text outside the JSON object.`;

      console.log("Making OpenAI API request for VC research...");
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
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
