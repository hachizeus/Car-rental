
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Fuel, 
  Settings, 
  Star, 
  MapPin, 
  Shield, 
  Calendar,
  Clock,
  Phone,
  Mail,
  ArrowLeft,
  Check
} from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();

  // Mock car data - in a real app, this would come from an API
  const car = {
    id: 1,
    name: "Mercedes S-Class",
    type: "Luxury Sedan",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop"
    ],
    fuel: "Petrol",
    transmission: "Automatic",
    capacity: "4 Passengers",
    price: 12000,
    originalPrice: null,
    rating: 4.9,
    reviews: 127,
    location: "Nairobi",
    isLiked: true,
    features: ["GPS Navigation", "Air Conditioning", "Bluetooth", "Premium Sound", "Leather Seats", "Sunroof"],
    description: "Experience luxury and comfort with our premium Mercedes S-Class. Perfect for business trips, special occasions, or when you simply want to travel in style. This vehicle combines cutting-edge technology with exceptional comfort.",
    specifications: {
      year: "2023",
      doors: "4",
      luggage: "2 Large Bags",
      fuelTank: "80L",
      engine: "3.0L V6",
      mileage: "12 km/l"
    },
    rentalTerms: [
      "Minimum age: 25 years",
      "Valid driving license required",
      "Deposit: KSh 50,000",
      "Fuel: Return with same level",
      "Late return fee: KSh 2,000/hour",
      "Damage waiver available"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Fleet
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={car.images[0]} 
                alt={car.name}
                className="w-full h-96 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-emerald-600">
                Available
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {car.images.slice(1).map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${car.name} view ${index + 2}`}
                  className="w-full h-24 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Car Information */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
                  <p className="text-emerald-600 font-semibold text-lg">{car.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-700">{car.rating}</span>
                  <span className="text-gray-500">({car.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-600 mb-6">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">{car.location}</span>
              </div>

              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Price and Booking */}
            <Card className="p-6 bg-gray-50">
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-emerald-600">KSH {car.price.toLocaleString()}</span>
                  <span className="text-gray-600">/day</span>
                </div>
                <p className="text-sm text-gray-500">Best price guaranteed</p>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Specifications */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 text-emerald-600 mr-2" />
                Specifications
              </h3>
              <div className="space-y-4">
                {Object.entries(car.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="w-5 h-5 text-emerald-600 mr-2" />
                Features
              </h3>
              <div className="space-y-3">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Rental Terms */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-5 h-5 text-emerald-600 mr-2" />
                Rental Terms
              </h3>
              <div className="space-y-3">
                {car.rentalTerms.map((term, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{term}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Insurance & Support */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="p-6 bg-emerald-50 border-emerald-200">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Full Insurance Included</h3>
                <p className="text-emerald-600">Complete protection for your journey</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Comprehensive coverage including collision damage waiver, theft protection, and third-party liability.
            </p>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">24/7 Support</h3>
                <p className="text-blue-600">Always here when you need us</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Round-the-clock customer support and emergency roadside assistance throughout your rental period.
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails;
