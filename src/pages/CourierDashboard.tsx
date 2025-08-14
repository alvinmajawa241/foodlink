import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Navigation, Phone, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

const CourierDashboard = () => {
  const todayEarnings = {
    completed: 8,
    earnings: "$127.50",
    tips: "$23.40",
    avgTime: "28 min"
  };

  const currentDelivery = {
    id: "DEL-001",
    restaurant: "Tokyo Fusion",
    customer: "Alice Cooper",
    pickupAddress: "123 Restaurant St",
    deliveryAddress: "456 Customer Ave",
    distance: "2.3 km",
    earnings: "$8.50",
    status: "pickup"
  };

  const availableJobs = [
    { id: "JOB-001", restaurant: "Bella Italia", distance: "1.2 km", earnings: "$12.30", time: "25 min" },
    { id: "JOB-002", restaurant: "Green Bowl", distance: "0.8 km", earnings: "$9.80", time: "20 min" },
    { id: "JOB-003", restaurant: "Burger Palace", distance: "1.5 km", earnings: "$11.20", time: "30 min" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome, Mike!</h1>
              <p className="text-muted-foreground">Courier Dashboard</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Online
              </Badge>
              <Button variant="outline">Go Offline</Button>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                <p className="text-2xl font-bold">{todayEarnings.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{todayEarnings.earnings}</p>
                <p className="text-sm text-muted-foreground">Earnings</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <div className="h-8 w-8 mx-auto mb-2 bg-gradient-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">$</span>
                </div>
                <p className="text-2xl font-bold">{todayEarnings.tips}</p>
                <p className="text-sm text-muted-foreground">Tips</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">{todayEarnings.avgTime}</p>
                <p className="text-sm text-muted-foreground">Avg Time</p>
              </div>
            </Card>
          </div>

          {/* Current Delivery */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Current Delivery</h2>
              <Badge variant="default" className="bg-primary text-primary-foreground">
                In Progress
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Restaurant</p>
                    <p className="font-medium">{currentDelivery.restaurant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">{currentDelivery.customer}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{currentDelivery.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Earnings</p>
                    <p className="font-semibold text-primary">{currentDelivery.earnings}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">Pickup: {currentDelivery.pickupAddress}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-accent" />
                  <span className="text-sm">Delivery: {currentDelivery.deliveryAddress}</span>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button variant="success" className="flex-1">
                  Mark Delivered
                </Button>
              </div>
            </div>
          </Card>

          {/* Available Jobs */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Available Deliveries</h2>
            
            <div className="space-y-3">
              {availableJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{job.restaurant}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{job.distance}</span>
                        <span>{job.time}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-primary">{job.earnings}</p>
                      <Button size="sm" variant="outline">
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {availableJobs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No deliveries available right now</p>
                <p className="text-sm">Stay online to get notified of new orders</p>
              </div>
            )}
          </Card>

          {/* Weekly Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">This Week</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Deliveries</p>
              </div>
              <div>
                <p className="text-2xl font-bold">$520.80</p>
                <p className="text-sm text-muted-foreground">Earnings</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.9★</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold">26 min</p>
                <p className="text-sm text-muted-foreground">Avg Time</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CourierDashboard;