
import { Button } from "@/components/ui/button";
import { User, Mail, Linkedin, Phone, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  if (!contactPerson) return null;

  // Debug log to verify the contact person data
  console.log("Rendering ContactPersonInfo with data:", contactPerson);

  return (
    <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg flex items-center">
          <User className="h-5 w-5 mr-2 text-primary" />
          Personal Contact
          <Badge variant="outline" className="ml-3 bg-primary/10">Direct Contact</Badge>
        </h3>
      </div>
      
      {/* Contact Person Name */}
      <div className="flex items-center justify-between rounded-lg border bg-background p-3">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-500" />
          <span className="font-medium">{contactPerson.name}</span>
        </div>
      </div>
      
      {/* Contact Person Email */}
      {contactPerson.email && (
        <div className="flex items-center justify-between rounded-lg border bg-background p-3">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span>{contactPerson.email}</span>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onCopyToClipboard(contactPerson.email, 'Contact Person Email')}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Contact Person LinkedIn */}
      {contactPerson.linkedinUrl && (
        <div className="flex items-center justify-between rounded-lg border bg-background p-3">
          <div className="flex items-center space-x-3">
            <Linkedin className="h-5 w-5 text-gray-500" />
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

      {/* Contact Person Phone */}
      {contactPerson.phone && (
        <div className="flex items-center justify-between rounded-lg border bg-background p-3">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-500" />
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
    </div>
  );
};

export default ContactPersonInfo;
