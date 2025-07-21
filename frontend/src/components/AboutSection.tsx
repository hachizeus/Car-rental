import { Card } from "@/components/ui/card";
import { Users, Award, Clock, Globe, Search, Phone, Car, CheckCircle, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const AboutSection = () => {
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.2);

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
      icon: Shield,
      title: "Safety & Trust",
      description: "Your safety is our priority with well-maintained vehicles and transparent policies"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#141414]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Onboarding Process Section */}
        <div className={`mb-16 lg:mb-20 ${processVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={processRef}>
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
        
        {/* Testimonials Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-brand-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">John Doe</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Frequent Customer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"The service was exceptional. The car was in perfect condition and the staff was very helpful. Will definitely rent again!"</p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-brand-600 font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Jane Smith</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Business Traveler</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"I needed a luxury car for a business meeting and Pattrentals delivered beyond my expectations. The car was immaculate and made a great impression."</p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-brand-600 font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Robert Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tourist</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"Renting from Pattrentals made our family vacation so much better. The SUV was spacious, comfortable and the WhatsApp support was always available when needed."</p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};