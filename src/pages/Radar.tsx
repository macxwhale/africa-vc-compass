
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/contexts/DataContext";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Linkedin, Twitter } from "lucide-react";

const Radar = () => {
  const { vcFirms } = useData();
  const [selectedVc, setSelectedVc] = useState("");

  // Find the selected VC firm
  const selectedFirm = vcFirms.find(vc => vc.id === selectedVc);

  const handleContactClick = (type: string, value: string) => {
    if (type === "email") {
      window.location.href = `mailto:${value}`;
    } else if (type === "twitter") {
      window.open(`https://twitter.com/${value}`, "_blank");
    } else if (type === "linkedin") {
      window.open(`https://linkedin.com/company/${value}`, "_blank");
    }
    
    toast.success("Contact information copied!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-4">Get On Their Radar</h1>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Connect with venture capital firms that match your startup's profile. 
              Select a VC firm to view their contact information and get on their radar.
            </p>
            
            <div className="max-w-md mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a VC Firm
              </label>
              <Select value={selectedVc} onValueChange={setSelectedVc}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a VC firm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>VC Firms</SelectLabel>
                    {vcFirms.map((vc) => (
                      <SelectItem key={vc.id} value={vc.id}>
                        {vc.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {selectedFirm && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    {selectedFirm.logo && (
                      <img 
                        src={selectedFirm.logo} 
                        alt={`${selectedFirm.name} logo`}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-bold">{selectedFirm.name}</h2>
                      <p className="text-gray-500">{selectedFirm.headquarters}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      {selectedFirm.contactInfo.email && (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleContactClick("email", selectedFirm.contactInfo.email)}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          {selectedFirm.contactInfo.email}
                        </Button>
                      )}
                      
                      {selectedFirm.contactInfo.linkedin && (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleContactClick("linkedin", selectedFirm.contactInfo.linkedin)}
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          {selectedFirm.contactInfo.linkedin}
                        </Button>
                      )}
                      
                      {selectedFirm.contactInfo.twitter && (
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleContactClick("twitter", selectedFirm.contactInfo.twitter)}
                        >
                          <Twitter className="mr-2 h-4 w-4" />
                          @{selectedFirm.contactInfo.twitter}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">About {selectedFirm.name}</h3>
                    <p className="text-gray-600">{selectedFirm.description}</p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Investment Focus</h4>
                        <p className="text-sm text-gray-600">{selectedFirm.investmentFocus.join(", ")}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Industries</h4>
                        <p className="text-sm text-gray-600">{selectedFirm.industries.join(", ")}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Stage Preference</h4>
                        <p className="text-sm text-gray-600">{selectedFirm.stagePreference.join(", ")}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Ticket Size</h4>
                        <p className="text-sm text-gray-600">{selectedFirm.ticketSize}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {!selectedVc && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-gray-500">Select a VC firm to view their contact information</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Radar;
