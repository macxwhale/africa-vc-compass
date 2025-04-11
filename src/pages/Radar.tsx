
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter, Globe, User, Phone, Copy } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { VCFirm } from "@/data/vcData";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Radar = () => {
  const { vcFirms } = useData();
  const [selectedFirm, setSelectedFirm] = useState<VCFirm | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Shoot Your Shot</h1>
      <p className="text-gray-600 mb-8">
        Find contact information for VC firms across Africa and connect with potential investors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Select a VC Firm</CardTitle>
              <CardDescription>
                Choose a firm to view their contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => {
                const firm = vcFirms.find(f => f.id === value);
                setSelectedFirm(firm || null);
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a VC firm" />
                </SelectTrigger>
                <SelectContent>
                  {vcFirms.map((firm) => (
                    <SelectItem key={firm.id} value={firm.id}>
                      {firm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedFirm && (
            <div className="mt-8">
              <Link to={`/vc/${selectedFirm.id}`}>
                <Button variant="outline" className="w-full">
                  View Full VC Profile
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="md:col-span-7">
          {selectedFirm ? (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {selectedFirm.logo && (
                    <img 
                      src={selectedFirm.logo} 
                      alt={`${selectedFirm.name} logo`} 
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <div>
                    <CardTitle>{selectedFirm.name}</CardTitle>
                    <CardDescription>{selectedFirm.headquarters}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* General Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">General Contact</h3>

                  {selectedFirm.contactInfo?.email && (
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span>{selectedFirm.contactInfo.email}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(selectedFirm.contactInfo.email, 'Email')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {selectedFirm.website && (
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-gray-500" />
                        <span>{selectedFirm.website}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => copyToClipboard(selectedFirm.website, 'Website')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(selectedFirm.website, '_blank')}
                        >
                          Visit
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedFirm.contactInfo?.twitter && (
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <Twitter className="h-5 w-5 text-gray-500" />
                        <span>@{selectedFirm.contactInfo.twitter}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://twitter.com/${selectedFirm.contactInfo.twitter}`, '_blank')}
                      >
                        Visit
                      </Button>
                    </div>
                  )}

                  {selectedFirm.contactInfo?.linkedin && (
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <Linkedin className="h-5 w-5 text-gray-500" />
                        <span>{selectedFirm.contactInfo.linkedin}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://linkedin.com/company/${selectedFirm.contactInfo.linkedin}`, '_blank')}
                      >
                        Visit
                      </Button>
                    </div>
                  )}
                </div>

                {/* Contact Person */}
                {selectedFirm.contactPerson && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-lg">Contact Person</h3>
                    
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <span>{selectedFirm.contactPerson.name}</span>
                      </div>
                    </div>
                    
                    {selectedFirm.contactPerson.email && (
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <span>{selectedFirm.contactPerson.email}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => copyToClipboard(selectedFirm.contactPerson.email, 'Email')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    {selectedFirm.contactPerson.linkedinUrl && (
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center space-x-3">
                          <Linkedin className="h-5 w-5 text-gray-500" />
                          <span>LinkedIn Profile</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(selectedFirm.contactPerson.linkedinUrl, '_blank')}
                        >
                          Visit
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-6">
                  <p className="text-sm text-gray-500 italic">
                    Not seeing the right contact information? Try viewing the firm's full profile for more details.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Select a VC firm to view their contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <User className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Choose a venture capital firm from the dropdown to see their contact information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Radar;
