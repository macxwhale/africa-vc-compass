
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter, Globe, User, Copy } from "lucide-react";
import { VCFirm } from "@/data/types";
import ContactPersonInfo from "./ContactPersonInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface ContactInfoDisplayProps {
  selectedFirm: VCFirm | null;
  onCopyToClipboard: (text: string, label: string) => void;
}

const ContactInfoDisplay = ({ selectedFirm, onCopyToClipboard }: ContactInfoDisplayProps) => {
  const [isDataReady, setIsDataReady] = useState(false);
  
  // Reset loading state when firm changes
  useEffect(() => {
    if (selectedFirm) {
      setIsDataReady(false);
      // Small delay to ensure data is fully loaded
      const timer = setTimeout(() => {
        setIsDataReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedFirm]);
  
  console.log("Contact Info Display - Selected Firm:", selectedFirm);
  
  if (!selectedFirm) {
    return (
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
    );
  }

  // Debug log for contact person data
  if (selectedFirm.contactPerson) {
    console.log("Contact Person:", JSON.stringify(selectedFirm.contactPerson, null, 2));
  } else {
    console.log("No contact person data available");
  }

  // Show skeleton while loading
  if (!isDataReady) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
        {/* Contact Person Section - Display this first if available */}
        {selectedFirm.contactPerson && (
          <ContactPersonInfo 
            contactPerson={selectedFirm.contactPerson} 
            onCopyToClipboard={onCopyToClipboard} 
          />
        )}

        {/* General Contact Information */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">General Firm Contact</h3>

          {selectedFirm.contactInfo && selectedFirm.contactInfo.email && (
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{selectedFirm.contactInfo.email}</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onCopyToClipboard(selectedFirm.contactInfo.email, 'Email')}
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
                  onClick={() => onCopyToClipboard(selectedFirm.website, 'Website')}
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

          {selectedFirm.contactInfo && selectedFirm.contactInfo.twitter && (
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

          {selectedFirm.contactInfo && selectedFirm.contactInfo.linkedin && (
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

        <div className="pt-6">
          <p className="text-sm text-gray-500 italic">
            Not seeing the right contact information? Try viewing the firm's full profile for more details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoDisplay;
