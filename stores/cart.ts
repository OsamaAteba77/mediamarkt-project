 import { defineStore } from 'pinia';
import type { IProduct } from '~/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as IProduct[],
  }),

  getters: {
    count: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0),
  },

  actions: {
    addToCart(product: IProduct) {
      this.items.push(product);
      this.saveToLocalStorage();
    },

    removeFromCart(productId: string) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    },

    // Call this when app starts
    initializeStore() {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cart');
        if (saved) {
          try {
            this.items = JSON.parse(saved);
          } catch (e) {
            console.error('Cart load error', e);
          }
        }
      }
    }
  },
});