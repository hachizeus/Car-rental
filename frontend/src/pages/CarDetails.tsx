import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ArrowLeft, Star, MapPin, Users, Fuel, Settings } from "lucide-react";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: () => api.getCar(id!),
    enabled: !!id
  });



  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="py-20 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading car details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="py-20 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">Car not found</p>
          <Button onClick={() => navigate('/fleet')} className="mt-4">
            Back to Fleet
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/fleet')}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet</span>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Car Images & Videos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              {(() => {
                const primaryImage = car.images?.find(img => img.is_primary)?.url
                return primaryImage ? (
                  <img 
                    src={primaryImage} 
                    alt={car.title}
                    loading="lazy"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )
              })()}
              <Badge className="absolute top-4 left-4 bg-brand-600">
                {car.category}
              </Badge>
              {car.is_available && (
                <Badge className="absolute top-4 right-4 bg-green-600">
                  Available
                </Badge>
              )}
            </div>
            
            {/* Additional Images */}
            {car.images && car.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {car.images.slice(1, 4).map((img, index) => (
                  <img 
                    key={index}
                    src={img.url} 
                    alt={`${car.title} ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            
            {/* Videos */}
            {car.videos && car.videos.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Videos</h3>
                {car.videos.map((video, index) => (
                  <div key={index} className="relative">
                    <video 
                      controls
                      controlsList="nodownload"
                      className="w-full h-80 rounded-xl shadow-lg bg-black"
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        console.log('Video load error:', e);
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="hidden w-full h-80 rounded-xl bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Video unavailable</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{car.title}</h1>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>{car.location}</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {car.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features?.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-brand-50 text-brand-700 border-brand-200">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Passengers</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{car.seats || 5} People</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Transmission</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{car.transmission || 'Automatic'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Fuel className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Fuel Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{car.fuel_type || 'Petrol'}</p>
                    </div>
                  </div>
                  {car.engine && (
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-brand-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Engine</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{car.engine}</p>
                      </div>
                    </div>
                  )}
                  {car.year && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-brand-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{car.year}</p>
                      </div>
                    </div>
                  )}
                  {car.mileage && (
                    <div className="flex items-center space-x-3">
                      <Fuel className="w-5 h-5 text-brand-600" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mileage</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{car.mileage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price per day</p>
                    <p className="text-3xl font-bold text-brand-600">
                      KSh {car.price_per_day.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <p className={`font-semibold ${car.is_available ? 'text-green-600' : 'text-red-600'}`}>
                      {car.is_available ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* WhatsApp Booking */}
        {car.is_available && (
          <div className="mt-12 text-center">
            <Card className="bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800 max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ready to Book?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Contact us directly on WhatsApp to book this car</p>
                <Button 
                  onClick={() => {
                    const message = `Hi! I'm interested in booking the ${car.title}\n\n` +
                      `Car Details:\n` +
                      `• Model: ${car.title}\n` +
                      `• Category: ${car.category}\n` +
                      `• Price: KSh ${car.price_per_day.toLocaleString()}/day\n` +
                      `• Location: ${car.location}\n\n` +
                      `Please let me know the availability and booking process.`;
                    
                    const whatsappUrl = `https://wa.me/254720813111?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-lg py-3"
                >
                  Book Now via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails;