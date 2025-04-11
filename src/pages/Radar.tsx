
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
import { VCFirm } from "@/data/vcData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VCFirmSelector from "@/components/VCFirmSelector";
import ContactInfoDisplay from "@/components/ContactInfoDisplay";

const Radar = () => {
  const { vcFirms } = useData();
  const [selectedFirm, setSelectedFirm] = useState<VCFirm | null>(null);
  const { toast } = useToast();

  // Mock contact person data for testing
  const addContactPersonToFirm = (firm: VCFirm | null): VCFirm | null => {
    if (!firm) return null;
    
    // Add mock contact person data to specific firms for testing
    if (firm.id === "3") {
      return {
        ...firm,
        contactPerson: {
          name: "Maurizio Caio",
          email: "mcaio@tlcomcapital.com",
          linkedinUrl: "https://linkedin.com/in/maurizio-caio",
          phone: "+254 123 456 789"
        }
      };
    }
    
    if (firm.id === "4") {
      return {
        ...firm,
        contactPerson: {
          name: "Kola Aina",
          email: "kola@venturesplatform.com",
          linkedinUrl: "https://linkedin.com/in/kola-aina",
        }
      };
    }
    
    return firm;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  const handleSelectFirm = (firm: VCFirm | null) => {
    console.log("Selected firm:", firm);
    
    // Add contact person data to the firm
    const firmWithContact = addContactPersonToFirm(firm);
    
    if (firmWithContact && firmWithContact.contactPerson) {
      console.log("Contact person data:", firmWithContact.contactPerson);
    }
    
    setSelectedFirm(firmWithContact);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Shoot Your Shot</h1>
        <p className="text-gray-600 mb-8">
          Find contact information for VC firms across Africa and connect with potential investors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <VCFirmSelector 
            vcFirms={vcFirms} 
            selectedFirm={selectedFirm} 
            onSelectFirm={handleSelectFirm} 
          />

          <div className="md:col-span-7">
            <ContactInfoDisplay 
              selectedFirm={selectedFirm} 
              onCopyToClipboard={copyToClipboard} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Radar;
