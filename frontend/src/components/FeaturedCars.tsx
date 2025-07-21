import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Settings, Fuel, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const FeaturedCars = () => {
  const navigate = useNavigate();
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const { data: allCars = [], isLoading } = useQuery({
    queryKey: ['featured-cars'],
    queryFn: api.getCars
  })

  const cars = allCars.filter(car => car.is_available).slice(0, 6)

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="skeleton h-12 w-64 mx-auto mb-4 rounded-lg"></div>
            <div className="skeleton h-6 w-96 mx-auto rounded-lg"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-96 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#141414]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16" ref={titleRef}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">Our Premium Fleet</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Choose from our carefully selected collection of luxury vehicles, each maintained to the highest standards
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" ref={gridRef}>
          {cars.map((car, index) => (
            <Card 
              key={car._id} 
              className="group bg-white dark:bg-[#1a1a1a] shadow-soft hover:shadow-strong transition-all duration-500 rounded-2xl overflow-hidden hover-lift cursor-pointer border border-gray-200 dark:border-gray-600 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCarClick(car._id)}
            >
              <div className="relative overflow-hidden">
                {(() => {
                  const primaryImage = car.images?.find(img => img.is_primary)?.url
                  return primaryImage ? (
                    <img 
                      src={primaryImage} 
                      alt={car.title}
                      loading="lazy"
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">No Image</span>
                    </div>
                  )
                })()}
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 glass dark:glass-dark rounded-full hover:bg-white/95 dark:hover:bg-gray-800/95 transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-medium">
                    Available
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors duration-300">{car.title}</h3>
                  <p className="text-brand-600 font-semibold capitalize">{car.category}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span className="text-sm font-medium">{car.location}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-brand-600" />
                    <span className="font-medium">{car.fuel_type || 'Petrol'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-brand-600" />
                    <span className="font-medium">{car.transmission || 'Automatic'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-brand-600" />
                    <span className="font-medium">{car.seats || 5} Passengers</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {car.features?.slice(0, 3).map((feature, index) => (
                    <span key={index} className="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 px-2 py-1 rounded-lg text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                  {car.features && car.features.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">+{car.features.length - 3} more</span>
                  )}
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 sm:pt-4">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <div className="flex items-baseline space-x-1 sm:space-x-2">
                      <span className="text-xl sm:text-2xl font-bold text-brand-600">KSH {car.price_per_day.toLocaleString()}</span>
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">/day</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold py-2.5 sm:py-3 rounded-xl shadow-medium hover:shadow-strong transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCarClick(car._id);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 lg:mt-16">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 sm:px-12 py-3 sm:py-4 text-brand-600 border-2 border-brand-600 hover:bg-brand-600 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-strong"
            onClick={() => navigate('/fleet')}
          >
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};
