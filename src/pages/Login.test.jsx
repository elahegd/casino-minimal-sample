import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as AuthContext from "../context/AuthContext";
import Login from "./Login";

jest.mock("../context/AuthContext");

describe("Login Component", () => {
    it("should render login form", () => {
        AuthContext.useAuth.mockReturnValue({ login: jest.fn() });
        render(
            <Router>
                <Login />
            </Router>
        );

        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    it("should call login function on form submit", async () => {
        const mockLogin = jest.fn().mockResolvedValueOnce();
        
        AuthContext.useAuth.mockReturnValue({
            login: mockLogin
        });
    
        render(
            <Router>
                <Login />
            </Router>
        );
    
        fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "testpass" } });
        fireEvent.click(screen.getByRole("button", { name: /login/i }));
    
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("testuser", "testpass");
        });
    });

    it("should display an error message when login fails", async () => {
        const mockLogin = jest.fn().mockRejectedValueOnce(new Error("Invalid credentials"));
        AuthContext.useAuth.mockReturnValue({ login: mockLogin });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "wrongpass" } });
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByTestId("error-text")).toHaveTextContent("Invalid username or password");
        });
    });

    it("should clear input fields on failed login", async () => {
        const mockLogin = jest.fn().mockRejectedValueOnce(new Error("Invalid credentials"));
        AuthContext.useAuth.mockReturnValue({ login: mockLogin });

        render(
            <Router>
                <Login />
            </Router>
        );

        const usernameInput = screen.getByTestId("username");
        const passwordInput = screen.getByTestId("password");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(usernameInput).toHaveValue("");
            expect(passwordInput).toHaveValue("");
        });
    });

    it("should show loading state when logging in", async () => {
        const mockLogin = jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));
        AuthContext.useAuth.mockReturnValue({ login: mockLogin });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "testpass" } });
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        expect(screen.getByRole("button", { name: /logging in/i })).toBeInTheDocument();
    });

    it("should disable the login button while loading", async () => {
        const mockLogin = jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));
        AuthContext.useAuth.mockReturnValue({ login: mockLogin });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByTestId("username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: "testpass" } });
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        expect(screen.getByRole("button", { name: /logging in/i })).toBeDisabled();
    });
});
