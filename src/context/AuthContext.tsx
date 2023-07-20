import { ReactNode, createContext } from "react";

export interface AuthContextProps {
    token: string;
    updateToken: (newToken: string) => void;
  }
  
  export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  interface AuthProviderProps {
    children: ReactNode;
  }