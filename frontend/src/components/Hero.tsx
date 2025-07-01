
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import videoSrc from "@/assets/images/vida.mp4";

export const Hero = () => {
  const navigate = useNavigate();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-[#141414] py-2 overflow-hidden texture-light dark:texture-none">
      <div className="max-w-none mx-2 relative">
        <Card className="bg-transparent shadow-strong border border-gray-200 dark:border-gray-600 rounded-3xl overflow-hidden relative">
          {/* Video Background with Fallback */}
          <div className="absolute inset-0 w-full h-full">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ filter: 'brightness(0.7)' }}
              onError={(e) => {
                console.log('Video failed to load, hiding video element');
                e.currentTarget.style.display = 'none';
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            {/* Fallback gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10"></div>
          </div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 z-1"></div>
          
          
          
          <div className="p-8 sm:p-12 md:p-16 lg:p-24 py-16 sm:py-20 md:py-24 lg:py-32 relative z-10">
            <div className="max-w-xs sm:max-w-lg md:max-w-2xl" ref={heroRef}>
          <div className={`space-y-4 sm:space-y-6 lg:space-y-8 ${heroVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            {/* Trust indicators */}
            <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300 ml-1 text-xs sm:text-sm">Trusted</span>
              </div>
              <div className="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-brand-600" />
                <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Kenya Wide</span>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-5">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Premium{" "}
                <span className="text-brand-600">Rental</span>{" "}
                <span className="block">Services</span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-xs sm:max-w-lg">
                Premium Car Rental Services for vehicles, properties, and vacation stays. Quality service and competitive prices.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                className="bg-brand-600 hover:bg-brand-700 text-white px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/fleet')}
              >
                Book Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg border-2 border-white hover:border-brand-600 hover:text-white text-white hover:bg-brand-600 bg-transparent backdrop-blur-sm"
                onClick={() => navigate('/fleet')}
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                View Fleet
              </Button>
            </div>
            
            {/* Stats */}
            <div className={`grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-300 ${statsVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={statsRef}>
              <div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-brand-600">500+</div>
                <div className="text-gray-200 font-medium text-xs sm:text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-brand-600">50+</div>
                <div className="text-gray-200 font-medium text-xs sm:text-sm">Premium Cars</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-brand-600">24/7</div>
                <div className="text-gray-200 font-medium text-xs sm:text-sm">Support</div>
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
