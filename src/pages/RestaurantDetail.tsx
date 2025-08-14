import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, Clock, MapPin, Phone, ArrowLeft, Plus, Minus,
  Heart, Share2, Info, ChefHat 
} from 'lucide-react';
import { mockApi } from '@/lib/mockApi';
import { useCartStore } from '@/store/cartStore';
import { Restaurant, MenuItem, MenuCategory } from '@/types';
import Header from '@/components/Header';
import MenuItemModal from '@/components/MenuItemModal';
import { useToast } from '@/hooks/use-toast';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isMenuItemModalOpen, setIsMenuItemModalOpen] = useState(false);
  
  const { items: cartItems, restaurant: cartRestaurant, setRestaurant } = useCartStore();

  const { data: restaurant, isLoading: restaurantLoading } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => mockApi.getRestaurant(id!),
    enabled: !!id
  });

  const { data: menuData, isLoading: menuLoading } = useQuery({
    queryKey: ['menu', id],
    queryFn: () => mockApi.getMenu(id!),
    enabled: !!id
  });

  useEffect(() => {
    if (restaurant?.data && !cartRestaurant) {
      setRestaurant(restaurant.data);
    }
  }, [restaurant, cartRestaurant, setRestaurant]);

  const handleItemClick = (item: MenuItem) => {
    if (!item.isAvailable) {
      toast({
        title: 'Item Unavailable',
        description: 'This item is currently not available.',
        variant: 'destructive'
      });
      return;
    }
    
    setSelectedItem(item);
    setIsMenuItemModalOpen(true);
  };

  const getItemQuantityInCart = (itemId: string) => {
    return cartItems.find(item => item.menuItem.id === itemId)?.quantity || 0;
  };

  if (restaurantLoading || menuLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="animate-pulse">
          <div className="h-64 bg-muted"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant?.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const restaurantData = restaurant.data;
  const categories = menuData?.data.categories || [];
  const menuItems = menuData?.data.items || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <img 
          src={restaurantData.coverImage} 
          alt={restaurantData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white bg-white/20 hover:bg-white/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1" />
            <Button variant="secondary" size="sm" className="text-white bg-white/20 hover:bg-white/30">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" className="text-white bg-white/20 hover:bg-white/30">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">{restaurantData.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span>{restaurantData.rating}</span>
              <span className="text-white/80">({restaurantData.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{restaurantData.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>KES {restaurantData.deliveryFee} delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Menu</h2>
              <p className="text-muted-foreground">{restaurantData.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {restaurantData.cuisineType.map(cuisine => (
                  <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
                ))}
                {restaurantData.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <Tabs defaultValue={categories[0]?.id} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <div className="grid gap-4">
                    {menuItems
                      .filter(item => item.categoryId === category.id)
                      .map(item => {
                        const quantityInCart = getItemQuantityInCart(item.id);
                        return (
                          <Card 
                            key={item.id} 
                            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                              !item.isAvailable ? 'opacity-50' : ''
                            }`}
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-medium text-lg">{item.name}</h4>
                                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                      {item.description}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <span className="font-semibold text-lg">KES {item.price}</span>
                                      {item.calories && (
                                        <span className="text-xs text-muted-foreground">
                                          {item.calories} cal
                                        </span>
                                      )}
                                    </div>
                                    
                                    {item.tags.length > 0 && (
                                      <div className="flex gap-1 mt-2">
                                        {item.tags.map(tag => (
                                          <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {quantityInCart > 0 && (
                                    <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-3 py-1">
                                      <Minus className="h-4 w-4" />
                                      <span className="font-medium">{quantityInCart}</span>
                                      <Plus className="h-4 w-4" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {item.image && (
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </Card>
                        );
                      })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Restaurant Info Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Restaurant Info
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Hours</h4>
                  <div className="text-sm text-muted-foreground space-y-1 mt-1">
                    {Object.entries(restaurantData.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}</span>
                        <span>
                          {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium">Delivery Info</h4>
                  <div className="text-sm text-muted-foreground space-y-1 mt-1">
                    <div className="flex justify-between">
                      <span>Delivery time</span>
                      <span>{restaurantData.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery fee</span>
                      <span>KES {restaurantData.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum order</span>
                      <span>KES {restaurantData.minimumOrder}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Restaurant
                </Button>
              </div>
            </Card>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <Card className="p-4 sticky top-24">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Your Order</span>
                  <Badge variant="secondary">{cartItems.length} items</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  {cartItems.slice(0, 2).map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span className="truncate">{item.quantity}x {item.menuItem.name}</span>
                      <span>KES {item.price}</span>
                    </div>
                  ))}
                  {cartItems.length > 2 && (
                    <div className="text-muted-foreground">
                      +{cartItems.length - 2} more items
                    </div>
                  )}
                </div>
                <Separator className="my-3" />
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/checkout')}
                >
                  View Cart & Checkout
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Menu Item Modal */}
      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          isOpen={isMenuItemModalOpen}
          onClose={() => {
            setIsMenuItemModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default RestaurantDetail;