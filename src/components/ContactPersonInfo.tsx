
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
  if (!contactPerson) return null;

  return (
    <div className="space-y-4 pt-4 border-t">
      <h3 className="font-medium text-lg">Contact Person</h3>
      
      {/* Contact Person Name */}
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-500" />
          <span>{contactPerson.name}</span>
        </div>
      </div>
      
      {/* Contact Person Email */}
      {contactPerson.email && (
        <div className="flex items-center justify-between rounded-lg border p-3">
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
        <div className="flex items-center justify-between rounded-lg border p-3">
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
        <div className="flex items-center justify-between rounded-lg border p-3">
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
