import { Users, Shield, Clock, Award, MapPin, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Stats = () => {
  const reasons = [
    { 
      icon: Users, 
      title: "500+ Satisfied Clients", 
      description: "Happy customers nationwide who trust our Premium Car Rental Services" 
    },
    { 
      icon: Award, 
      title: "Premium Quality Fleet", 
      description: "Latest model luxury vehicles maintained to the highest standards" 
    },
    { 
      icon: MapPin, 
      title: "15+ Service Locations", 
      description: "Major cities covered across Kenya for your convenience" 
    },
    { 
      icon: Clock, 
      title: "24/7 Customer Support", 
      description: "Round-the-clock assistance whenever you need us" 
    },
    { 
      icon: Shield, 
      title: "Fully Insured Vehicles", 
      description: "Complete insurance coverage for your peace of mind" 
    },
    { 
      icon: Headphones, 
      title: "Professional Service", 
      description: "Experienced team dedicated to exceptional customer experience" 
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#141414] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_white_1px,_transparent_1px)] bg-[length:32px_32px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose PattRentals?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Your trusted partner for Premium Car Rental Services across Kenya
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 group animate-fade-in bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-600 transition-colors duration-300">
                <reason.icon className="w-8 h-8 text-brand-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{reason.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{reason.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
