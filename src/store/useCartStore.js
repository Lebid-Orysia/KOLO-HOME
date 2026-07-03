import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      handleAddToCart: (product, quantity) => {
        let rawPrice = product.price;
        if (typeof rawPrice === 'string') {
          rawPrice = rawPrice.replace(/[^0-9]/g, '');
        }

        const standardizedProduct = {
          id: product.id,
          name: product.title || product.name || 'Product',
          price: Number(rawPrice || 0),
          image: product.img || product.image || '/src/assets/images/placeholder.jpg'
        };

        const addedQuantity = Number(quantity || 1);

        set((state) => {
          const existingItem = state.cart.find((item) => item.id === standardizedProduct.id);
          let newCart;

          if (existingItem) {
            newCart = state.cart.map((item) =>
              item.id === standardizedProduct.id
                ? { ...item, quantity: Number(item.quantity) + addedQuantity }
                : item
            );
          } else {
            newCart = [...state.cart, { ...standardizedProduct, quantity: addedQuantity }];
          }

          return {
            cart: newCart,
            isCartOpen: true
          };
        });
      },

      handleUpdateQuantity: (productId, newQuantity) => {
        const qty = Number(newQuantity);
        if (qty <= 0) {
          get().handleRemoveFromCart(productId);
          return;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: qty } : item
          ),
        }));
      },

      handleRemoveFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

   
      getTotalItems: () => {
        return get().cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce((sum, item) => {
          const price = Number(item.price || 0);
          const quantity = Number(item.quantity || 0);
          return sum + price * quantity;
        }, 0);
      },
    }),
    {
      name: 'kolo-home-cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export default useCartStore;