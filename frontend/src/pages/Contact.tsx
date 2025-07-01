import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { trackPageView } from "@/lib/analytics";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    trackPageView('contact');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      await supabase.from('contact_submissions').insert({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });

      // Send email using FormSubmit (no API key required)
      const formData2 = new FormData();
      formData2.append('name', `${formData.firstName} ${formData.lastName}`);
      formData2.append('email', formData.email);
      formData2.append('phone', formData.phone);
      formData2.append('subject', formData.subject);
      formData2.append('message', formData.message);
      formData2.append('_next', window.location.href);
      formData2.append('_captcha', 'false');
      
      const emailResponse = await fetch('https://formsubmit.co/pattrentalservices@gmail.com', {
        method: 'POST',
        body: formData2
      });
      
      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      toast.success('Message sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["T Plaza, 4th Floor", "Thika, Kenya"]
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+254 720 813 111"]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["pattrentalservices@gmail.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414]">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-[#141414] relative overflow-hidden">
        {/* Background Animations */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4zIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01IDEwYTIgMiAwIDAgMC0yIDJ2MzhhMiAyIDAgMCAwIDIgMmgzOFYxMHptMzgtMkg1Yy0yLjE5IDAtNCAxLjgxLTQgNHYzOGMwIDIuMTkgMS43OSA0IDQgNGg0MWEyIDIgMCAwIDAgMi0yVjEwYTIgMiAwIDAgMC0yLTJ6Ii8+PC9zdmc+')] animate-pulse"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-brand-600/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-brand-600/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-brand-600/15 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-brand-600/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto">
              Get in touch with us for any inquiries or to make a reservation
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 dark:text-gray-300 text-sm">{detail}</p>
                ))}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              <Card className="p-8 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+254 700 000 000" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Car rental inquiry" value={formData.subject} onChange={handleInputChange} required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} placeholder="Tell us how we can help you..." value={formData.message} onChange={handleInputChange} required />
                  </div>
                  
                  <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map */}
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Find Us</h2>
              <Card className="p-4 h-full bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600">
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14606.142018346485!2d37.071816000000005!3d-1.041083!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4f14fcd5084b%3A0xa12fc50156937773!2sT%20Plaza!5e1!3m2!1sen!2ske!4v1751367265657!5m2!1sen!2ske" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 animate-fade-in bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">What documents do I need to rent a car?</h3>
              <p className="text-gray-600 dark:text-gray-300">You need a valid driving license, national ID, and a credit card for the security deposit.</p>
            </Card>
            
            <Card className="p-6 animate-fade-in bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600" style={{ animationDelay: "100ms" }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">What is the minimum age to rent a car?</h3>
              <p className="text-gray-600 dark:text-gray-300">The minimum age is 21 years old. Drivers under 25 may have additional fees.</p>
            </Card>
            
            <Card className="p-6 animate-fade-in bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600" style={{ animationDelay: "200ms" }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Is insurance included in the rental?</h3>
              <p className="text-gray-600 dark:text-gray-300">Basic insurance is included. Additional coverage options are available for extra protection.</p>
            </Card>
            
            <Card className="p-6 animate-fade-in bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600" style={{ animationDelay: "300ms" }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Can I cancel my reservation?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes, you can cancel up to 24 hours before your rental date without any penalty.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
