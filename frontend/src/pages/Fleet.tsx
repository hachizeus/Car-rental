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
import { api, Car } from "@/lib/api";


const Fleet = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  


  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: api.getCars
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
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="py-20 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading cars...</p>
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
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Premium Fleet</h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto">
              Choose from our extensive collection of well-maintained vehicles for every occasion
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-[#141414]">
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
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
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
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Min Price (KSh)</label>
                <Input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Max Price (KSh)</label>
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
              <p className="text-gray-600 dark:text-gray-300">
                Showing {filteredCars.length} of {cars?.length || 0} cars
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16 bg-white dark:bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <Card 
                key={car.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in cursor-pointer bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-600" 
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleCarClick(car._id)}
              >
                <div className="relative">
                  {(() => {
                    const primaryImage = car.images?.find(img => img.is_primary)?.url
                    return primaryImage ? (
                      <img 
                        src={primaryImage} 
                        alt={car.title}
                        loading="lazy"
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
                  <Badge className="absolute top-4 left-4 bg-brand-600">{car.category}</Badge>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{car.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{car.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Fuel className="w-4 h-4 text-brand-600" />
                      <span>{car.fuel_type || 'Petrol'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Settings className="w-4 h-4 text-brand-600" />
                      <span>{car.transmission || 'Automatic'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 text-brand-600" />
                      <span>{car.seats || 5} Seats</span>
                    </div>
                    {car.year && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="text-brand-600">•</span>
                        <span>{car.year}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-brand-600">KSh {car.price_per_day.toLocaleString()}</span>
                      <span className="text-gray-600 dark:text-gray-300">/day</span>
                    </div>
                    <Button 
                      className="bg-brand-600 hover:bg-brand-700"
                      disabled={!car.is_available}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (car.is_available) {
                          handleCarClick(car._id);
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
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">No cars found matching your criteria</p>
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