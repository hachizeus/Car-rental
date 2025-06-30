
import { SearchForm } from "@/components/SearchForm";
import { FeaturedCars } from "@/components/FeaturedCars";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SearchForm />
      <Stats />
      <FeaturedCars />
    </div>
  );
};

export default Index;
