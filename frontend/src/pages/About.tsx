import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Award, Clock, Globe, Shield, Star, MapPin, Headphones } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { trackPageView } from "@/lib/analytics";
import { useEffect } from "react";

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();
  const { ref: whyRef, isVisible: whyVisible } = useScrollAnimation();
  
  useEffect(() => {
    trackPageView('about');
  }, []);

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

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Fully Insured Vehicles",
      description: "Complete insurance coverage for your peace of mind"
    },
    {
      icon: Star,
      title: "500+ Satisfied Clients",
      description: "Happy customers nationwide who trust our services"
    },
    {
      icon: MapPin,
      title: "15+ Service Locations",
      description: "Major cities covered across Kenya for convenience"
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance whenever you need us"
    }
  ];

  const team = [
    {
      name: "John Kamau",
      position: "CEO & Founder",
      image: "/placeholder.svg",
      description: "15+ years in automotive industry"
    },
    {
      name: "David Ochieng",
      position: "Customer Relations",
      image: "/placeholder.svg",
      description: "Dedicated to customer satisfaction"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414]">
      <Header />
      
      {/* Animated Hero Section */}
      <section className="py-24 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-[#141414] relative overflow-hidden">
        {/* Background Animations */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDEwYTIgMiAwIDAgMC0yIDJ2MzhhMiAyIDAgMCAwIDIgMmgzOFYxMHptMzgtMkg1Yy0yLjE5IDAtNCAxLjgxLTQgNHYzOGMwIDIuMTkgMS43OSA0IDQgNGg0MWEyIDIgMCAwIDAgMi0yVjEwYTIgMiAwIDAgMC0yLTJ6Ii8+PC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4zIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDEwYTIgMiAwIDAgMC0yIDJ2MzhhMiAyIDAgMCAwIDIgMmgzOFYxMHptMzgtMkg1Yy0yLjE5IDAtNCAxLjgxLTQgNHYzOGMwIDIuMTkgMS43OSA0IDQgNGg0MWEyIDIgMCAwIDAgMi0yVjEwYTIgMiAwIDAgMC0yLTJ6Ci8+PC9zdmc+')] animate-pulse"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_70%,_rgba(220,38,38,0.1)_1px,_transparent_1px)] bg-[length:32px_32px] animate-pulse"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-600/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-red-600/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-red-600/15 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-red-600/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={heroRef}>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              We Rent, <span className="text-brand-600 animate-pulse">You Explore</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're more than just a rental service – we're your dedicated partner in providing premium vehicles, properties, and vacation experiences with integrity and care.
            </p>
          </div>
        </div>
      </section>

      {/* Content Cards Section */}
      <section className="py-16 bg-white dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className={`grid md:grid-cols-2 gap-8 ${contentVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={contentRef}>
            <Card className="p-8 bg-white dark:bg-[#1a1a1a] shadow-strong border border-gray-200 dark:border-gray-600 rounded-2xl hover-lift">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Founded in 2015, PattRentals began with a simple vision: to provide reliable, affordable, and Premium Car Rental Services to the people of Kenya.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, we serve over 500 satisfied customers annually and operate from multiple locations across Kenya, always staying true to our core values.
              </p>
            </Card>
            
            <Card className="p-8 bg-white dark:bg-[#1a1a1a] shadow-strong border border-gray-200 dark:border-gray-600 rounded-2xl hover-lift">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                To provide exceptional rental services that exceed customer expectations while maintaining the highest standards of quality and reliability.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We understand that every journey is important, whether it's business, leisure, or special occasions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ${valuesVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={valuesRef}>
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-600 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-brand-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The dedicated professionals behind PattRentals' success
            </p>
          </div>
          
          <div className={`grid md:grid-cols-3 gap-8 ${teamVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={teamRef}>
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-brand-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose PattRentals</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The reasons that make us Kenya's trusted rental partner
            </p>
          </div>
          
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ${whyVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={whyRef}>
            {whyChooseUs.map((reason, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 group bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600 hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
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

      <Footer />
    </div>
  );
};

export default About;
