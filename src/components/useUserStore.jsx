import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null, // initially no user data
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null })
    }),
    {
      name: 'user-storage', // name of item in localStorage
      getStorage: () => localStorage, // define storage medium
    }
  )
);

export default useUserStore;
