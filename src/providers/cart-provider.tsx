import { create } from "zustand";

// Define the MenuItem type
type MenuItem = {
  category: string;
  description: string;
  name: string;
  price: string;
  restaurantId: string;
  _id: string;
};

// Define the CartStore type
type CartStore = {
  cart: Map<string, { item: MenuItem; quantity: number }>;
  addItem: (item: MenuItem, count: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  calculateTotalPrice: () => number;
};

// Create the cart store
const useCartStore = create<CartStore>((set, get) => ({
  cart: new Map(),

  addItem: (item, count) =>
    set((state) => {
      const newCart = new Map(state.cart);
      const existingItem = newCart.get(item._id);

      if (existingItem) {
        existingItem.quantity += count;
      } else {
        newCart.set(item._id, { item, quantity: count });
      }

      return { cart: newCart };
    }),

  removeItem: (itemId) =>
    set((state) => {
      const newCart = new Map(state.cart);

      if (newCart.has(itemId)) {
        const currentItem = newCart.get(itemId);
        if (currentItem && currentItem.quantity > 1) {
          currentItem.quantity -= 1;
        } else {
          newCart.delete(itemId);
        }
      }

      return { cart: newCart };
    }),

  clearCart: () => set({ cart: new Map() }),

  calculateTotalPrice: () => {
    const { cart } = get();
    let total = 0;
    cart.forEach(({ item, quantity }: { item: MenuItem; quantity: number }) => {
      total += parseFloat(item.price) * quantity;
    });
    return total;
  },
}));

export default useCartStore;
