import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import Games from "./Games";
import { fireEvent } from "@testing-library/react";

jest.mock("axios");

jest.mock("../context/AuthContext", () => ({
    useAuth: () => ({
        getUserInfo: jest.fn().mockReturnValue({ player: "Test Player" }),
        logout: jest.fn(),
    }),
}));

const queryClient = new QueryClient();

describe("Games Component", () => {
    beforeEach(() => {
        const mockGames = [
            { id: 1, name: "Game 1", description: "Description 1", categoryIds: [1], code: "game1" },
            { id: 2, name: "Game 2", description: "Description 2", categoryIds: [2], code: "game2" },
        ];
        const mockCategories = [
            { id: 1, name: "Category 1" },
            { id: 2, name: "Category 2" },
        ];

        axios.get.mockResolvedValueOnce({ data: mockGames });
        axios.get.mockResolvedValueOnce({ data: mockCategories });
    });

    it("should render loading state initially", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Games />
                </Router>
            </QueryClientProvider>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render games and categories", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Games />
                </Router>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.getByTestId("game-title-game2")).toBeInTheDocument();
            expect(screen.getByText("Category 1")).toBeInTheDocument();
            expect(screen.getByText("Category 2")).toBeInTheDocument();
        });
    });

    it("should filter games based on search input", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Games />
                </Router>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.getByTestId("game-title-game2")).toBeInTheDocument();
        });

        const searchInput = screen.getByRole("textbox");
        fireEvent.change(searchInput, { target: { value: "Game 1" } });

        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.queryByTestId("game-title-game2")).not.toBeInTheDocument();
        });
    });

    it("should filter games based on selected category", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Games />
                </Router>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.getByTestId("game-title-game2")).toBeInTheDocument();
        });
        const categoryElement = screen.getByTestId("category-Category 1");
        fireEvent.click(categoryElement);
        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.queryByTestId("game-title-game2")).not.toBeInTheDocument();
        });
    });

    it("should filter games based on search input and selected category", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Games />
                </Router>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.getByTestId("game-title-game2")).toBeInTheDocument();
        });

        const searchInput = screen.getByRole("textbox");
        fireEvent.change(searchInput, { target: { value: "Game 1" } });

        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.queryByTestId("game-title-game2")).not.toBeInTheDocument();
        });

        const categoryElement = screen.getByTestId("category-Category 1");
        fireEvent.click(categoryElement);

        await waitFor(() => {
            expect(screen.getByTestId("game-title-game1")).toBeInTheDocument();
            expect(screen.queryByTestId("game-title-game2")).not.toBeInTheDocument();
        });
    });

});