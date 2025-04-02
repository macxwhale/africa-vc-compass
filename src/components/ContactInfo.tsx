
import { Mail, MapPin, Phone } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-africa-blue">Contact Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-africa-green mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium">Address</h4>
            <address className="not-italic text-gray-600">
              Africa VC Compass<br />
              Westlands<br />
              Nairobi, Kenya
            </address>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-africa-gold mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium">Email</h4>
            <a href="mailto:info@africavccompass.com" className="text-gray-600 hover:text-africa-blue transition-colors">
              info@africavccompass.com
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-africa-blue-light mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium">Phone</h4>
            <div className="space-y-1">
              <a href="tel:+254704258805" className="block text-gray-600 hover:text-africa-blue transition-colors">
                +254 704 258 805
              </a>
              <a href="tel:+254742182112" className="block text-gray-600 hover:text-africa-blue transition-colors">
                +254 742 182 112
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-africa-blue mb-3">Office Hours</h3>
        <p className="text-gray-600">
          Monday - Friday: 9:00 AM - 5:00 PM EAT<br />
          Saturday & Sunday: Closed
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
