import { create } from "zustand";
import { persist } from "zustand/middleware";

type Data = {
  email: string;
  name: string;
  role: string;
};

type User = {
  data: Data;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user,  isAuthenticated: true }),
      logout: () => set({ user: null,  isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
