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
        const baseUrl = import.meta.env.BASE_URL || '/';
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        let imgPath = product.img || product.image || '';
        if (imgPath.startsWith('/')) {
          imgPath = imgPath.substring(1);
        }
        const fullImagePath = imgPath 
          ? `${cleanBase}assets/images/${imgPath}`.replace(/([^:]\/)\/+/g, "$1")
          : `${cleanBase}assets/images/placeholder.jpg`.replace(/([^:]\/)\/+/g, "$1");

        const standardizedProduct = {
          id: product.id,
          name: product.title || product.name || 'Product',
          price: Number(rawPrice || 0),
          image: fullImagePath 
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