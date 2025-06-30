
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Settings, Fuel } from "lucide-react";

export const FeaturedCars = () => {
  const cars = [
    {
      id: 1,
      name: "Koenigsegg",
      type: "Sport",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
      fuel: "90L",
      transmission: "Manual",
      capacity: "2 People",
      price: 99,
      originalPrice: null,
      isLiked: true
    },
    {
      id: 2,
      name: "Nissan GT - R",
      type: "Sport",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop",
      fuel: "80L",
      transmission: "Manual",
      capacity: "2 People",
      price: 80,
      originalPrice: 100,
      isLiked: false
    },
    {
      id: 3,
      name: "Rolls - Royce",
      type: "Luxury",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&h=200&fit=crop",
      fuel: "70L",
      transmission: "Manual",
      capacity: "4 People",
      price: 96,
      originalPrice: null,
      isLiked: true
    },
    {
      id: 4,
      name: "All New Rush",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&h=200&fit=crop",
      fuel: "70L",
      transmission: "Manual",
      capacity: "6 People",
      price: 72,
      originalPrice: 80,
      isLiked: false
    },
    {
      id: 5,
      name: "CR - V",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1549399535-8e8d1a81ad0b?w=300&h=200&fit=crop",
      fuel: "80L",
      transmission: "Manual",
      capacity: "6 People",
      price: 80,
      originalPrice: null,
      isLiked: true
    },
    {
      id: 6,
      name: "All New Terios",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1596008194705-2091cd6764d4?w=300&h=200&fit=crop",
      fuel: "90L",
      transmission: "Manual",
      capacity: "6 People",
      price: 74,
      originalPrice: null,
      isLiked: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Car</h2>
          <Button variant="link" className="text-blue-600 font-medium">
            View All
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                  <p className="text-gray-600">{car.type}</p>
                </div>
                <Button variant="ghost" size="sm" className="p-1">
                  <Heart className={`w-5 h-5 ${car.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </Button>
              </div>
              
              <div className="mb-6">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              
              <div className="flex justify-between text-gray-600 text-sm mb-6">
                <div className="flex items-center space-x-1">
                  <Fuel className="w-4 h-4" />
                  <span>{car.fuel}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{car.capacity}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">${car.price}.00/day</span>
                  {car.originalPrice && (
                    <span className="text-gray-400 line-through">${car.originalPrice}.00</span>
                  )}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Rent Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-4 text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Show more car
          </Button>
        </div>
      </div>
    </section>
  );
};
