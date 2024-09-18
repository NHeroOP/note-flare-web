import { account, OAuthProvider } from "@/models/client/config";
import { AppwriteException, ID, Models } from "appwrite"
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IAuthStore {
  session: Models.Session | null;
  user: Models.User<{}> | null;
  jwt: string | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(email: string, password: string): Promise<{
    sucess: boolean; error?: AppwriteException | undefined | null
  }>;
  loginWithGoogle(): Promise<{
    sucess: boolean; error?: {} | undefined | null
  }>;
  createAccount(name: string, email: string, password: string): Promise<{
    sucess: boolean; error?: AppwriteException | undefined | null
  }>;
  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,
      
      setHydrated() {
        set({hydrated: true})
      },

      async verifySession() {
        try {
          const session = await account.getSession("current")
          set({ session })
          
        }
        catch (error) {
          console.log(error);
          
        }
      },

      async login(email: string, password: string) { 
        try {
          const session = await account.createEmailPasswordSession(email, password)
          
          const [user, { jwt }] = await Promise.all([
            account.get(),
            account.createJWT(),

          ])

          set({ session, user, jwt })
          
          return { sucess: true }
          
        }
        catch (error) {
          console.log(error);
          
          return { sucess: false, error: error instanceof AppwriteException ? error : null }
          
        }
      },
      async loginWithGoogle() { 
        try {
          await account.createOAuth2Session(
            OAuthProvider.Google,
            "http://localhost:3000/home",
            "http://localhost:3000/login",
          )
          
          const [user, { jwt }, session] = await Promise.all([
            account.get(),
            account.createJWT(),
            account.getSession("current")

          ])

          console.log(user, jwt, session);
          

          set({ session, user, jwt })
          
          return { sucess: true }

          
        }
        catch (error) {
          console.log(error);
          
          return { sucess: false, error: error }
          
        }
      },
      async createAccount(name: string, email: string, password: string) { 
        try {
          await account.create(ID.unique(), email, password, name)
          
          return { sucess: true }
          
        } catch (error) {
          console.log(error);
          
          return { sucess: false, error: error instanceof AppwriteException ? error : null }

        }
      },
      async logout() {
        try {
          await account.deleteSession("current")
          set({ session: null, user: null, jwt: null })
        }
        catch (error) {
          console.log(error);
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