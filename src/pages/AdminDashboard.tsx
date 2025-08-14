import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Store, Truck, DollarSign, TrendingUp, AlertTriangle, Settings, BarChart3 } from "lucide-react";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const platformStats = {
    totalUsers: "125,430",
    activeRestaurants: "1,247",
    activeCouriers: "2,856",
    todayOrders: "4,321",
    revenue: "$89,240",
    avgDeliveryTime: "26 min"
  };

  const recentAlerts = [
    { id: 1, type: "warning", message: "High delivery time in Downtown area", time: "5 min ago" },
    { id: 2, type: "info", message: "New restaurant partner approved", time: "15 min ago" },
    { id: 3, type: "error", message: "Payment gateway timeout reported", time: "1 hour ago" }
  ];

  const topRestaurants = [
    { name: "Bella Italia", orders: 123, revenue: "$3,240", rating: 4.8 },
    { name: "Tokyo Fusion", orders: 98, revenue: "$2,850", rating: 4.7 },
    { name: "Green Bowl", orders: 87, revenue: "$2,190", rating: 4.9 },
    { name: "Burger Palace", orders: 76, revenue: "$2,020", rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">FleetFeed Platform Management</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="hero">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{platformStats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Restaurants</p>
                  <p className="text-2xl font-bold">{platformStats.activeRestaurants}</p>
                </div>
                <Store className="h-8 w-8 text-secondary" />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Couriers</p>
                  <p className="text-2xl font-bold">{platformStats.activeCouriers}</p>
                </div>
                <Truck className="h-8 w-8 text-accent" />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today Orders</p>
                  <p className="text-2xl font-bold">{platformStats.todayOrders}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">{platformStats.revenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-warning" />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Delivery</p>
                  <p className="text-2xl font-bold">{platformStats.avgDeliveryTime}</p>
                </div>
                <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">⏱</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Alerts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">System Alerts</h2>
                <Badge variant="outline">{recentAlerts.length}</Badge>
              </div>
              
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      alert.type === 'error' ? 'text-destructive' :
                      alert.type === 'warning' ? 'text-warning' : 'text-accent'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </Card>

            {/* Top Restaurants */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Restaurants Today</h2>
              
              <div className="space-y-3">
                {topRestaurants.map((restaurant, index) => (
                  <div key={restaurant.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{restaurant.name}</h3>
                        <p className="text-sm text-muted-foreground">{restaurant.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{restaurant.revenue}</p>
                      <p className="text-sm text-muted-foreground">{restaurant.rating}★</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-3" />
                  Manage Users
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Store className="h-4 w-4 mr-3" />
                  Restaurant Approvals
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Truck className="h-4 w-4 mr-3" />
                  Courier Management
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-3" />
                  Financial Reports
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-3" />
                  Platform Analytics
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  System Settings
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Live Platform Activity</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Online Users</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Store className="h-8 w-8 text-secondary-foreground" />
                </div>
                <p className="text-2xl font-bold">892</p>
                <p className="text-sm text-muted-foreground">Open Restaurants</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-8 w-8 text-accent-foreground" />
                </div>
                <p className="text-2xl font-bold">456</p>
                <p className="text-sm text-muted-foreground">Active Couriers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-warning to-success rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <p className="text-2xl font-bold">167</p>
                <p className="text-sm text-muted-foreground">Orders/Hour</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;