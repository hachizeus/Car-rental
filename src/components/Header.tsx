
import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Car } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { Link } from "react-router-dom";

export const Header = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

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
            <div className="flex items-center space-x-4">
              <span>Open Hours: Mon - Fri 8:00 AM - 6:00 PM</span>
              <div className="flex items-center space-x-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-emerald-600" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                <span className="text-emerald-600">MO</span>RENT
              </div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">Home</Link>
              <Link to="/fleet" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium flex items-center space-x-1">
                <Car className="w-4 h-4" />
                <span>All Cars</span>
              </Link>
              <Link to="/services" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">Services</Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 hidden md:flex">
              Get Quote
            </Button>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
};
