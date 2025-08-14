export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: 'customer' | 'merchant' | 'courier' | 'admin';
  avatar?: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  kycStatus?: 'pending' | 'approved' | 'rejected';
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  fullAddress: string;
  lat: number;
  lng: number;
  instructions?: string;
  isDefault: boolean;
}

export interface Restaurant {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  coverImage: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  cuisineType: string[];
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  lat: number;
  lng: number;
  isOpen: boolean;
  hours: Record<string, { open: string; close: string; closed?: boolean }>;
  prepTime: number;
  tags: string[];
  featured: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  modifiers: ModifierGroup[];
  tags: string[];
  calories?: number;
  allergens: string[];
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelection: number;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  restaurantId: string;
  sortOrder: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: Record<string, string[]>;
  specialInstructions?: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  restaurantId?: string;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tips: number;
  taxes: number;
  total: number;
  promoCode?: string;
  promoDiscount: number;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  restaurant: Restaurant;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'assigned' | 'picked_up' | 'delivered' | 'cancelled';
  items: CartItem[];
  pricing: {
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    tips: number;
    taxes: number;
    total: number;
    promoDiscount: number;
  };
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  courierId?: string;
  courier?: Courier;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
}

export interface OrderTimelineEvent {
  status: Order['status'];
  timestamp: string;
  message: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile_money' | 'wallet';
  provider: string;
  last4?: string;
  phoneNumber?: string;
  isDefault: boolean;
}

export interface Courier {
  id: string;
  userId: string;
  user: User;
  vehicleType: 'bicycle' | 'motorbike' | 'car';
  vehicleDetails: {
    make?: string;
    model?: string;
    plateNumber: string;
    color: string;
  };
  documents: {
    license: string;
    vehicleRegistration: string;
    insurance: string;
  };
  rating: number;
  reviewCount: number;
  totalDeliveries: number;
  isOnline: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
    timestamp: string;
  };
  earnings: {
    today: number;
    week: number;
    total: number;
  };
}

export interface CourierJob {
  id: string;
  orderId: string;
  order: Order;
  courierId: string;
  status: 'offered' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
  offerExpiry: string;
  earnings: number;
  distance: number;
  estimatedDuration: number;
  timeline: {
    offered?: string;
    accepted?: string;
    arrived_pickup?: string;
    picked_up?: string;
    arrived_dropoff?: string;
    delivered?: string;
  };
}

export interface Merchant {
  id: string;
  userId: string;
  user: User;
  businessName: string;
  businessType: string;
  documents: {
    businessLicense: string;
    taxCertificate: string;
    bankDetails: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  payoutMethod: 'bank' | 'mobile_money';
  payoutDetails: Record<string, string>;
}

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  targetType: 'restaurant' | 'courier';
  targetId: string;
  rating: number;
  comment?: string;
  photos: string[];
  createdAt: string;
}

export interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_delivery';
  value: number;
  minimumOrder: number;
  maxDiscount?: number;
  description: string;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  applicableRestaurants: string[];
  isActive: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface SearchFilters {
  query?: string;
  cuisine?: string[];
  rating?: number;
  deliveryTime?: number;
  priceRange?: [number, number];
  distance?: number;
  sortBy?: 'relevance' | 'rating' | 'delivery_time' | 'price';
}