import { defineStore } from 'pinia';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    loading: true
  }),

  actions: {
    // Initialize: Listen for user changes
    initAuth() {
      const { $auth } = useNuxtApp();
      onAuthStateChanged($auth, (currentUser) => {
        this.user = currentUser;
        this.loading = false;
      });
    },

    async login(email: string, pass: string) {
      const { $auth } = useNuxtApp();
      await signInWithEmailAndPassword($auth, email, pass);
    },

    async register(email: string, pass: string, fullName: string) {
      const { $auth } = useNuxtApp();
      const userCredential = await createUserWithEmailAndPassword($auth, email, pass);
      // Set the display name immediately
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: fullName });
        this.user = { ...userCredential.user, displayName: fullName }; // Update local state
      }
    },

    async logout() {
      const { $auth } = useNuxtApp();
      await signOut($auth);
      this.user = null;
    }
  }
});