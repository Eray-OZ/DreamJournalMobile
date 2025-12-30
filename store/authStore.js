import { onAuthStateChanged } from 'firebase/auth';
import { create } from 'zustand';
import * as authService from '../services/auth.service';
import { auth } from '../services/firebase';

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  // Initialize auth listener
  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, isLoading: false });
    });
    return unsubscribe;
  },

  // Sign up with email/password
  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    const { user, error } = await authService.signUp(email, password);
    set({ user, isLoading: false, error });
    return { user, error };
  },

  // Sign in with email/password
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { user, error } = await authService.signIn(email, password);
    set({ user, isLoading: false, error });
    return { user, error };
  },

  // Sign in with Google
  signInWithGoogle: async (idToken) => {
    set({ isLoading: true, error: null });
    const { user, error } = await authService.signInWithGoogle(idToken);
    set({ user, isLoading: false, error });
    return { user, error };
  },

  // Sign out
  signOut: async () => {
    set({ isLoading: true, error: null });
    const { error } = await authService.logOut();
    if (!error) {
      set({ user: null });
    }
    set({ isLoading: false, error });
    return { error };
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
