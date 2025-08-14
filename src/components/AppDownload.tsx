import { Button } from "@/components/ui/button";
import { Smartphone, Download, Star } from "lucide-react";

const AppDownload = () => {
  return (
    <section className="py-16 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">4.8 stars on app stores</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Get the FleetFeed app for even faster ordering
            </h2>
            
            <p className="text-xl text-primary-foreground/90">
              Download our mobile app and enjoy exclusive offers, faster checkout, and real-time order tracking.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Download className="h-5 w-5" />
                </div>
                <span>One-tap ordering with saved preferences</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span>Push notifications for order updates</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5" />
                </div>
                <span>Exclusive app-only deals and rewards</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="glass" size="xl" className="flex items-center">
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on App Store" 
                  className="h-8"
                />
              </Button>
              <Button variant="glass" size="xl" className="flex items-center">
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-8"
                />
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 bg-white/10 backdrop-blur-sm rounded-3xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-background rounded-2xl shadow-2xl overflow-hidden">
                  <div className="h-full flex items-center justify-center text-foreground">
                    <div className="text-center space-y-4">
                      <Smartphone className="h-16 w-16 mx-auto text-primary" />
                      <div className="space-y-2">
                        <h3 className="font-semibold">FleetFeed App</h3>
                        <p className="text-sm text-muted-foreground">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent rounded-full flex items-center justify-center animate-float">
                <Download className="h-8 w-8 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;