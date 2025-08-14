import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, MenuItem, Restaurant } from '@/types';
import { mockApi } from '@/lib/mockApi';

interface CartState extends Cart {
  restaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (item: MenuItem, quantity: number, selectedModifiers: Record<string, string[]>, specialInstructions?: string) => void;
  updateItem: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  setRestaurant: (restaurant: Restaurant) => void;
  applyPromoCode: (code: string) => Promise<void>;
  removePromoCode: () => void;
  updateTips: (tips: number) => void;
  calculateTotals: () => void;
}

const initialCart: Cart = {
  items: [],
  restaurantId: undefined,
  subtotal: 0,
  deliveryFee: 0,
  serviceFee: 0,
  tips: 0,
  taxes: 0,
  total: 0,
  promoCode: undefined,
  promoDiscount: 0
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...initialCart,
      restaurant: null,
      isLoading: false,
      error: null,

      addItem: (item: MenuItem, quantity: number, selectedModifiers: Record<string, string[]>, specialInstructions?: string) => {
        const state = get();
        
        // If cart has items from different restaurant, clear it
        if (state.restaurantId && state.restaurantId !== item.restaurantId) {
          get().clearCart();
        }

        // Calculate item price with modifiers
        let itemPrice = item.price;
        Object.entries(selectedModifiers).forEach(([modifierGroupId, optionIds]) => {
          const modifierGroup = item.modifiers.find(m => m.id === modifierGroupId);
          if (modifierGroup) {
            optionIds.forEach(optionId => {
              const option = modifierGroup.options.find(o => o.id === optionId);
              if (option) {
                itemPrice += option.price;
              }
            });
          }
        });

        const cartItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random()}`,
          menuItem: item,
          quantity,
          selectedModifiers,
          specialInstructions,
          price: itemPrice * quantity
        };

        set({
          items: [...state.items, cartItem],
          restaurantId: item.restaurantId
        });

        get().calculateTotals();
      },

      updateItem: (itemId: string, quantity: number) => {
        const state = get();
        const updatedItems = state.items.map(item => {
          if (item.id === itemId) {
            const basePrice = item.price / item.quantity;
            return {
              ...item,
              quantity,
              price: basePrice * quantity
            };
          }
          return item;
        });

        set({ items: updatedItems });
        get().calculateTotals();
      },

      removeItem: (itemId: string) => {
        const state = get();
        const updatedItems = state.items.filter(item => item.id !== itemId);
        
        set({
          items: updatedItems,
          restaurantId: updatedItems.length === 0 ? undefined : state.restaurantId
        });

        get().calculateTotals();
      },

      clearCart: () => {
        set({
          ...initialCart,
          restaurant: null
        });
      },

      setRestaurant: (restaurant: Restaurant) => {
        set({ 
          restaurant,
          restaurantId: restaurant.id,
          deliveryFee: restaurant.deliveryFee
        });
        get().calculateTotals();
      },

      applyPromoCode: async (code: string) => {
        const state = get();
        if (!state.restaurantId) return;

        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.validatePromoCode(code, state.restaurantId);
          const promo = response.data;
          
          set({
            promoCode: code,
            isLoading: false
          });

          get().calculateTotals();
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Invalid promo code',
            isLoading: false
          });
          throw error;
        }
      },

      removePromoCode: () => {
        set({ 
          promoCode: undefined,
          promoDiscount: 0 
        });
        get().calculateTotals();
      },

      updateTips: (tips: number) => {
        set({ tips });
        get().calculateTotals();
      },

      calculateTotals: () => {
        const state = get();
        const subtotal = state.items.reduce((sum, item) => sum + item.price, 0);
        
        let deliveryFee = state.restaurant?.deliveryFee || 0;
        const serviceFee = Math.round(subtotal * 0.1); // 10% service fee
        const taxes = Math.round((subtotal + serviceFee) * 0.16); // 16% VAT
        
        let promoDiscount = 0;
        if (state.promoCode) {
          // Calculate promo discount based on type
          // This would normally come from the validated promo
          if (state.promoCode === 'WELCOME20') {
            promoDiscount = Math.min(subtotal * 0.2, 200);
          } else if (state.promoCode === 'FREEDELIVERY') {
            deliveryFee = 0;
          }
        }

        const total = subtotal + deliveryFee + serviceFee + taxes + state.tips - promoDiscount;

        set({
          subtotal,
          deliveryFee,
          serviceFee,
          taxes,
          promoDiscount,
          total: Math.max(0, total)
        });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        restaurantId: state.restaurantId,
        restaurant: state.restaurant,
        subtotal: state.subtotal,
        deliveryFee: state.deliveryFee,
        serviceFee: state.serviceFee,
        tips: state.tips,
        taxes: state.taxes,
        total: state.total,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount
      })
    }
  )
);