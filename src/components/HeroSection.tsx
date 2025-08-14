import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Star } from "lucide-react";
import heroImage from "@/assets/hero-delivery.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Food delivery hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-background/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white animate-fade-in">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Trusted by 1M+ customers</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Food delivery made
              <span className="block bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
                simple & fast
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Get your favorite meals delivered in 30 minutes or less from the best restaurants in your city
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-elegant animate-slide-up max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Enter your delivery address"
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button variant="hero" size="xl" className="md:w-auto">
                  <Search className="h-5 w-5 mr-2" />
                  Find Food
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Popular searches: Pizza, Burger, Sushi, Healthy bowls
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-white animate-fade-in">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">10k+</div>
              <div className="text-sm opacity-90">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">30min</div>
              <div className="text-sm opacity-90">Avg Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">4.8★</div>
              <div className="text-sm opacity-90">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;