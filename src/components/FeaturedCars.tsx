import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Settings, Fuel, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FeaturedCars = () => {
  const navigate = useNavigate();

  const cars = [
    {
      id: 1,
      name: "Mercedes S-Class",
      type: "Luxury Sedan",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
      fuel: "Petrol",
      transmission: "Automatic",
      capacity: "4 Passengers",
      price: 12000,
      originalPrice: null,
      rating: 4.9,
      location: "Nairobi",
      isLiked: true,
      features: ["GPS", "AC", "Bluetooth"]
    },
    {
      id: 2,
      name: "BMW X5",
      type: "Premium SUV",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
      fuel: "Petrol",
      transmission: "Automatic",
      capacity: "7 Passengers",
      price: 8500,
      originalPrice: 10000,
      rating: 4.8,
      location: "Mombasa",
      isLiked: false,
      features: ["GPS", "AC", "4WD"]
    },
    {
      id: 3,
      name: "Range Rover Vogue",
      type: "Luxury SUV",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&h=200&fit=crop",
      fuel: "Diesel",
      transmission: "Automatic",
      capacity: "5 Passengers",
      price: 15000,
      originalPrice: null,
      rating: 4.9,
      location: "Kisumu",
      isLiked: true,
      features: ["GPS", "AC", "Premium Sound"]
    },
    {
      id: 4,
      name: "Toyota Prado",
      type: "Premium SUV",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop",
      fuel: "Diesel",
      transmission: "Automatic",
      capacity: "7 Passengers",
      price: 7200,
      originalPrice: 8000,
      rating: 4.7,
      location: "Nakuru",
      isLiked: false,
      features: ["GPS", "AC", "4WD"]
    },
    {
      id: 5,
      name: "Audi Q7",
      type: "Luxury SUV",
      image: "https://images.unsplash.com/photo-1549399535-8e8d1a81ad0b?w=300&h=200&fit=crop",
      fuel: "Petrol",
      transmission: "Automatic",
      capacity: "7 Passengers",
      price: 9500,
      originalPrice: null,
      rating: 4.8,
      location: "Eldoret",
      isLiked: true,
      features: ["GPS", "AC", "Premium Interior"]
    },
    {
      id: 6,
      name: "Lexus LX 570",
      type: "Ultra Luxury SUV",
      image: "https://images.unsplash.com/photo-1596008194705-2091cd6764d4?w=300&h=200&fit=crop",
      fuel: "Petrol",
      transmission: "Automatic",
      capacity: "8 Passengers",
      price: 18000,
      originalPrice: null,
      rating: 4.9,
      location: "Nairobi",
      isLiked: false,
      features: ["GPS", "AC", "Premium Package"]
    }
  ];

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
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className={`w-5 h-5 ${car.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
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
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{car.name}</h3>
                    <p className="text-emerald-600 font-semibold">{car.type}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">{car.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">{car.location}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">{car.fuel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">{car.capacity}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <span key={index} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-emerald-600">KSH {car.price.toLocaleString()}</span>
                      <span className="text-gray-600">/day</span>
                      {car.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">KSH {car.originalPrice.toLocaleString()}</span>
                      )}
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
