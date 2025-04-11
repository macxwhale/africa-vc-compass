import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/contexts/DataContext";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { VCFirm } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Calendar, Mail, Twitter, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const VCProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { vcFirms } = useData();
  const [vc, setVc] = useState<VCFirm | undefined>(undefined);
  
  useEffect(() => {
    // Find the VC firm by ID from context
    const foundVc = vcFirms.find((firm) => firm.id === id);
    setVc(foundVc);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, vcFirms]);
  
  if (!vc) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">VC Firm Not Found</h1>
            <p className="mb-8">The VC firm you're looking for does not exist in our directory.</p>
            <Button asChild>
              <Link to="/directory">Back to Directory</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-africa-blue text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-md overflow-hidden bg-white p-2">
                <img 
                  src={vc.logo} 
                  alt={`${vc.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:flex-grow text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold">{vc.name}</h1>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2">
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{vc.headquarters}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Founded {vc.foundedYear}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button asChild variant="outline" className="border-white bg-africa-gold text-white hover:bg-africa-blue hover:text-white">
                  <a href={vc.website} target="_blank" rel="noopener noreferrer">
                    Website <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="text-gray-700">{vc.description}</p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-xl font-bold mb-4">Investment Focus</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Industries</h3>
                      <div className="flex flex-wrap gap-2">
                        {vc.industries.map((industry) => (
                          <Badge key={industry} variant="outline" className="bg-green-50 text-africa-green border-africa-green">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Investment Stages</h3>
                      <div className="flex flex-wrap gap-2">
                        {vc.stagePreference.map((stage) => (
                          <Badge key={stage} variant="outline" className="bg-blue-50 text-africa-blue border-africa-blue">
                            {stage}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-2">Regions of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {vc.regionsOfInterest.map((region) => (
                        <Badge key={region} variant="outline" className="bg-amber-50 text-africa-gold border-africa-gold">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-2">Ticket Size</h3>
                    <Badge variant="secondary" className="text-base font-medium bg-africa-gold text-white hover:bg-africa-blue hover:text-white transition-colors">
                      {vc.ticketSize}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Portfolio Companies</h2>
                  
                  {vc.portfolioCompanies && vc.portfolioCompanies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {vc.portfolioCompanies.map((company) => (
                        <div key={company} className="p-3 border rounded-md text-center">
                          {company}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No portfolio companies listed.</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Key Team Members</h2>
                  
                  <div className="space-y-4">
                    {vc.keyPartners && vc.keyPartners.map((partner) => (
                      <div key={partner.name} className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                          {partner.image ? (
                            <img 
                              src={partner.image} 
                              alt={partner.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              {partner.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-gray-500">{partner.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  
                  {vc.contactInfo && (
                    <div className="space-y-3">
                      {vc.contactInfo.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <a href={`mailto:${vc.contactInfo.email}`} className="text-africa-blue hover:underline">
                            {vc.contactInfo.email}
                          </a>
                        </div>
                      )}
                      
                      {vc.contactInfo.twitter && (
                        <div className="flex items-center space-x-2">
                          <Twitter className="h-5 w-5 text-gray-500" />
                          <a 
                            href={`https://twitter.com/${vc.contactInfo.twitter}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-africa-blue hover:underline"
                          >
                            @{vc.contactInfo.twitter}
                          </a>
                        </div>
                      )}
                      
                      {vc.contactInfo.linkedin && (
                        <div className="flex items-center space-x-2">
                          <Linkedin className="h-5 w-5 text-gray-500" />
                          <a 
                            href={`https://linkedin.com/company/${vc.contactInfo.linkedin}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-africa-blue hover:underline"
                          >
                            LinkedIn
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VCProfile;
