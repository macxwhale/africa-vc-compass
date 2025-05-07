
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { openaiService } from "@/services/openaiService";
import { useData } from "@/contexts/DataContext";
import { Loader2, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabaseService } from "@/services/supabaseService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AIResearchForm() {
  const [query, setQuery] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { submitVCFirm } = useData();

  // Check if API key exists on component mount
  useEffect(() => {
    const checkApiKey = async () => {
      setIsLoading(true);
      // Try to get API key from Supabase first
      const storedApiKey = await supabaseService.getOpenAIApiKey();
      
      if (storedApiKey) {
        // Store in localStorage for immediate use
        localStorage.setItem("openai_api_key", storedApiKey);
      } else {
        // Fall back to localStorage if not in Supabase
        const localApiKey = localStorage.getItem("openai_api_key");
        if (!localApiKey) {
          setApiKeyDialogOpen(true);
        }
      }
      setIsLoading(false);
    };
    
    checkApiKey();
  }, []);

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid OpenAI API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Save to localStorage for immediate use
    localStorage.setItem("openai_api_key", apiKey.trim());
    
    // Also save to Supabase if connected
    if (supabaseService.isSupabaseConfigured()) {
      try {
        await supabaseService.saveOpenAIApiKey(apiKey.trim());
        toast({
          title: "API Key Saved",
          description: "Your OpenAI API key has been saved to the database",
        });
      } catch (error) {
        console.error("Failed to save API key to Supabase:", error);
        toast({
          title: "Warning",
          description: "API key saved locally but could not be saved to database",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "API Key Saved Locally",
        description: "Your OpenAI API key has been saved to local storage only",
      });
    }
    
    setApiKeyDialogOpen(false);
    setIsLoading(false);
  };

  const handleResearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Allow empty query - removed validation check
    
    setIsResearching(true);
    
    try {
      // Pass the query (which could be empty)
      const vcData = await openaiService.researchVCFirm(query);
      
      if (vcData) {
        // Map the API response to our VCFirm structure
        await submitVCFirm({
          name: vcData.name,
          logo: vcData.logo || "/placeholder.svg",
          description: vcData.description,
          website: vcData.website,
          headquarters: vcData.hqLocation || vcData.headquarters,
          foundedYear: vcData.foundedYear,
          investmentFocus: vcData.investmentStage || [],
          industries: vcData.industries || [],
          stagePreference: vcData.stagePreference || vcData.investmentStage || [],
          ticketSize: vcData.typicalTicketSize || vcData.ticketSize,
          regionsOfInterest: vcData.regionsOfInterest || [],
          portfolioCompanies: vcData.portfolioCompanies || [],
          keyPartners: vcData.keyPartners || [],
          linkedinUrl: vcData.linkedinUrl || "",
          twitterUrl: vcData.twitterUrl || "",
          contactPerson: vcData.contactPerson ? {
            name: vcData.contactPerson.name || "",
            email: vcData.contactPerson.email || "", 
            linkedinUrl: vcData.contactPerson.linkedinUrl || ""
          } : undefined
        });
        
        toast({
          title: "Research Successful",
          description: `${vcData.name} has been added to the pending queue`,
        });
        
        setQuery("");
      }
    } catch (error) {
      console.error("Research failed:", error);
      toast({
        title: "Research Failed",
        description: "Failed to research and add VC firm",
        variant: "destructive",
      });
    } finally {
      setIsResearching(false);
    }
  };

  const openApiKeyDialog = () => {
    setApiKeyDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>AI Research Tool</CardTitle>
          <CardDescription>
            Use ChatGPT to research and add VC firms to the pending queue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query">VC Firm Name or Keywords (Optional)</Label>
              <Input
                id="query"
                placeholder="e.g., Future Africa, Nigerian fintech investors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isResearching || isLoading}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={openApiKeyDialog}
            type="button"
            disabled={isLoading}
          >
            Configure API Key
          </Button>
          <Button 
            onClick={handleResearch}
            disabled={isResearching || isLoading}
          >
            {isResearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Researching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Research VC Firm
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>OpenAI API Key</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to enable the research tool. The key will be stored in the database and your browser's local storage.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setApiKeyDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveApiKey} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
