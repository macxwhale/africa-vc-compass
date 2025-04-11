
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Radar } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-africa-blue text-white flex items-center justify-center font-bold">
              VC
            </div>
            <span className="ml-2 text-xl font-bold text-africa-blue">Africa VC Compass</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center text-gray-700 hover:text-africa-blue-light transition-colors">
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
          <Link to="/directory" className="text-gray-700 hover:text-africa-blue-light transition-colors">
            Directory
          </Link>
          <Link to="/regions" className="text-gray-700 hover:text-africa-blue-light transition-colors">
            Regions
          </Link>
          <Link to="/industries" className="text-gray-700 hover:text-africa-blue-light transition-colors">
            Industries
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-africa-blue-light transition-colors">
            About
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-africa-blue-light transition-colors">
            Admin
          </Link>
        </div>
        
        <div className="flex items-center">
          <Button asChild variant="outline" className="flex items-center gap-1">
            <Link to="/radar">
              <Radar className="h-4 w-4" />
              <span className="hidden sm:inline">Shoot Your Shot</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
