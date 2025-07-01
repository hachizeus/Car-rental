import { Card } from "@/components/ui/card";
import { Users, Award, Clock, Globe, Search, Phone, Car, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const AboutSection = () => {
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above everything else"
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Premium vehicles and exceptional service standards in everything we do"
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Dependable service you can count on, whenever and wherever you need us"
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Embracing technology and innovation to enhance your rental experience"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#141414]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Onboarding Process Section */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple steps to get your perfect rental
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <Search className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Browse & Select</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Choose from our premium fleet of vehicles that suit your needs</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <Phone className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Reach out via WhatsApp or call us to discuss your requirements</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <CheckCircle className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Book & Confirm</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Complete your booking with required documents and payment</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <Car className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Pick Up & Go</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Collect your vehicle and enjoy your Premium Car Rental Services</p>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className={`${valuesVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={valuesRef}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};