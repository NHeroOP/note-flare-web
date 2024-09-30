import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IAuthStore {
  isAuthenticated: boolean;
  hydrated: boolean;

  setHydrated(): void;
  setAuthenticated(isAuthenticated: boolean): void;
  verifySession(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      isAuthenticated: false,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      setAuthenticated(isAuthenticated) { 
        set({ isAuthenticated });
      },

      async verifySession() {
        try {
          const hasSession = (await axios.get("/api/session/verify-session")).data;
          
          if (hasSession) {
            set({ isAuthenticated: true })
          } else {
            set({ isAuthenticated: false })
          }
        } catch (err) {
          console.log(err);
          set({ isAuthenticated: false })
        }
      },
    
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        }
      }
    }
  )
)