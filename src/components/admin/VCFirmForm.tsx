
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useData } from "@/contexts/DataContext";
import { VCFirm, Person } from "@/data/vcData";

interface VCFirmFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingFirm: VCFirm | null;
  onSave: (firm: VCFirm) => void;
}

const defaultFirm: VCFirm = {
  id: "",
  name: "",
  logo: "https://placehold.co/100x100/1A365D/FFFFFF?text=VC",
  description: "",
  website: "",
  headquarters: "",
  foundedYear: new Date().getFullYear(),
  investmentFocus: [],
  industries: [],
  stagePreference: [],
  ticketSize: "",
  regionsOfInterest: [],
  portfolioCompanies: [],
  keyPartners: [],
  contactInfo: {
    email: "",
    twitter: "",
    linkedin: ""
  },
  contactPerson: {
    name: "",
    email: "",
    linkedinUrl: ""
  }
};

export default function VCFirmForm({
  open,
  onOpenChange,
  editingFirm,
  onSave
}: VCFirmFormProps) {
  const { regionNames, industryNames, stageNames, addVCFirm, updateVCFirm } = useData();
  const [partners, setPartners] = useState<Person[]>([]);
  const [newPartner, setNewPartner] = useState<Person>({ name: "", title: "" });
  const [portfolioCompanies, setPortfolioCompanies] = useState<string[]>([]);
  const [newCompany, setNewCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VCFirm>({
    defaultValues: defaultFirm
  });

  // Reset form when editing a different firm
  useEffect(() => {
    if (editingFirm) {
      form.reset(editingFirm);
      setPartners(editingFirm.keyPartners || []);
      setPortfolioCompanies(editingFirm.portfolioCompanies || []);
    } else {
      form.reset(defaultFirm);
      setPartners([]);
      setPortfolioCompanies([]);
    }
  }, [editingFirm, form]);

  const addPartner = () => {
    if (newPartner.name.trim() === "" || newPartner.title.trim() === "") {
      toast({
        title: "Error",
        description: "Partner name and title are required",
        variant: "destructive",
      });
      return;
    }
    
    setPartners([...partners, { ...newPartner }]);
    setNewPartner({ name: "", title: "" });
  };

  const removePartner = (index: number) => {
    setPartners(partners.filter((_, i) => i !== index));
  };

  const addCompany = () => {
    if (newCompany.trim() === "") {
      toast({
        title: "Error",
        description: "Company name is required",
        variant: "destructive",
      });
      return;
    }
    
    setPortfolioCompanies([...portfolioCompanies, newCompany]);
    setNewCompany("");
  };

  const removeCompany = (index: number) => {
    setPortfolioCompanies(portfolioCompanies.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data: VCFirm) => {
    try {
      setIsSubmitting(true);
      
      // Generate random ID if new firm
      const firmId = editingFirm?.id || `firm-${Date.now()}`;
      
      // Combine form data with partners and portfolio companies
      const finalFirm: VCFirm = {
        ...data,
        id: firmId,
        keyPartners: partners,
        portfolioCompanies: portfolioCompanies
      };
      
      console.log("Submitting VC firm:", finalFirm);
      
      // Call the onSave callback 
      await onSave(finalFirm);
      
      // Close the dialog after successful save
      onOpenChange(false);
      
      toast({
        title: "Success",
        description: `VC firm ${editingFirm ? 'updated' : 'added'} successfully`,
      });
    } catch (error) {
      console.error('Error saving VC firm:', error);
      toast({
        title: "Error",
        description: `Failed to ${editingFirm ? 'update' : 'add'} VC firm: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingFirm ? 'Edit' : 'Add'} VC Firm</DialogTitle>
          <DialogDescription>
            {editingFirm 
              ? "Edit the details of the VC firm below." 
              : "Fill out the form below to add a new VC firm."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter firm name" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/logo.png" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="headquarters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headquarters</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City, Country" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="foundedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founded Year</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1900"
                        max={new Date().getFullYear()}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ticketSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Size</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="$100K-$500K" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of the VC firm" 
                      className="min-h-24" 
                      {...field} 
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Multi-select sections */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Industries</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {industryNames.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`industry-${industry}`}
                      checked={form.watch("industries")?.includes(industry)}
                      onCheckedChange={(checked) => {
                        const current = form.watch("industries") || [];
                        if (checked) {
                          form.setValue("industries", [...current, industry]);
                        } else {
                          form.setValue("industries", current.filter(i => i !== industry));
                        }
                      }}
                    />
                    <label 
                      htmlFor={`industry-${industry}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {industry}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Investment Stages</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {stageNames.map((stage) => (
                  <div key={stage} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`stage-${stage}`}
                      checked={form.watch("stagePreference")?.includes(stage)}
                      onCheckedChange={(checked) => {
                        const current = form.watch("stagePreference") || [];
                        if (checked) {
                          form.setValue("stagePreference", [...current, stage]);
                        } else {
                          form.setValue("stagePreference", current.filter(s => s !== stage));
                        }
                      }}
                    />
                    <label 
                      htmlFor={`stage-${stage}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {stage}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Regions of Interest</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {regionNames.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`region-${region}`}
                      checked={form.watch("regionsOfInterest")?.includes(region)}
                      onCheckedChange={(checked) => {
                        const current = form.watch("regionsOfInterest") || [];
                        if (checked) {
                          form.setValue("regionsOfInterest", [...current, region]);
                        } else {
                          form.setValue("regionsOfInterest", current.filter(r => r !== region));
                        }
                      }}
                    />
                    <label 
                      htmlFor={`region-${region}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {region}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Portfolio Companies */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Portfolio Companies</h3>
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Company name"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                  />
                </div>
                <Button type="button" onClick={addCompany}>Add</Button>
              </div>
              
              <div className="space-y-2">
                {portfolioCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{company}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCompany(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Key Partners */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Key Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Partner name"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                />
                <Input
                  placeholder="Partner title"
                  value={newPartner.title}
                  onChange={(e) => setNewPartner({...newPartner, title: e.target.value})}
                />
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={addPartner}>Add Partner</Button>
              </div>
              
              <div className="space-y-2">
                {partners.map((partner, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-gray-500">{partner.title}</p>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removePartner(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="contact@example.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactInfo.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Twitter handle" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactInfo.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="LinkedIn handle" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Contact Person */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contact Person</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactPerson.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactPerson.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john.doe@example.com" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactPerson.linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://linkedin.com/in/johndoe" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                {editingFirm ? 'Update' : 'Add'} VC Firm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
