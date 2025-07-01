
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Car, Facebook, Twitter, Instagram, Linkedin, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white dark:bg-[#141414] border-l border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <Car className="w-7 h-7 text-brand-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 dark:from-white via-brand-600 to-gray-900 dark:to-white bg-clip-text text-transparent">
              Pattrentals
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 mb-8">
            <Link 
              to="/" 
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-brand-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 border-l-4 border-transparent hover:border-brand-600"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/fleet" 
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-brand-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 border-l-4 border-transparent hover:border-brand-600"
              onClick={() => setOpen(false)}
            >
              Fleet
            </Link>
            <Link 
              to="/services" 
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-brand-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 border-l-4 border-transparent hover:border-brand-600"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-brand-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 border-l-4 border-transparent hover:border-brand-600"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium text-gray-900 dark:text-white hover:text-brand-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 border-l-4 border-transparent hover:border-brand-600"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Theme Toggle */}
          <div className="mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-600">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Theme</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-10 w-10 p-0 rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-all duration-300"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-brand-600" />
                ) : (
                  <Sun className="w-5 h-5 text-brand-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-auto">
            <h3 className="text-sm font-medium mb-4 text-gray-600 dark:text-gray-400">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-brand-600 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
