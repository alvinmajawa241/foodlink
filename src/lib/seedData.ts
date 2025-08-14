import { 
  User, Restaurant, MenuItem, Order, Courier, CourierJob, 
  Address, PaymentMethod, Review, Promotion, MenuCategory 
} from '@/types';

export const seedData = {
  users: [
    {
      id: 'user_1',
      email: 'john.customer@example.com',
      phone: '+254701234567',
      name: 'John Doe',
      role: 'customer' as const,
      status: 'active' as const,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'user_2',
      email: 'sarah.merchant@example.com',
      phone: '+254702345678',
      name: 'Sarah Wilson',
      role: 'merchant' as const,
      status: 'active' as const,
      createdAt: '2024-01-10T08:00:00Z'
    },
    {
      id: 'user_3',
      email: 'mike.courier@example.com',
      phone: '+254703456789',
      name: 'Mike Johnson',
      role: 'courier' as const,
      status: 'active' as const,
      createdAt: '2024-01-12T09:00:00Z',
      kycStatus: 'approved' as const
    },
    {
      id: 'user_4',
      email: 'admin@swiftbite.com',
      phone: '+254704567890',
      name: 'Admin User',
      role: 'admin' as const,
      status: 'active' as const,
      createdAt: '2024-01-01T00:00:00Z'
    }
  ] as User[],

  restaurants: [
    {
      id: 'rest_1',
      merchantId: 'user_2',
      name: 'Bella Italia',
      description: 'Authentic Italian cuisine with fresh ingredients',
      coverImage: '/src/assets/restaurant-italian.jpg',
      rating: 4.6,
      reviewCount: 1243,
      cuisineType: ['Italian', 'Pizza', 'Pasta'],
      deliveryTime: '25-35 min',
      deliveryFee: 250,
      minimumOrder: 800,
      lat: -1.2921,
      lng: 36.8219,
      isOpen: true,
      hours: {
        monday: { open: '11:00', close: '23:00' },
        tuesday: { open: '11:00', close: '23:00' },
        wednesday: { open: '11:00', close: '23:00' },
        thursday: { open: '11:00', close: '23:00' },
        friday: { open: '11:00', close: '24:00' },
        saturday: { open: '11:00', close: '24:00' },
        sunday: { open: '12:00', close: '22:00' }
      },
      prepTime: 20,
      tags: ['Popular', 'Fast Delivery'],
      featured: true
    },
    {
      id: 'rest_2',
      merchantId: 'user_2',
      name: 'Tokyo Fusion',
      description: 'Modern Japanese cuisine with fusion elements',
      coverImage: '/src/assets/restaurant-asian.jpg',
      rating: 4.8,
      reviewCount: 892,
      cuisineType: ['Japanese', 'Sushi', 'Asian'],
      deliveryTime: '30-40 min',
      deliveryFee: 300,
      minimumOrder: 1000,
      lat: -1.2864,
      lng: 36.8172,
      isOpen: true,
      hours: {
        monday: { open: '12:00', close: '22:00' },
        tuesday: { open: '12:00', close: '22:00' },
        wednesday: { open: '12:00', close: '22:00' },
        thursday: { open: '12:00', close: '22:00' },
        friday: { open: '12:00', close: '23:00' },
        saturday: { open: '12:00', close: '23:00' },
        sunday: { open: '12:00', close: '21:00' }
      },
      prepTime: 25,
      tags: ['Premium', 'Healthy'],
      featured: true
    },
    {
      id: 'rest_3',
      merchantId: 'user_2',
      name: 'Green Bowl',
      description: 'Fresh, healthy bowls and salads',
      coverImage: '/src/assets/restaurant-healthy.jpg',
      rating: 4.4,
      reviewCount: 567,
      cuisineType: ['Healthy', 'Vegetarian', 'Bowls'],
      deliveryTime: '20-30 min',
      deliveryFee: 200,
      minimumOrder: 600,
      lat: -1.2833,
      lng: 36.8167,
      isOpen: true,
      hours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '19:00' },
        sunday: { open: '09:00', close: '18:00' }
      },
      prepTime: 15,
      tags: ['Healthy', 'Vegetarian', 'Quick'],
      featured: false
    }
  ] as Restaurant[],

  menuCategories: [
    { id: 'cat_1', name: 'Appetizers', restaurantId: 'rest_1', sortOrder: 1 },
    { id: 'cat_2', name: 'Pizza', restaurantId: 'rest_1', sortOrder: 2 },
    { id: 'cat_3', name: 'Pasta', restaurantId: 'rest_1', sortOrder: 3 },
    { id: 'cat_4', name: 'Desserts', restaurantId: 'rest_1', sortOrder: 4 },
    { id: 'cat_5', name: 'Appetizers', restaurantId: 'rest_2', sortOrder: 1 },
    { id: 'cat_6', name: 'Sushi Rolls', restaurantId: 'rest_2', sortOrder: 2 },
    { id: 'cat_7', name: 'Ramen', restaurantId: 'rest_2', sortOrder: 3 },
    { id: 'cat_8', name: 'Signature Bowls', restaurantId: 'rest_3', sortOrder: 1 },
    { id: 'cat_9', name: 'Salads', restaurantId: 'rest_3', sortOrder: 2 }
  ] as MenuCategory[],

  menuItems: [
    {
      id: 'item_1',
      restaurantId: 'rest_1',
      categoryId: 'cat_2',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomatoes, and basil',
      price: 1200,
      isAvailable: true,
      modifiers: [
        {
          id: 'mod_1',
          name: 'Size',
          required: true,
          maxSelection: 1,
          options: [
            { id: 'opt_1', name: 'Small (9")', price: 0, isDefault: true },
            { id: 'opt_2', name: 'Medium (12")', price: 300 },
            { id: 'opt_3', name: 'Large (15")', price: 600 }
          ]
        },
        {
          id: 'mod_2',
          name: 'Extra Toppings',
          required: false,
          maxSelection: 3,
          options: [
            { id: 'opt_4', name: 'Extra Cheese', price: 150 },
            { id: 'opt_5', name: 'Pepperoni', price: 200 },
            { id: 'opt_6', name: 'Mushrooms', price: 100 }
          ]
        }
      ],
      tags: ['Popular', 'Vegetarian'],
      calories: 280,
      allergens: ['Gluten', 'Dairy']
    },
    {
      id: 'item_2',
      restaurantId: 'rest_1',
      categoryId: 'cat_3',
      name: 'Spaghetti Carbonara',
      description: 'Traditional Roman pasta with eggs, cheese, and pancetta',
      price: 950,
      isAvailable: true,
      modifiers: [
        {
          id: 'mod_3',
          name: 'Pasta Type',
          required: true,
          maxSelection: 1,
          options: [
            { id: 'opt_7', name: 'Spaghetti', price: 0, isDefault: true },
            { id: 'opt_8', name: 'Fettuccine', price: 0 },
            { id: 'opt_9', name: 'Penne', price: 0 }
          ]
        }
      ],
      tags: ['Chef Special'],
      calories: 420,
      allergens: ['Gluten', 'Dairy', 'Eggs']
    },
    {
      id: 'item_3',
      restaurantId: 'rest_2',
      categoryId: 'cat_6',
      name: 'Dragon Roll',
      description: 'Eel and cucumber topped with avocado and eel sauce',
      price: 1400,
      isAvailable: true,
      modifiers: [],
      tags: ['Signature', 'Premium'],
      calories: 350,
      allergens: ['Fish', 'Soy']
    },
    {
      id: 'item_4',
      restaurantId: 'rest_3',
      categoryId: 'cat_8',
      name: 'Buddha Bowl',
      description: 'Quinoa, roasted vegetables, avocado, and tahini dressing',
      price: 850,
      isAvailable: true,
      modifiers: [
        {
          id: 'mod_4',
          name: 'Protein',
          required: false,
          maxSelection: 1,
          options: [
            { id: 'opt_10', name: 'Grilled Chicken', price: 200 },
            { id: 'opt_11', name: 'Tofu', price: 150 },
            { id: 'opt_12', name: 'Salmon', price: 300 }
          ]
        }
      ],
      tags: ['Vegan', 'Gluten-Free', 'Healthy'],
      calories: 380,
      allergens: ['Nuts', 'Sesame']
    }
  ] as MenuItem[],

  orders: [
    {
      id: 'order_1',
      customerId: 'user_1',
      restaurantId: 'rest_1',
      restaurant: {} as Restaurant, // Will be populated by API
      status: 'delivered' as const,
      items: [],
      pricing: {
        subtotal: 1200,
        deliveryFee: 250,
        serviceFee: 120,
        tips: 200,
        taxes: 144,
        total: 1914,
        promoDiscount: 0
      },
      deliveryAddress: {} as any,
      paymentMethod: {} as any,
      paymentStatus: 'paid' as const,
      estimatedDeliveryTime: '2024-01-20T13:30:00Z',
      actualDeliveryTime: '2024-01-20T13:25:00Z',
      createdAt: '2024-01-20T12:15:00Z',
      updatedAt: '2024-01-20T13:25:00Z',
      timeline: []
    }
  ] as Order[],

  couriers: [
    {
      id: 'courier_1',
      userId: 'user_3',
      user: {} as User,
      vehicleType: 'motorbike' as const,
      vehicleDetails: {
        make: 'Honda',
        model: 'CB 150R',
        plateNumber: 'KCA 123X',
        color: 'Red'
      },
      documents: {
        license: 'license_123.jpg',
        vehicleRegistration: 'registration_123.jpg',
        insurance: 'insurance_123.jpg'
      },
      rating: 4.7,
      reviewCount: 234,
      totalDeliveries: 1156,
      isOnline: true,
      currentLocation: {
        lat: -1.2921,
        lng: 36.8219,
        timestamp: new Date().toISOString()
      },
      earnings: {
        today: 2850,
        week: 12400,
        total: 185600
      }
    }
  ] as Courier[],

  courierJobs: [] as CourierJob[],

  addresses: [
    {
      id: 'addr_1',
      userId: 'user_1',
      label: 'Home',
      fullAddress: '123 Kimathi Street, Nairobi CBD, Kenya',
      lat: -1.2864,
      lng: 36.8172,
      instructions: 'Blue gate, apartment 4B',
      isDefault: true
    },
    {
      id: 'addr_2',
      userId: 'user_1',
      label: 'Office',
      fullAddress: '456 Kenyatta Avenue, Nairobi, Kenya',
      lat: -1.2833,
      lng: 36.8167,
      instructions: 'Reception will receive',
      isDefault: false
    }
  ] as Address[],

  paymentMethods: [
    {
      id: 'pm_user_1_1',
      type: 'card' as const,
      provider: 'Visa',
      last4: '4242',
      isDefault: true
    },
    {
      id: 'pm_user_1_2',
      type: 'mobile_money' as const,
      provider: 'M-Pesa',
      phoneNumber: '+254701234567',
      isDefault: false
    }
  ] as PaymentMethod[],

  reviews: [
    {
      id: 'review_1',
      orderId: 'order_1',
      customerId: 'user_1',
      targetType: 'restaurant' as const,
      targetId: 'rest_1',
      rating: 5,
      comment: 'Amazing pizza! Fresh ingredients and perfect crust.',
      photos: [],
      createdAt: '2024-01-20T14:00:00Z'
    }
  ] as Review[],

  promotions: [
    {
      id: 'promo_1',
      code: 'WELCOME20',
      type: 'percentage' as const,
      value: 20,
      minimumOrder: 500,
      maxDiscount: 200,
      description: '20% off your first order',
      validFrom: '2024-01-01T00:00:00Z',
      validTo: '2024-12-31T23:59:59Z',
      usageLimit: 1000,
      usedCount: 156,
      applicableRestaurants: [],
      isActive: true
    },
    {
      id: 'promo_2',
      code: 'FREEDELIVERY',
      type: 'free_delivery' as const,
      value: 0,
      minimumOrder: 800,
      description: 'Free delivery on orders above KES 800',
      validFrom: '2024-01-01T00:00:00Z',
      validTo: '2024-12-31T23:59:59Z',
      usageLimit: 10000,
      usedCount: 2341,
      applicableRestaurants: [],
      isActive: true
    }
  ] as Promotion[]
};