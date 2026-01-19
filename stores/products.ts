import { defineStore } from 'pinia';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export const useProductsStore = defineStore('products', {
  state: () => ({
    items: [] as any[], // Holds the list of products
    loading: false
  }),

  actions: {
    // 1. FETCH PRODUCTS (The Switch Logic)
    async fetchProducts() {
      const { $db } = useNuxtApp();
      const config = useRuntimeConfig(); // Access the variable from nuxt.config
      
      this.loading = true;

      try {
        if (config.public.dataSource === 'FIREBASE') {
          console.log('Fetching from FIREBASE...');
          // Firebase Logic
          const querySnapshot = await getDocs(collection($db, 'products'));
          this.items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        } else {
          console.log('Fetching from LOCAL API...');
          // Local API Logic
          const data = await $fetch('/api/products');
          this.items = data as any[];
        }
      } catch (error) {
        console.error('Store Error:', error);
      } finally {
        this.loading = false;
      }
    },

    // 2. ADD PRODUCT (Firebase only for now, or you can add API logic too)
    async addProduct(productData: any) {
      const { $db } = useNuxtApp();
      // We assume writes always go to Firebase for this demo, 
      // or you can add a similar if/else check.
      await addDoc(collection($db, 'products'), {
        ...productData,
        createdAt: serverTimestamp()
      });
      await this.fetchProducts(); // Refresh list
    },

    // 3. DELETE PRODUCT
    async deleteProduct(id: string) {
      const { $db } = useNuxtApp();
      await deleteDoc(doc($db, 'products', id));
      this.items = this.items.filter(item => item.id !== id);
    }
  }
});