import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Shield, Users, Wrench, MapPin, Phone } from "lucide-react";

const Services = () => {
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_white_1px,_transparent_1px)] bg-[length:32px_32px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-emerald-100 text-xl max-w-2xl mx-auto">
              Comprehensive car rental services designed to meet all your transportation needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 text-left">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Experience Premium Service?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services or make a reservation
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
