import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";
import Login from "./pages/Login";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/games"
              element={
                <PrivateRoute>
                  <Games />
                </PrivateRoute>
              }
            />
            <Route
              path="/game/:gameCode"
              element={
                <PrivateRoute>
                  <GameDetail />
                </PrivateRoute>
              }
            />
          </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
