
import { Button } from "@/components/ui/button";
import { User, Menu, Phone, Mail } from "lucide-react";

export const Header = () => {
  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-gray-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@morent.co.ke</span>
              </div>
            </div>
            <div className="text-sm">
              <span>Open Hours: Mon - Fri 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-3xl font-bold text-gray-900">
              <span className="text-emerald-600">MO</span>RENT
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Fleet</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Services</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Contact</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex text-gray-700 hover:text-emerald-600">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
              Get Quote
            </Button>
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};
