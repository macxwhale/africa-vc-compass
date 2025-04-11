
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VCFirm } from "@/data/vcData";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { MultiSelect } from "@/components/ui/multi-select";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  logo: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  headquarters: z.string().min(2, { message: "Headquarters must be at least 2 characters" }),
  foundedYear: z.number().int().positive().optional(),
  industries: z.array(z.string()).min(1, { message: "Select at least one industry" }),
  regionsOfInterest: z.array(z.string()).min(1, { message: "Select at least one region" }),
  stagePreference: z.array(z.string()).min(1, { message: "Select at least one investment stage" }),
  ticketSize: z.string().optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email" }).optional(),
  contactName: z.string().optional(),
});

export function SubmitVCFirmForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitVCFirm, regionNames, industryNames, stageNames } = useData();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
      description: "",
      website: "",
      headquarters: "",
      industries: [],
      regionsOfInterest: [],
      stagePreference: [],
      ticketSize: "",
      contactEmail: "",
      contactName: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      
      // Create VC Firm object from form values
      const vcFirm: Omit<VCFirm, "id"> = {
        name: values.name,
        logo: values.logo || "/placeholder.svg",
        description: values.description,
        website: values.website || undefined,
        headquarters: values.headquarters,
        foundedYear: values.foundedYear,
        investmentFocus: [], // Not in the simple form
        industries: values.industries,
        stagePreference: values.stagePreference,
        ticketSize: values.ticketSize || undefined,
        regionsOfInterest: values.regionsOfInterest,
        portfolioCompanies: [], // Not in the simple form
        keyPartners: [], // Not in the simple form
        contactInfo: {
          email: values.contactEmail || "",
        },
        contactPerson: values.contactName ? {
          name: values.contactName,
          email: values.contactEmail || "",
        } : undefined
      };
      
      // Submit the firm
      await submitVCFirm(vcFirm);
      
      // Reset form and close dialog
      form.reset();
      setOpen(false);
      
      toast({
        title: "Submission Successful",
        description: "Your VC firm has been submitted for review. We'll notify you once it's approved.",
      });
    } catch (error) {
      console.error("Error submitting VC firm:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your VC firm. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Submit Your VC Firm</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Your VC Firm</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your VC firm for inclusion in our directory.
            All submissions are reviewed before being published.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Ventures" {...field} />
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
                    <FormLabel>Headquarters *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nairobi, Kenya" {...field} />
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
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of your venture capital firm..." 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
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
                        placeholder="2010" 
                        {...field}
                        value={field.value || ''}
                        onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
                  <FormDescription>
                    Enter a direct link to your logo image. If left empty, a placeholder will be used.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="industries"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Industries *</FormLabel>
                    <MultiSelect
                      selected={field.value}
                      options={industryNames.map(name => ({
                        label: name,
                        value: name,
                      }))}
                      onChange={field.onChange}
                      placeholder="Select industries"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="regionsOfInterest"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Regions *</FormLabel>
                    <MultiSelect
                      selected={field.value}
                      options={regionNames.map(name => ({
                        label: name,
                        value: name,
                      }))}
                      onChange={field.onChange}
                      placeholder="Select regions"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stagePreference"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Investment Stages *</FormLabel>
                    <MultiSelect
                      selected={field.value}
                      options={stageNames.map(name => ({
                        label: name,
                        value: name,
                      }))}
                      onChange={field.onChange}
                      placeholder="Select stages"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="ticketSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typical Ticket Size</FormLabel>
                  <FormControl>
                    <Input placeholder="$50K - $500K" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit for Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
