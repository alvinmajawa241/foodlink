import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Package, TrendingUp, Bell } from "lucide-react";
import Header from "@/components/Header";

const MerchantDashboard = () => {
  const todayStats = {
    orders: 23,
    revenue: "$485.50",
    avgOrder: "$21.10",
    rating: 4.8
  };

  const newOrders = [
    { id: "ORD-101", customer: "Sarah M.", items: 3, total: "$28.50", time: "2 min ago", status: "new" },
    { id: "ORD-102", customer: "Mike R.", items: 2, total: "$19.20", time: "5 min ago", status: "preparing" },
    { id: "ORD-103", customer: "Anna K.", items: 4, total: "$35.80", time: "8 min ago", status: "ready" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Bella Italia Dashboard</h1>
              <p className="text-muted-foreground">Restaurant Partner Portal</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Open
              </Badge>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Orders</p>
                  <p className="text-2xl font-bold">{todayStats.orders}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">{todayStats.revenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-success" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order</p>
                  <p className="text-2xl font-bold">{todayStats.avgOrder}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{todayStats.rating}★</p>
                </div>
                <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">★</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Orders Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* New Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New Orders</h2>
                <Badge variant="outline">{newOrders.length} pending</Badge>
              </div>
              
              <div className="space-y-4">
                {newOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <Badge 
                        variant={order.status === 'new' ? 'destructive' : order.status === 'preparing' ? 'default' : 'secondary'}
                        className={order.status === 'ready' ? 'bg-success text-success-foreground' : ''}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>{order.items} items • {order.total}</span>
                      <span className="text-muted-foreground">{order.time}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {order.status === 'new' && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">Decline</Button>
                          <Button variant="default" size="sm" className="flex-1">Accept</Button>
                        </>
                      )}
                      {order.status === 'preparing' && (
                        <Button variant="success" size="sm" className="w-full">Mark Ready</Button>
                      )}
                      {order.status === 'ready' && (
                        <Button variant="accent" size="sm" className="w-full">Notify Courier</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start h-12">
                  <Package className="h-5 w-5 mr-3" />
                  Manage Menu Items
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12">
                  <Clock className="h-5 w-5 mr-3" />
                  Update Operating Hours
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12">
                  <TrendingUp className="h-5 w-5 mr-3" />
                  View Analytics
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-12">
                  <DollarSign className="h-5 w-5 mr-3" />
                  Payout Settings
                </Button>
              </div>

              {/* Restaurant Status */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-medium mb-2">Restaurant Status</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Currently accepting orders</span>
                  <Button variant="ghost" size="sm">
                    Go Offline
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MerchantDashboard;