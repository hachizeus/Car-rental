
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, MapPin } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_theme(colors.emerald.600)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Trust indicators */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">4.9/5 Customer Rating</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-gray-600">Kenya Wide Service</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Premium{" "}
                <span className="text-emerald-600">Car Rental</span>{" "}
                <span className="block">Experience</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover luxury and reliability with our premium fleet. From business trips to family adventures, we provide exceptional vehicles for every journey.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Book Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-emerald-600 hover:text-emerald-600">
                <Play className="mr-2 w-5 h-5" />
                View Fleet
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-gray-600 font-medium">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">50+</div>
                <div className="text-gray-600 font-medium">Premium Cars</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">24/7</div>
                <div className="text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Main car showcase */}
            <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-900/20"></div>
              <img 
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop" 
                alt="Luxury car" 
                className="relative z-10 w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Mercedes S-Class</h3>
                      <p className="text-emerald-600 font-medium">Luxury Sedan</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">4.9</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-emerald-600">KSH 12,000</span>
                      <span className="text-gray-600">/day</span>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary car card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border w-72 hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=120&fit=crop" 
                alt="BMW X5" 
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">BMW X5</h4>
                    <p className="text-emerald-600 text-sm font-medium">Premium SUV</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-lg font-bold text-emerald-600">KSH 8,500</span>
                    <span className="text-gray-600 text-sm">/day</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
