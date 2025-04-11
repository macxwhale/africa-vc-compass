
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { openaiService } from "@/services/openaiService";
import { useData } from "@/contexts/DataContext";
import { Loader2, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
  const { submitVCFirm } = useData();

  // Check if API key exists on component mount
  useState(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (!savedApiKey) {
      setApiKeyDialogOpen(true);
    }
  });

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid OpenAI API key",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("openai_api_key", apiKey.trim());
    setApiKeyDialogOpen(false);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved",
    });
  };

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a VC firm name to research",
        variant: "destructive",
      });
      return;
    }
    
    setIsResearching(true);
    
    try {
      const vcData = await openaiService.researchVCFirm(query);
      
      if (vcData) {
        // Submit the researched VC firm to pending queue
        await submitVCFirm({
          name: vcData.name,
          logo: "/placeholder.svg", // Use placeholder logo
          description: vcData.description,
          website: vcData.website,
          headquarters: vcData.headquarters,
          foundedYear: vcData.foundedYear,
          investmentFocus: [], // Not available from research
          industries: vcData.industries,
          stagePreference: vcData.stagePreference,
          ticketSize: vcData.ticketSize,
          regionsOfInterest: vcData.regionsOfInterest,
          portfolioCompanies: [], // Not available from research
          keyPartners: [], // Not available from research
          contactInfo: {
            email: vcData.contactEmail || "",
          },
          contactPerson: undefined
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
          <form onSubmit={handleResearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query">VC Firm Name or Keywords</Label>
              <Input
                id="query"
                placeholder="e.g., Future Africa, Nigerian fintech investors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isResearching}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={openApiKeyDialog}
            type="button"
          >
            Configure API Key
          </Button>
          <Button 
            onClick={handleResearch}
            disabled={isResearching}
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
              Enter your OpenAI API key to enable the research tool. The key will be stored in your browser's local storage.
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
            <Button type="button" onClick={saveApiKey}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
