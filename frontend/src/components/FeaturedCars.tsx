import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Settings, Fuel, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const FeaturedCars = () => {
  const navigate = useNavigate();

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['featured-cars'],
    queryFn: async () => {
      const { data } = await supabase
        .from('cars')
        .select(`
          *,
          car_images(image_url, is_primary)
        `)
        .eq('is_available', true)
        .limit(6)
      return data || []
    }
  })

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Loading our premium vehicles...</p>
          </div>
        </div>
      </section>
    )
  }

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully selected collection of luxury vehicles, each maintained to the highest standards
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Card 
              key={car.id} 
              className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-2 cursor-pointer"
              onClick={() => handleCarClick(car.id)}
            >
              <div className="relative overflow-hidden">
                {(() => {
                  const primaryImage = car.car_images?.find(img => img.is_primary)?.image_url
                  return primaryImage ? (
                    <img 
                      src={primaryImage} 
                      alt={car.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )
                })()}
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Available
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{car.title}</h3>
                    <p className="text-emerald-600 font-semibold">{car.category}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">4.8</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">{car.location}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">Petrol</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">Automatic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">5 Passengers</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {car.features?.map((feature, index) => (
                    <span key={index} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-emerald-600">KSH {car.price_per_day.toLocaleString()}</span>
                      <span className="text-gray-600">/day</span>

                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCarClick(car.id);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-12 py-4 text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold rounded-xl"
            onClick={() => navigate('/fleet')}
          >
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};
