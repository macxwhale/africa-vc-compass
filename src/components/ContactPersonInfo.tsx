
import { Button } from "@/components/ui/button";
import { User, Mail, Linkedin, Phone, Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface ContactPersonInfoProps {
  contactPerson: {
    name: string;
    email: string;
    linkedinUrl?: string;
    phone?: string;
  };
  onCopyToClipboard: (text: string, label: string) => void;
}

const ContactPersonInfo = ({ contactPerson, onCopyToClipboard }: ContactPersonInfoProps) => {
  // Add a loading state to prevent showing incomplete data
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Log to confirm what data is received by the component
  console.log("ContactPersonInfo rendering with:", JSON.stringify(contactPerson, null, 2));
  
  // Only return null if contactPerson is completely undefined or missing name
  if (!contactPerson || !contactPerson.name) {
    console.log("ContactPerson is missing or has no name, not rendering");
    return null;
  }

  // Use useEffect to delay rendering until data is confirmed loaded
  useEffect(() => {
    // This ensures we only show the component after the initial render
    // which prevents flashing of incomplete/dummy data
    setIsLoaded(true);
  }, [contactPerson.email]);

  // Show skeleton while loading
  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-background p-3">
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="rounded-lg border bg-background p-3">
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Contact Person Name - only shown if name exists */}
      {contactPerson.name && (
        <div className="flex items-center justify-between rounded-lg border bg-background p-3">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-africa-blue" />
            <span className="font-medium">{contactPerson.name}</span>
          </div>
        </div>
      )}
      
      {/* Contact Person Email - only shown if email exists */}
      {contactPerson.email && (
        <div className="flex items-center justify-between rounded-lg border bg-background p-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-africa-blue" />
            <a href={`mailto:${contactPerson.email}`} className="text-africa-blue hover:underline">
              {contactPerson.email}
            </a>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onCopyToClipboard(contactPerson.email, 'Email')}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Contact Person Phone - only shown if phone exists and is not empty */}
      {contactPerson.phone && contactPerson.phone.trim() !== "" && (
        <div className="flex items-center justify-between rounded-lg border bg-background p-3">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-africa-blue" />
            <span>{contactPerson.phone}</span>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onCopyToClipboard(contactPerson.phone, 'Phone Number')}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Contact Person LinkedIn - only shown if linkedinUrl exists and is not empty */}
      {contactPerson.linkedinUrl && contactPerson.linkedinUrl.trim() !== "" && (
        <div className="flex items-center justify-between rounded-lg border bg-background p-3">
          <div className="flex items-center space-x-3">
            <Linkedin className="h-5 w-5 text-africa-blue" />
            <span>LinkedIn Profile</span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.open(contactPerson.linkedinUrl, '_blank')}
          >
            Visit
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactPersonInfo;
