import { Button } from "@/components/ui/button";
import { MapPin, ShoppingCart, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Choose Location",
    description: "Enter your address to see restaurants that deliver to you"
  },
  {
    icon: ShoppingCart,
    title: "Pick Your Food",
    description: "Browse menus and add your favorite items to your cart"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Your order is prepared and delivered in 30 minutes or less"
  },
  {
    icon: CheckCircle,
    title: "Enjoy Your Meal",
    description: "Track your order in real-time and enjoy your delicious food"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get your favorite food delivered in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-primary">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="xl">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;