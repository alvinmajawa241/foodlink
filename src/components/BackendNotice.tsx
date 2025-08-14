import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Database, Zap, Shield, ArrowRight } from "lucide-react";

const BackendNotice = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 border-2 border-primary/20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">Production-Ready Backend Required</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Complete Your Food Delivery Platform
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This beautiful frontend showcases the complete FleetFeed platform. To unlock the full functionality 
              including authentication, payments, real-time tracking, and data persistence, connect to Supabase.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Database className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Database & Storage</h3>
                <p className="text-sm text-muted-foreground">User data, orders, menus, and file storage</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold">Authentication</h3>
                <p className="text-sm text-muted-foreground">Multi-role auth for customers, merchants, couriers</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold">Real-time Features</h3>
                <p className="text-sm text-muted-foreground">Live tracking, notifications, and updates</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-6 text-left max-w-3xl mx-auto">
              <h4 className="font-semibold mb-3">Backend Features to Implement:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>• User management & authentication</div>
                <div>• Order processing & payments</div>
                <div>• Restaurant & menu management</div>
                <div>• Courier dispatch system</div>
                <div>• Real-time location tracking</div>
                <div>• Push notifications</div>
                <div>• Analytics & reporting</div>
                <div>• Payment processing (Stripe)</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="hero" size="xl" className="group">
                Connect to Supabase
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                View Documentation
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Click the green Supabase button in the top-right corner to get started
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BackendNotice;