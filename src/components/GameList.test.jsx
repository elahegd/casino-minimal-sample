import React from "react";
import { render, screen } from "@testing-library/react";
import GameList from "./GameList";
import { BrowserRouter as Router } from "react-router-dom";

const mockGames = [
  {
    code: "game1",
    name: "Game One",
    description: "This is a description for Game One.",
    icon: "path/to/icon1.png",
  },
  {
    code: "game2",
    name: "Game Two",
    description: "This is a description for Game Two.",
    icon: "path/to/icon2.png",
  },
];

describe("GameList Component", () => {
  test("renders the title correctly", () => {
    render(
      <Router>
        <GameList games={mockGames} />
      </Router>
    );

    const title = screen.getByText("Games");
    expect(title).toBeInTheDocument();
  });

  test("renders correct number of GameItem components when games are provided", () => {
    render(
      <Router>
        <GameList games={mockGames} />
      </Router>
    );

    const game1 = screen.getByTestId("game-title-game1");
    const game2 = screen.getByTestId("game-title-game2");

    expect(game1).toBeInTheDocument();
    expect(game2).toBeInTheDocument();
  });

  test("shows the 'not found' message when game list is empty", () => {
    render(
      <Router>
        <GameList games={[]} />
      </Router>
    );

    const noGamesMessage = screen.getByText("There is no game with your keyword!");
    expect(noGamesMessage).toBeInTheDocument();
  });
});
