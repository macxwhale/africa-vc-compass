
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-africa-blue">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Africa VC Compass. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Definitions</h2>
            <p>"Site" refers to the Africa VC Compass website.</p>
            <p>"User", "You", and "Your" refers to individuals who access or use the Site.</p>
            <p>"We", "Us", and "Our" refers to Africa VC Compass.</p>
            <p>"Content" refers to all information, data, text, software, images, graphics, and other materials available on the Site.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Use of the Site</h2>
            <h3 className="text-lg font-medium mt-6 mb-3">3.1 Eligibility</h3>
            <p>
              By using the Site, you represent and warrant that you have the legal capacity to enter into these Terms. If you are using the Site on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-3">3.2 Acceptable Use</h3>
            <p>You agree to use the Site only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use of the Site. Prohibited uses include, but are not limited to:</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Violating any applicable laws or regulations</li>
              <li>Distributing viruses or other malicious code</li>
              <li>Attempting to gain unauthorized access to the Site or its systems</li>
              <li>Engaging in any activity that disrupts or impairs the functionality of the Site</li>
              <li>Collecting user data without permission</li>
              <li>Using the Site for any fraudulent or deceptive purposes</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Content and Intellectual Property</h2>
            <h3 className="text-lg font-medium mt-6 mb-3">4.1 Ownership</h3>
            <p>
              The Site and all Content, features, and functionality are owned by Africa VC Compass and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or publicly perform any of the Content without our prior written consent.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-3">4.2 User Contributions</h3>
            <p>
              If you submit any information or content to the Site, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and up-to-date information, we make no representations or warranties about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Site. Any reliance you place on such information is strictly at your own risk.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Links to Third-Party Websites</h2>
            <p>
              The Site may contain links to third-party websites that are not owned or controlled by Africa VC Compass. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. We do not warrant the offerings of any of these entities or their websites.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              The Site is provided on an "AS IS" and "AS AVAILABLE" basis. Africa VC Compass makes no warranties, expressed or implied, and hereby disclaims all such warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or any warranties arising from course of dealing or usage of trade.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              In no event shall Africa VC Compass be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site; or (iii) unauthorized access, use, or alteration of your transmissions or content.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Africa VC Compass and its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Site; (ii) your violation of any term of these Terms; or (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Modifications to the Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Africa VC Compass operates, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> terms@africavccompass.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
