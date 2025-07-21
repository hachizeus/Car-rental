import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Settings, Fuel, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

export const PremiumFleet = () => {
  const navigate = useNavigate();
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [processedCars, setProcessedCars] = useState<any[]>([]);

  const { data: allCars = [], isLoading } = useQuery({
    queryKey: ['featured-cars'],
    queryFn: api.getCars
  })
  
  // Process cars to handle potential issues
  useEffect(() => {
    if (allCars && allCars.length > 0) {
      const filtered = allCars
        .filter(car => car.is_available)
        .map(car => ({
          ...car,
          // Filter out any problematic videos
          videos: Array.isArray(car.videos) ? car.videos.filter(url => typeof url === 'string' && url.trim() !== '') : []
        }))
        .slice(0, 6);
      
      setProcessedCars(filtered);
    }
  }, [allCars]);
  
  const cars = processedCars

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="skeleton h-12 w-64 mx-auto mb-4 rounded-lg"></div>
            <div className="skeleton h-6 w-96 mx-auto rounded-lg"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-96 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#141414]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" ref={titleRef}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Premium Fleet</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our carefully selected collection of luxury vehicles, each maintained to the highest standards
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
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
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
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
                    <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors duration-300">{car.title}</h3>
                  <p className="text-brand-600 font-semibold capitalize">{car.category}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span className="text-sm font-medium">{car.location}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-brand-600" />
                    <span className="font-medium">{car.fuel_type || 'Petrol'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-brand-600" />
                    <span className="font-medium">{car.transmission || 'Auto'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-brand-600" />
                    <span className="font-medium">{car.seats || 5} Seats</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xl font-bold text-brand-600">KSH {car.price_per_day.toLocaleString()}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">/day</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-xl"
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
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="px-8 py-3 text-brand-600 border-2 border-brand-600 hover:bg-brand-600 hover:text-white font-semibold rounded-xl"
            onClick={() => navigate('/fleet')}
          >
            Explore Our Fleet
          </Button>
        </div>
      </div>
    </section>
  );
};