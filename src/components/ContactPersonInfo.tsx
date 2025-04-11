
import { Button } from "@/components/ui/button";
import { User, Mail, Linkedin, Phone, Copy } from "lucide-react";

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
  console.log("ContactPersonInfo rendering with:", contactPerson);
  
  // Only return null if contactPerson is completely undefined or missing name
  if (!contactPerson || !contactPerson.name) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Contact Person Name */}
      <div className="flex items-center justify-between rounded-lg border bg-background p-3">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-africa-blue" />
          <span className="font-medium">{contactPerson.name}</span>
        </div>
      </div>
      
      {/* Contact Person Email */}
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
      
      {/* Contact Person Phone */}
      {contactPerson.phone && (
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
      
      {/* Contact Person LinkedIn */}
      {contactPerson.linkedinUrl && (
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
