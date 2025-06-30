import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Award, Clock, Globe } from "lucide-react";

const About = () => {
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

  const team = [
    {
      name: "John Kamau",
      position: "CEO & Founder",
      image: "/placeholder.svg",
      description: "15+ years in automotive industry"
    },
    {
      name: "Sarah Wanjiku",
      position: "Operations Manager",
      image: "/placeholder.svg",
      description: "Expert in fleet management"
    },
    {
      name: "David Ochieng",
      position: "Customer Relations",
      image: "/placeholder.svg",
      description: "Dedicated to customer satisfaction"
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
            <h1 className="text-5xl font-bold text-white mb-6">About MORENT</h1>
            <p className="text-emerald-100 text-xl max-w-2xl mx-auto">
              Your trusted partner in premium car rental services across Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2015, MORENT began with a simple vision: to provide reliable, 
                  affordable, and premium car rental services to the people of Kenya. What 
                  started as a small operation with just 5 vehicles has grown into one of 
                  the country's most trusted car rental companies.
                </p>
                <p>
                  We understand that every journey is important, whether it's a business trip, 
                  family vacation, or special occasion. That's why we've built our reputation 
                  on delivering exceptional service, maintaining a modern fleet, and ensuring 
                  our customers have safe, comfortable, and memorable experiences.
                </p>
                <p>
                  Today, we serve over 500 satisfied customers annually and operate from 
                  multiple locations across Kenya, always staying true to our core values 
                  of quality, reliability, and customer satisfaction.
                </p>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <img 
                src="/placeholder.svg" 
                alt="MORENT Office" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The dedicated professionals behind MORENT's success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
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
