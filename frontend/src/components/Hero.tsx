
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
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
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
      
      <div className="absolute inset-0 flex items-center justify-start z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-full sm:max-w-lg md:max-w-2xl" ref={heroRef}>
          <div className={`space-y-4 sm:space-y-6 lg:space-y-8 ${heroVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            {/* Trust indicators */}
            <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white ml-1 text-xs sm:text-sm">Trusted</span>
              </div>
              <div className="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-brand-600" />
                <span className="text-white text-xs sm:text-sm">Kenya Wide</span>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Premium{" "}
                <span className="text-brand-600">Rental</span>{" "}
                <span className="block sm:inline">Services</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-full sm:max-w-lg">
                Premium Car Rental Services for vehicles, properties, and vacation stays. Quality service and competitive prices.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button 
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                onClick={() => navigate('/fleet')}
              >
                Book Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-white hover:border-brand-600 hover:text-white text-white hover:bg-brand-600 bg-transparent backdrop-blur-sm w-full sm:w-auto"
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
      </div>
    </section>
  );
};
