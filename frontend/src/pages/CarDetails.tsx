import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
    queryFn: async () => {
      const { data } = await supabase
        .from('cars')
        .select(`
          *,
          car_images(image_url, is_primary),
          car_videos(video_url)
        `)
        .eq('id', id)
        .single()
      return data
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="py-20 text-center">
          <p className="text-xl text-gray-600">Loading car details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="py-20 text-center">
          <p className="text-xl text-gray-600">Car not found</p>
          <Button onClick={() => navigate('/fleet')} className="mt-4">
            Back to Fleet
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
                const primaryImage = car.car_images?.find(img => img.is_primary)?.image_url
                return primaryImage ? (
                  <img 
                    src={primaryImage} 
                    alt={car.title}
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )
              })()}
              <Badge className="absolute top-4 left-4 bg-emerald-600">
                {car.category}
              </Badge>
              {car.is_available && (
                <Badge className="absolute top-4 right-4 bg-green-600">
                  Available
                </Badge>
              )}
            </div>
            
            {/* Additional Images */}
            {car.car_images && car.car_images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {car.car_images.slice(1, 4).map((img, index) => (
                  <img 
                    key={index}
                    src={img.image_url} 
                    alt={`${car.title} ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            
            {/* Videos */}
            {car.car_videos && car.car_videos.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Videos</h3>
                {car.car_videos.map((video, index) => (
                  <video 
                    key={index}
                    src={video.video_url} 
                    controls
                    className="w-full h-48 rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span>(120+ reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{car.location}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {car.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features?.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">Passengers</p>
                      <p className="font-semibold">5 People</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">Transmission</p>
                      <p className="font-semibold">Automatic</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Fuel className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">Fuel Type</p>
                      <p className="font-semibold">Petrol</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{car.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Price per day</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      KSh {car.price_per_day.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Status</p>
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
            <Card className="bg-emerald-50 border-emerald-200 max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Book?</h3>
                <p className="text-gray-600 mb-6">Contact us directly on WhatsApp to book this car</p>
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
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3"
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