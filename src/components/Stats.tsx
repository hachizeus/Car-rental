
export const Stats = () => {
  const stats = [
    { number: "500+", label: "Satisfied Clients", description: "Happy customers nationwide" },
    { number: "50+", label: "Premium Vehicles", description: "Latest model luxury cars" },
    { number: "15+", label: "Service Locations", description: "Major cities covered" },
    { number: "24/7", label: "Customer Support", description: "Round-the-clock assistance" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_white_1px,_transparent_1px)] bg-[length:32px_32px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose MORENT?</h2>
          <p className="text-emerald-100 text-xl max-w-2xl mx-auto">
            Your trusted partner for premium car rental services across Kenya
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105 hover-lift">
                <div className="text-5xl font-bold text-white mb-3">{stat.number}</div>
                <div className="text-emerald-100 font-bold text-lg mb-2">{stat.label}</div>
                <div className="text-emerald-200 text-sm">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
