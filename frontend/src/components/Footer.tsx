
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Cars", href: "/fleet" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Car Rental",
    "Corporate Fleet",
    "Airport Transfer",
    "Wedding Cars",
    "Long Term Rental",
    "Chauffeur Service",
  ];

  return (
    <footer className="bg-gray-100 dark:bg-[#141414] text-gray-900 dark:text-white border-t-2 border-brand-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Pattrentals Logo" 
                className="w-10 h-10"
              />
              <div className="text-2xl font-bold">
                <span className="text-brand-600">PATT</span>RENTALS
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Premium Car Rental Services for vehicles, properties, and vacation stays.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors text-sm">Rentals</Link></li>
              <li><Link to="/fleet" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors text-sm">Properties</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors text-sm">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  T Plaza, 4th Floor<br />Thika, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">+254 720 813 111</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">pattrentalservices@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2025 PattRentals. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-600 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-600 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-600 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
