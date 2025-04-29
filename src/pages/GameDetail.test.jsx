import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GameDetail from "./GameDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ gameCode: "test-game" }),
  useNavigate: jest.fn(),
}));

describe("GameDetail Component", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);
    window.comeon = { game: { launch: jest.fn() } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the GameDetail component correctly", () => {
    render(
      <MemoryRouter>
        <GameDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("Back to Games")).toBeInTheDocument();
    expect(screen.getByTestId("back-to-games-btn")).toBeInTheDocument();
  });

  it("calls launch game API with gameCode", () => {
    render(
      <MemoryRouter>
        <GameDetail />
      </MemoryRouter>
    );

    expect(window.comeon.game.launch).toHaveBeenCalledWith("test-game");
  });

  it("calls navigate when clicking 'Back to Games'", () => {
    render(
      <MemoryRouter>
        <GameDetail />
      </MemoryRouter>
    );

    const backButton = screen.getByTestId("back-to-games-btn");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/games");
  });
});
