import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "staff" | null;

interface AuthContextType {
  role: Role;
  userName: string;
  login: (role: Role, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  userName: "",
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [userName, setUserName] = useState("");

  const login = (r: Role, name: string) => {
    setRole(r);
    setUserName(name);
  };

  const logout = () => {
    setRole(null);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ role, userName, login, logout, isAuthenticated: !!role }}>
      {children}
    </AuthContext.Provider>
  );
};
