import { seedData } from './seedData';
import { 
  User, Restaurant, MenuItem, Order, Courier, CourierJob, 
  ApiResponse, SearchFilters, Address, PaymentMethod, Review, Promotion 
} from '@/types';

// Simulate network latency
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random errors (5% chance)
const simulateError = () => {
  if (Math.random() < 0.05) {
    throw new Error('Network error occurred');
  }
};

class MockApi {
  private currentUser: User | null = null;
  private authToken: string | null = localStorage.getItem('auth_token');

  // Auth APIs
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay();
    simulateError();
    
    const user = seedData.users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = `mock_token_${user.id}`;
    localStorage.setItem('auth_token', token);
    this.authToken = token;
    this.currentUser = user;
    
    return {
      data: { user, token },
      success: true,
      message: 'Login successful'
    };
  }

  async signup(userData: Partial<User>): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(800);
    simulateError();
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email!,
      name: userData.name!,
      phone: userData.phone,
      role: userData.role || 'customer',
      status: 'active',
      createdAt: new Date().toISOString(),
      ...userData
    };
    
    seedData.users.push(newUser);
    
    const token = `mock_token_${newUser.id}`;
    localStorage.setItem('auth_token', token);
    this.authToken = token;
    this.currentUser = newUser;
    
    return {
      data: { user: newUser, token },
      success: true,
      message: 'Account created successfully'
    };
  }

  async logout(): Promise<ApiResponse<null>> {
    await delay(300);
    localStorage.removeItem('auth_token');
    this.authToken = null;
    this.currentUser = null;
    
    return {
      data: null,
      success: true,
      message: 'Logged out successfully'
    };
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(200);
    
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }
    
    if (!this.currentUser) {
      const userId = this.authToken.split('_')[2];
      this.currentUser = seedData.users.find(u => u.id === userId) || null;
    }
    
    if (!this.currentUser) {
      throw new Error('User not found');
    }
    
    return {
      data: this.currentUser,
      success: true
    };
  }

  // Restaurant APIs
  async getRestaurants(lat?: number, lng?: number, filters?: SearchFilters): Promise<ApiResponse<Restaurant[]>> {
    await delay(400);
    simulateError();
    
    let restaurants = [...seedData.restaurants];
    
    if (filters?.query) {
      restaurants = restaurants.filter(r => 
        r.name.toLowerCase().includes(filters.query!.toLowerCase()) ||
        r.cuisineType.some(c => c.toLowerCase().includes(filters.query!.toLowerCase()))
      );
    }
    
    if (filters?.cuisine?.length) {
      restaurants = restaurants.filter(r => 
        r.cuisineType.some(c => filters.cuisine!.includes(c))
      );
    }
    
    if (filters?.rating) {
      restaurants = restaurants.filter(r => r.rating >= filters.rating!);
    }
    
    // Sort
    if (filters?.sortBy === 'rating') {
      restaurants.sort((a, b) => b.rating - a.rating);
    } else if (filters?.sortBy === 'delivery_time') {
      restaurants.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    }
    
    return {
      data: restaurants,
      success: true,
      pagination: {
        page: 1,
        limit: 20,
        total: restaurants.length,
        hasMore: false
      }
    };
  }

  async getRestaurant(id: string): Promise<ApiResponse<Restaurant>> {
    await delay(300);
    simulateError();
    
    const restaurant = seedData.restaurants.find(r => r.id === id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    
    return {
      data: restaurant,
      success: true
    };
  }

  async getMenu(restaurantId: string): Promise<ApiResponse<{ categories: any[]; items: MenuItem[] }>> {
    await delay(600);
    simulateError();
    
    const categories = seedData.menuCategories.filter(c => c.restaurantId === restaurantId);
    const items = seedData.menuItems.filter(i => i.restaurantId === restaurantId);
    
    return {
      data: { categories, items },
      success: true
    };
  }

  // Order APIs
  async createOrder(orderData: any): Promise<ApiResponse<Order>> {
    await delay(1000);
    simulateError();
    
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      customerId: this.currentUser?.id || '',
      restaurantId: orderData.restaurantId,
      restaurant: seedData.restaurants.find(r => r.id === orderData.restaurantId)!,
      status: 'pending',
      items: orderData.items,
      pricing: orderData.pricing,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'pending',
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000).toISOString(),
      notes: orderData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [{
        status: 'pending',
        timestamp: new Date().toISOString(),
        message: 'Order placed'
      }]
    };
    
    seedData.orders.push(newOrder);
    
    // Simulate order progression
    setTimeout(() => this.progressOrder(newOrder.id), 2000);
    
    return {
      data: newOrder,
      success: true,
      message: 'Order placed successfully'
    };
  }

  async getOrders(customerId?: string): Promise<ApiResponse<Order[]>> {
    await delay(400);
    simulateError();
    
    let orders = seedData.orders;
    if (customerId) {
      orders = orders.filter(o => o.customerId === customerId);
    }
    
    return {
      data: orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      success: true
    };
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    await delay(300);
    simulateError();
    
    const order = seedData.orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    
    return {
      data: order,
      success: true
    };
  }

  // Courier APIs
  async getCouriers(): Promise<ApiResponse<Courier[]>> {
    await delay(400);
    simulateError();
    
    return {
      data: seedData.couriers,
      success: true
    };
  }

  async getCourierJobs(courierId: string): Promise<ApiResponse<CourierJob[]>> {
    await delay(400);
    simulateError();
    
    const jobs = seedData.courierJobs.filter(j => j.courierId === courierId);
    
    return {
      data: jobs,
      success: true
    };
  }

  async acceptJob(jobId: string): Promise<ApiResponse<CourierJob>> {
    await delay(500);
    simulateError();
    
    const job = seedData.courierJobs.find(j => j.id === jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    
    job.status = 'accepted';
    job.timeline.accepted = new Date().toISOString();
    
    return {
      data: job,
      success: true,
      message: 'Job accepted'
    };
  }

  // Address APIs
  async getAddresses(userId: string): Promise<ApiResponse<Address[]>> {
    await delay(300);
    simulateError();
    
    const addresses = seedData.addresses.filter(a => a.userId === userId);
    
    return {
      data: addresses,
      success: true
    };
  }

  async createAddress(addressData: Omit<Address, 'id'>): Promise<ApiResponse<Address>> {
    await delay(500);
    simulateError();
    
    const newAddress: Address = {
      ...addressData,
      id: `addr_${Date.now()}`
    };
    
    seedData.addresses.push(newAddress);
    
    return {
      data: newAddress,
      success: true,
      message: 'Address added successfully'
    };
  }

  // Payment APIs
  async getPaymentMethods(userId: string): Promise<ApiResponse<PaymentMethod[]>> {
    await delay(300);
    simulateError();
    
    const methods = seedData.paymentMethods.filter(p => p.id.includes(userId));
    
    return {
      data: methods,
      success: true
    };
  }

  async processPayment(orderId: string, paymentMethodId: string): Promise<ApiResponse<{ success: boolean }>> {
    await delay(1500);
    
    // Simulate 10% payment failure
    if (Math.random() < 0.1) {
      throw new Error('Payment failed. Please try again.');
    }
    
    const order = seedData.orders.find(o => o.id === orderId);
    if (order) {
      order.paymentStatus = 'paid';
    }
    
    return {
      data: { success: true },
      success: true,
      message: 'Payment processed successfully'
    };
  }

  // Review APIs
  async createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<ApiResponse<Review>> {
    await delay(500);
    simulateError();
    
    const newReview: Review = {
      ...reviewData,
      id: `review_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    seedData.reviews.push(newReview);
    
    return {
      data: newReview,
      success: true,
      message: 'Review submitted successfully'
    };
  }

  // Promotion APIs
  async validatePromoCode(code: string, restaurantId: string): Promise<ApiResponse<Promotion>> {
    await delay(400);
    simulateError();
    
    const promo = seedData.promotions.find(p => 
      p.code.toLowerCase() === code.toLowerCase() && 
      p.isActive &&
      (p.applicableRestaurants.length === 0 || p.applicableRestaurants.includes(restaurantId))
    );
    
    if (!promo) {
      throw new Error('Invalid or expired promo code');
    }
    
    return {
      data: promo,
      success: true,
      message: 'Promo code applied successfully'
    };
  }

  // Helper method to simulate order progression
  private async progressOrder(orderId: string) {
    const order = seedData.orders.find(o => o.id === orderId);
    if (!order) return;

    const progressSteps = [
      { status: 'confirmed' as const, delay: 2000, message: 'Order confirmed by restaurant' },
      { status: 'preparing' as const, delay: 10000, message: 'Restaurant is preparing your order' },
      { status: 'ready' as const, delay: 15000, message: 'Order is ready for pickup' },
      { status: 'assigned' as const, delay: 5000, message: 'Courier assigned' },
      { status: 'picked_up' as const, delay: 8000, message: 'Courier picked up your order' },
      { status: 'delivered' as const, delay: 12000, message: 'Order delivered' }
    ];

    for (const step of progressSteps) {
      await delay(step.delay);
      order.status = step.status;
      order.timeline.push({
        status: step.status,
        timestamp: new Date().toISOString(),
        message: step.message
      });
      order.updatedAt = new Date().toISOString();
    }
  }
}

export const mockApi = new MockApi();