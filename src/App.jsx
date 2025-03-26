import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
