
import { SearchForm } from "@/components/SearchForm";
import { FeaturedCars } from "@/components/FeaturedCars";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="animate-fade-in">
        <Hero />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <SearchForm />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <Stats />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
        <FeaturedCars />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
