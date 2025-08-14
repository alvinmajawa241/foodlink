import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Store, Truck, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "customer",
    title: "Customer",
    description: "Order food from your favorite restaurants",
    icon: User,
    color: "primary",
    path: "/customer"
  },
  {
    id: "merchant",
    title: "Restaurant Partner",
    description: "Manage your restaurant and orders",
    icon: Store,
    color: "secondary",
    path: "/merchant"
  },
  {
    id: "courier",
    title: "Delivery Courier",
    description: "Earn money by delivering orders",
    icon: Truck,
    color: "accent",
    path: "/courier"
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    description: "Platform management and analytics",
    icon: Shield,
    color: "warning",
    path: "/admin"
  }
];

const RoleSelector = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            FleetFeed serves everyone in the food delivery ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className="p-6 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                onClick={() => navigate(role.path)}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{role.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Access Portal
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            New to FleetFeed? Join our community
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg">
              Sign Up as Customer
            </Button>
            <Button variant="secondary" size="lg">
              Partner with Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSelector;