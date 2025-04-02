
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about African venture capital or need more information about our research?
            We're here to help. Reach out to our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <ContactForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <ContactInfo />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
