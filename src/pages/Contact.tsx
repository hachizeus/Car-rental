import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Westlands, Nairobi", "Kenya"]
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+254 700 000 000", "+254 711 000 000"]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@morent.co.ke", "support@morent.co.ke"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"]
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
            <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-emerald-100 text-xl max-w-2xl mx-auto">
              Get in touch with us for any inquiries or to make a reservation
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+254 700 000 000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Car rental inquiry" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} placeholder="Tell us how we can help you..." />
                  </div>
                  
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map */}
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
              <Card className="p-4 h-full">
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Westlands, Nairobi, Kenya</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What documents do I need to rent a car?</h3>
              <p className="text-gray-600">You need a valid driving license, national ID, and a credit card for the security deposit.</p>
            </Card>
            
            <Card className="p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">What is the minimum age to rent a car?</h3>
              <p className="text-gray-600">The minimum age is 21 years old. Drivers under 25 may have additional fees.</p>
            </Card>
            
            <Card className="p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is insurance included in the rental?</h3>
              <p className="text-gray-600">Basic insurance is included. Additional coverage options are available for extra protection.</p>
            </Card>
            
            <Card className="p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can I cancel my reservation?</h3>
              <p className="text-gray-600">Yes, you can cancel up to 24 hours before your rental date without any penalty.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
