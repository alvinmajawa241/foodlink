import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";

const CustomerDashboard = () => {
  const activeOrder = {
    id: "ORD-001",
    restaurant: "Bella Italia",
    items: ["Margherita Pizza", "Caesar Salad"],
    status: "On the way",
    eta: "8 mins",
    courier: "Mike Johnson",
    total: "$24.50"
  };

  const orderHistory = [
    { id: "ORD-002", restaurant: "Tokyo Fusion", date: "Yesterday", total: "$18.90" },
    { id: "ORD-003", restaurant: "Green Bowl", date: "2 days ago", total: "$15.20" },
    { id: "ORD-004", restaurant: "Burger Palace", date: "1 week ago", total: "$22.30" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">Ready to order something delicious?</p>
            <Button variant="hero" size="lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Start New Order
            </Button>
          </div>

          {/* Active Order */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Order</h2>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                {activeOrder.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">{activeOrder.restaurant}</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeOrder.items.join(", ")}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>{activeOrder.eta}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Downtown Manhattan</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Courier</p>
                  <p className="font-medium">{activeOrder.courier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-semibold text-lg">{activeOrder.total}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <Button variant="outline" className="flex-1">
                Track Order
              </Button>
              <Button variant="outline" className="flex-1">
                Contact Courier
              </Button>
            </div>
          </Card>

          {/* Order History */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <h3 className="font-medium">{order.restaurant}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <Button variant="ghost" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center hover:shadow-elegant transition-all cursor-pointer">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-1">Favorites</h3>
              <p className="text-sm text-muted-foreground">Your saved restaurants</p>
            </Card>
            
            <Card className="p-4 text-center hover:shadow-elegant transition-all cursor-pointer">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <h3 className="font-medium mb-1">Addresses</h3>
              <p className="text-sm text-muted-foreground">Manage delivery locations</p>
            </Card>
            
            <Card className="p-4 text-center hover:shadow-elegant transition-all cursor-pointer">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-medium mb-1">Past Orders</h3>
              <p className="text-sm text-muted-foreground">View order history</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;