
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Clock, ArrowUpDown } from "lucide-react";

export const SearchForm = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <Card className="p-8 shadow-lg border-0 bg-white rounded-2xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pick-Up */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">Pick - Up</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">Locations</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="Select your city" 
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input 
                      type="date" 
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input 
                      type="time" 
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Swap Button */}
            <div className="lg:col-span-2 flex justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 w-16 h-16 rounded-xl"
              >
                <ArrowUpDown className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Drop-Off */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">Drop - Off</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">Locations</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="Select your city" 
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input 
                      type="date" 
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input 
                      type="time" 
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
