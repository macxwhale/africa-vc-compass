
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-africa-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Africa VC Compass</h1>
            <p className="max-w-2xl text-lg opacity-90">
              Your comprehensive guide to the African venture capital landscape.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-africa-blue mb-4">Our Mission</h2>
              <p className="mb-4">
                Africa VC Compass aims to bridge the information gap between African startups and venture capital firms. 
                We believe that by providing transparent, comprehensive information about investors active in the African 
                ecosystem, we can help founders connect with the right investors and accelerate innovation across the continent.
              </p>
              <p>
                Our directory serves as a resource hub for entrepreneurs, enabling them to make more informed decisions 
                about fundraising and strategic partnerships.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-africa-blue mb-4">What We Offer</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Comprehensive profiles of venture capital firms active in Africa</li>
                <li>Detailed information on investment focus, ticket size, and regional preferences</li>
                <li>Regularly updated data to ensure accuracy and relevance</li>
                <li>Insights into investor preferences and decision-making criteria</li>
                <li>Resources to help founders align their pitches with investor expectations</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-africa-blue mb-4">Our Story</h2>
              <p className="mb-4">
                Africa VC Compass was born out of the founder's own experience navigating the fundraising landscape 
                for African startups. After experiencing firsthand the challenges of identifying and approaching the 
                right investors, we decided to create a resource that would make this process easier for other entrepreneurs.
              </p>
              <p>
                What started as a personal database has evolved into a comprehensive directory that serves the entire 
                African startup ecosystem. We're committed to continually improving our platform to better serve founders 
                and contribute to the growth of innovation across Africa.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-africa-blue mb-4">Contact Us</h2>
              <p className="mb-4">
                Have questions, suggestions, or want to contribute to Africa VC Compass? We'd love to hear from you!
              </p>
              <p>
                Email: <a href="mailto:info@africavccompass.com" className="text-africa-blue hover:underline">info@africavccompass.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
