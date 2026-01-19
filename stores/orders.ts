import { defineStore } from 'pinia';
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as any[],
    loading: false
  }),

  actions: {
    // 1. FETCH USER ORDERS (For "My Orders" Page)
    async fetchUserOrders(userId: string) {
      const { $db } = useNuxtApp();
      const config = useRuntimeConfig();
      
      this.loading = true;
      try {
        if (config.public.dataSource === 'FIREBASE') {
          // Firebase Logic
          const q = query(
            collection($db, 'orders'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
          );
          const snap = await getDocs(q);
          this.orders = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          // Local API Logic (Mock)
          this.orders = []; // Return empty or mock array for API mode
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    // 2. FETCH ALL ORDERS (For Admin Panel)
    async fetchAllOrders() {
      const { $db } = useNuxtApp();
      const config = useRuntimeConfig();

      this.loading = true;
      try {
        if (config.public.dataSource === 'FIREBASE') {
          const q = query(collection($db, 'orders'), orderBy('createdAt', 'desc'));
          const snap = await getDocs(q);
          this.orders = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          this.orders = []; // Mock for API
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    // 3. CREATE ORDER (Used in Checkout)
    async createOrder(orderData: any) {
      const { $db } = useNuxtApp();
      // Always save to Firebase for now to ensure data integrity
      await addDoc(collection($db, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp()
      });
    },

    // 4. UPDATE STATUS (Used in Admin)
    async updateStatus(orderId: string, newStatus: string) {
      const { $db } = useNuxtApp();
      await updateDoc(doc($db, 'orders', orderId), { status: newStatus });
      // Update local state instantly
      const order = this.orders.find(o => o.id === orderId);
      if (order) order.status = newStatus;
    }
  }
});