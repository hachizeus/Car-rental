import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Users, Wrench, MapPin, Phone } from "lucide-react";
import { trackPageView } from "@/lib/analytics";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    trackPageView('services');
  }, []);
  
  const services = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance for all your rental needs",
      features: ["Emergency roadside assistance", "24/7 customer hotline", "Online chat support"]
    },
    {
      icon: Shield,
      title: "Comprehensive Insurance",
      description: "Full coverage protection for peace of mind during your rental",
      features: ["Third-party liability", "Collision damage waiver", "Theft protection"]
    },
    {
      icon: Users,
      title: "Professional Drivers",
      description: "Experienced and licensed drivers available upon request",
      features: ["Licensed professionals", "Local area knowledge", "Multilingual drivers"]
    },
    {
      icon: Wrench,
      title: "Maintenance & Care",
      description: "Regular maintenance ensures reliable and safe vehicles",
      features: ["Regular servicing", "Quality inspections", "Clean vehicles"]
    },
    {
      icon: MapPin,
      title: "Multiple Locations",
      description: "Convenient pickup and drop-off points across Kenya",
      features: ["Airport locations", "City center offices", "Hotel delivery"]
    },
    {
      icon: Phone,
      title: "Easy Booking",
      description: "Simple online booking process with instant confirmation",
      features: ["Online reservations", "Mobile app booking", "Flexible cancellation"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414]">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-[#141414] relative overflow-hidden">
        {/* Background Animations */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_70%,_rgba(220,38,38,0.1)_1px,_transparent_1px)] bg-[length:32px_32px] animate-pulse"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-600/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-red-600/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-red-600/15 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-red-600/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Services</h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto">
              Comprehensive rental services designed to meet all your transportation needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 group animate-fade-in bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-600 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-brand-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 text-left">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#141414]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to Experience Premium Service?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services or make a reservation
          </p>
          <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
