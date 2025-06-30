
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Fuel, Settings, Star } from "lucide-react";

const Fleet = () => {
  const cars = [
    {
      id: 1,
      name: "Toyota Camry",
      category: "Sedan",
      price: "KSh 5,000",
      image: "/placeholder.svg",
      rating: 4.8,
      features: ["5 Seats", "Automatic", "Petrol", "AC"],
      available: true
    },
    {
      id: 2,
      name: "BMW X5",
      category: "SUV",
      price: "KSh 12,000",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["7 Seats", "Automatic", "Petrol", "AC"],
      available: true
    },
    {
      id: 3,
      name: "Mercedes C-Class",
      category: "Luxury",
      price: "KSh 15,000",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["5 Seats", "Automatic", "Petrol", "AC"],
      available: false
    },
    {
      id: 4,
      name: "Honda CR-V",
      category: "SUV",
      price: "KSh 8,000",
      image: "/placeholder.svg",
      rating: 4.7,
      features: ["5 Seats", "Automatic", "Petrol", "AC"],
      available: true
    },
    {
      id: 5,
      name: "Nissan Sentra",
      category: "Sedan",
      price: "KSh 4,500",
      image: "/placeholder.svg",
      rating: 4.6,
      features: ["5 Seats", "Manual", "Petrol", "AC"],
      available: true
    },
    {
      id: 6,
      name: "Range Rover Sport",
      category: "Luxury",
      price: "KSh 20,000",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["5 Seats", "Automatic", "Petrol", "AC"],
      available: true
    }
  ];

  const categories = ["All", "Sedan", "SUV", "Luxury"];

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
            <h1 className="text-5xl font-bold text-white mb-6">Our Premium Fleet</h1>
            <p className="text-emerald-100 text-xl max-w-2xl mx-auto">
              Choose from our extensive collection of well-maintained vehicles for every occasion
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50 hover:border-emerald-600"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!car.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Not Available</Badge>
                    </div>
                  )}
                  <Badge className="absolute top-4 left-4 bg-emerald-600">{car.category}</Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{car.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        {feature.includes("Seats") && <Users className="w-4 h-4 text-emerald-600" />}
                        {feature.includes("Petrol") && <Fuel className="w-4 h-4 text-emerald-600" />}
                        {(feature.includes("Automatic") || feature.includes("Manual")) && <Settings className="w-4 h-4 text-emerald-600" />}
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">{car.price}</span>
                      <span className="text-gray-600">/day</span>
                    </div>
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={!car.available}
                    >
                      {car.available ? "Book Now" : "Unavailable"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
