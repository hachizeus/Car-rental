import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Fuel, Settings, Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const Fleet = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data } = await supabase
        .from('cars')
        .select(`
          *,
          car_images(image_url, is_primary)
        `)
        .order('created_at', { ascending: false })
      return data || []
    }
  })

  // Filter cars based on search and filters
  const filteredCars = cars?.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
    const matchesPrice = car.price_per_day >= priceRange.min && car.price_per_day <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="py-20 text-center">
          <p className="text-xl text-gray-600">Loading cars...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const categories = ["All", "economy", "luxury", "suv"];

  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

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

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search cars by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "All" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Min Price (KSh)</label>
                <Input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Price (KSh)</label>
                <Input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 50000})}
                  placeholder="50000"
                />
              </div>
            </div>
            
            {/* Results Count */}
            <div className="text-center">
              <p className="text-gray-600">
                Showing {filteredCars.length} of {cars?.length || 0} cars
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <Card 
                key={car.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in cursor-pointer" 
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleCarClick(car.id)}
              >
                <div className="relative">
                  {(() => {
                    const primaryImage = car.car_images?.find(img => img.is_primary)?.image_url
                    return primaryImage ? (
                      <img 
                        src={primaryImage} 
                        alt={car.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )
                  })()}
                  {!car.is_available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Not Available</Badge>
                    </div>
                  )}
                  <Badge className="absolute top-4 left-4 bg-emerald-600">{car.category}</Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{car.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {car.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-emerald-600">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">KSh {car.price_per_day.toLocaleString()}</span>
                      <span className="text-gray-600">/day</span>
                    </div>
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={!car.is_available}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (car.is_available) {
                          handleCarClick(car.id);
                        }
                      }}
                    >
                      {car.is_available ? "Book Now" : "Unavailable"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No cars found matching your criteria</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setPriceRange({ min: 0, max: 50000 });
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fleet;