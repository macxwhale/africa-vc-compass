
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SubmitVCFirmForm } from "@/components/submit/SubmitVCFirmForm";

const Radar = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-africa-blue-light py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-africa-blue">Submit Your VC Firm</h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Help build Africa's most comprehensive VC directory. Submit your firm for review and join our growing network.
              </p>
              <SubmitVCFirmForm />
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-africa-blue">
              Our Review Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-africa-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-africa-blue text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-africa-blue">Submit</h3>
                <p className="text-gray-600">
                  Fill out our simple form with details about your VC firm, including focus areas, investment stages, and contact information.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-africa-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-africa-blue text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-africa-blue">Review</h3>
                <p className="text-gray-600">
                  Our team will verify your submission to ensure accuracy and completeness of information.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-africa-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-africa-blue text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-africa-blue">Publish</h3>
                <p className="text-gray-600">
                  Once approved, your VC firm will be listed in our directory, increasing visibility to founders and the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-africa-blue">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-africa-blue">How long does the review process take?</h3>
                <p className="text-gray-600">
                  We aim to review all submissions within 3-5 business days. You will be notified via email when your submission has been approved.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-africa-blue">Is there a cost to be listed?</h3>
                <p className="text-gray-600">
                  No, listing your VC firm in our directory is completely free. We believe in building an inclusive and comprehensive resource for the African startup ecosystem.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-africa-blue">Can I update my listing after it's published?</h3>
                <p className="text-gray-600">
                  Yes, you can request updates to your listing by contacting our team. Regular updates help ensure the information remains accurate and relevant.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2 text-africa-blue">What information is required for submission?</h3>
                <p className="text-gray-600">
                  Required fields include your firm's name, headquarters location, a brief description, investment focus areas, and regions of interest. The more complete your submission, the better.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Radar;
