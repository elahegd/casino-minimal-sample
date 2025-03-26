import React, { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", { username, password });
      if (response.status === 200) {
        sessionStorage.setItem("authorisedUser", JSON.stringify(response.data));
      }
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
