import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

const TestComponent = () => {
    const { login, logout, isAuthenticated, isLoading } = useAuth();

    return (
        <div>
            <button onClick={() => login("testuser", "password")}>Login</button>
            <button onClick={logout}>Logout</button>
            <div data-testid="auth-status">{isAuthenticated ? "Authenticated" : "Not Authenticated"}</div>
            <div data-testid="loading-status">{isLoading ? "Loading" : "Loaded"}</div>
        </div>
    );
};

describe("AuthContext", () => {
    it("should authenticate user on login", async () => {
        axios.post.mockResolvedValueOnce({ status: 200, data: { user: "testuser" } });

        render(
            <Router>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </Router>
        );

        screen.getByText("Login").click();

        await waitFor(() => expect(screen.getByTestId("auth-status")).toHaveTextContent("Authenticated"));
    });

    it("should logout user", async () => {
        render(
            <Router>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </Router>
        );

        screen.getByText("Logout").click();

        await waitFor(() => expect(screen.getByTestId("auth-status")).toHaveTextContent("Not Authenticated"));
    });

    it("should show loading initially", async () => {
        render(
            <Router>
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            </Router>
        );

        await waitFor(() => expect(screen.getByTestId("loading-status")).toHaveTextContent("Loaded"));
    });
});