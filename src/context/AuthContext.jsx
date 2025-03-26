import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem("authorisedUser");
        if (user) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);
    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:3001/login", { username, password });
            if (response.status === 200) {
                sessionStorage.setItem("authorisedUser", JSON.stringify(response.data));
                sessionStorage.setItem("username", username);
                setIsAuthenticated(true);
                navigate("/games");
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const getUserInfo = () => {
        return JSON.parse(sessionStorage.getItem("authorisedUser"))
    };

    const logout = async () => {
        const username = sessionStorage.getItem("username");
        try {
            await axios.post("http://localhost:3001/logout", { username });
            setIsAuthenticated(false);
            sessionStorage.removeItem("authorisedUser");
            sessionStorage.removeItem("username");
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ login, getUserInfo, logout, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
