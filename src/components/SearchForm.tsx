
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Clock, Search } from "lucide-react";

export const SearchForm = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Your Perfect Ride</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our premium fleet and book instantly. Professional service guaranteed.
          </p>
        </div>
        
        <Card className="p-8 shadow-2xl border-0 bg-white dark:bg-gray-800 rounded-3xl max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pick-Up */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pick-Up Location</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-emerald-600" />
                    <Input 
                      placeholder="Nairobi, Kenya" 
                      className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 rounded-xl text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide">Pick-Up Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-emerald-600" />
                    <Input 
                      type="date" 
                      className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 rounded-xl text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4 w-5 h-5 text-emerald-600" />
                    <Input 
                      type="time" 
                      className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 rounded-xl text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Drop-Off */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Drop-Off Location</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-blue-500" />
                    <Input 
                      placeholder="Mombasa, Kenya" 
                      className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 rounded-xl text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide">Drop-Off Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-blue-500" />
                    <Input 
                      type="date" 
                      className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 rounded-xl text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wide">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4 w-5 h-5 text-blue-500" />
                    <Input 
                      type="time" 
                      className="pl-12 h-14 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 rounded-xl text-gray-900 dark:text-white font-medium bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Search Button */}
          <div className="flex justify-center mt-12">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover-lift"
            >
              <Search className="mr-3 w-5 h-5" />
              Search Available Cars
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
