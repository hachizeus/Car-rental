
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The Best Platform for{" "}
                <span className="text-blue-600">Car Rental</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Ease of doing a car rental safely and reliably. Of course at a low price.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Rental Car
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Play className="mr-2 w-5 h-5" />
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-blue-600 rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop" 
                alt="Luxury car" 
                className="relative z-10 w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900">Koenigsegg</h3>
                  <p className="text-gray-600 text-sm">Sport</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold text-blue-600">$99.00/day</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Rent Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional car card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border w-64">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=120&fit=crop" 
                alt="Nissan GT-R" 
                className="w-full h-24 object-cover rounded-lg mb-3"
              />
              <h4 className="font-semibold text-gray-900">Nissan GT - R</h4>
              <p className="text-gray-600 text-sm">Sport</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-blue-600">$80.00/day</span>
                <Button size="sm" variant="outline">
                  Rent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
