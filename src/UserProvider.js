import React, { createContext, useState, useContext } from "react";

// Vytvoření kontextu
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(true); 

  const toggleAuthorization = () => {
    setIsAuthorized(prevState => !prevState);
  };

  return (
    <UserContext.Provider value={{ isAuthorized, toggleAuthorization }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pro použití kontextu
export const useUser = () => useContext(UserContext);
