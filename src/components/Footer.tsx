
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-africa-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Africa VC Compass</h3>
            <p className="text-sm opacity-80">
              Your comprehensive guide to venture capital firms investing in African startups.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Directory</h4>
            <ul className="space-y-2">
              <li><Link to="/directory" className="text-sm opacity-80 hover:opacity-100">All VCs</Link></li>
              <li><Link to="/regions" className="text-sm opacity-80 hover:opacity-100">By Region</Link></li>
              <li><Link to="/industries" className="text-sm opacity-80 hover:opacity-100">By Industry</Link></li>
              <li><Link to="/stages" className="text-sm opacity-80 hover:opacity-100">By Investment Stage</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm opacity-80 hover:opacity-100">About Us</Link></li>
              <li><Link to="/methodologies" className="text-sm opacity-80 hover:opacity-100">Methodology</Link></li>
              <li><Link to="/contact" className="text-sm opacity-80 hover:opacity-100">Contact</Link></li>
              <li><Link to="/submit" className="text-sm opacity-80 hover:opacity-100">Submit a VC</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm opacity-80 hover:opacity-100">Twitter</a></li>
              <li><a href="#" className="text-sm opacity-80 hover:opacity-100">LinkedIn</a></li>
              <li><a href="#" className="text-sm opacity-80 hover:opacity-100">Subscribe to Updates</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-sm opacity-70 flex flex-col md:flex-row justify-between">
          <p>© {new Date().getFullYear()} Africa VC Compass. All rights reserved.</p>
          <div className="mt-2 md:mt-0 space-x-4">
            <Link to="/privacy" className="hover:opacity-100">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-100">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
