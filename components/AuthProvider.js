import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false, 
  isAdmin: false,    
  login: () => {},   
  logout: () => {},  
});

export const AuthProvider = ({ children }) => {
  // O foco principal é o 'isLoggedIn' para mostrar a aba
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Se estiver logado, assume-se que é um administrador para este caso
  const isAdmin = isLoggedIn; 

  const login = () => {
    // Simulação de login bem-sucedido
    setIsLoggedIn(true);
    console.log("Usuário logado como Admin.");
  };

  const logout = () => {
    setIsLoggedIn(false);
    console.log("Usuário deslogado.");
  };

  const contextValue = {
    isLoggedIn,
    isAdmin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};