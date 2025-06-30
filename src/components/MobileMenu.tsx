
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, Car, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router-dom";

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
      <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <Car className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold">
              <span className="text-emerald-600">MO</span>RENT
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 mb-8">
            <Link 
              to="/" 
              className="text-lg font-medium hover:text-emerald-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/fleet" 
              className="text-lg font-medium hover:text-emerald-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              All Cars
            </Link>
            <Link 
              to="/services" 
              className="text-lg font-medium hover:text-emerald-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium hover:text-emerald-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium hover:text-emerald-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Theme Toggle */}
          <div className="mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm font-medium">Theme</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-8 w-8 p-0"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
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
                  className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
