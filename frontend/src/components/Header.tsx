
import { Button } from "@/components/ui/button";
import { Car, ChevronDown, Sun, Moon } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import logo from "@/assets/images/logo.png";

export const Header = () => {
  const [themeDropdown, setThemeDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    setThemeDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setThemeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <img 
            src={logo} 
            alt="Pattrentals Logo" 
            className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300"
          />
          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 dark:from-white via-brand-600 to-gray-900 dark:to-white bg-clip-text text-transparent">
            Pattrentals
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link 
            to="/" 
            className={`relative transition-all duration-300 font-medium text-sm py-1.5 px-2 rounded-lg group ${
              location.pathname === '/' 
                ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20'
            }`}
          >
            Home
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
              location.pathname === '/' ? 'w-4 bg-brand-600' : 'w-0 bg-brand-600 group-hover:w-4'
            }`}></span>
          </Link>
          <Link 
            to="/fleet" 
            className={`relative transition-all duration-300 font-medium text-sm py-1.5 px-2 rounded-lg group ${
              location.pathname === '/fleet' 
                ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20'
            }`}
          >
            Fleet
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
              location.pathname === '/fleet' ? 'w-4 bg-brand-600' : 'w-0 bg-brand-600 group-hover:w-4'
            }`}></span>
          </Link>
          <Link 
            to="/services" 
            className={`relative transition-all duration-300 font-medium text-sm py-1.5 px-2 rounded-lg group ${
              location.pathname === '/services' 
                ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20'
            }`}
          >
            Services
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
              location.pathname === '/services' ? 'w-4 bg-brand-600' : 'w-0 bg-brand-600 group-hover:w-4'
            }`}></span>
          </Link>
          <Link 
            to="/about" 
            className={`relative transition-all duration-300 font-medium text-sm py-1.5 px-2 rounded-lg group ${
              location.pathname === '/about' 
                ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20'
            }`}
          >
            About
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
              location.pathname === '/about' ? 'w-4 bg-brand-600' : 'w-0 bg-brand-600 group-hover:w-4'
            }`}></span>
          </Link>
          <Link 
            to="/contact" 
            className={`relative transition-all duration-300 font-medium text-sm py-1.5 px-2 rounded-lg group ${
              location.pathname === '/contact' 
                ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20'
            }`}
          >
            Contact
            <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
              location.pathname === '/contact' ? 'w-4 bg-brand-600' : 'w-0 bg-brand-600 group-hover:w-4'
            }`}></span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              onClick={() => setThemeDropdown(!themeDropdown)}
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-brand-600 transition-all duration-300 font-medium text-sm py-1.5 px-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 shadow-soft hover:shadow-medium"
            >
              {theme === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="capitalize hidden sm:inline text-xs">{theme}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${themeDropdown ? 'rotate-180' : ''}`} />
            </button>
            {themeDropdown && (
              <div className="absolute right-0 mt-2 w-36 sm:w-40 glass dark:glass-dark rounded-xl shadow-strong z-50 animate-scale-in">
                <button
                  onClick={() => toggleTheme('light')}
                  className={`flex items-center space-x-2 w-full px-4 py-3 text-left hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300 rounded-lg ${
                    theme === 'light' ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </button>
                <button
                  onClick={() => toggleTheme('dark')}
                  className={`flex items-center space-x-2 w-full px-4 py-3 text-left hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300 rounded-lg ${
                    theme === 'dark' ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </button>
              </div>
            )}
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
