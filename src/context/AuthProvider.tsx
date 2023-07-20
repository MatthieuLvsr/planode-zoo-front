import { ReactNode, useState } from "react";
import { AuthContext, AuthContextProps } from ".";

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState('');
  
    const updateToken = (newToken: string) => {
      setToken(newToken);
    };
  
    const authContextValue: AuthContextProps = {
      token,
      updateToken
    };
  
    return (
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    );
  };