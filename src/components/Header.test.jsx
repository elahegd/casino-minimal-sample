import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

const mockPlayer = {
  name: "John Doe",
  avatar: "path/to/avatar.jpg",
  event: "Last seen gambling on Starburst.",
};

const mockLogoutUser = jest.fn();

describe("Header Component", () => {
  it("renders player avatar and name", () => {
    render(
      <Router>
        <Header player={mockPlayer} logoutUser={mockLogoutUser} />
      </Router>
    );

    const avatar = screen.getByAltText(mockPlayer.name);
    const playerName = screen.getByText(mockPlayer.name);

    expect(avatar).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
  });

  it("toggles dropdown when clicking on player button", () => {
    render(
      <Router>
        <Header player={mockPlayer} logoutUser={mockLogoutUser} />
      </Router>
    );

    const playerButton = screen.getByRole("button");

    expect(screen.queryByText(mockPlayer.event)).not.toBeInTheDocument();

    fireEvent.click(playerButton);
    expect(screen.getByText(mockPlayer.event)).toBeInTheDocument();

    fireEvent.click(playerButton);
    expect(screen.queryByText(mockPlayer.event)).not.toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", () => {
    render(
      <Router>
        <Header player={mockPlayer} logoutUser={mockLogoutUser} />
      </Router>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(mockPlayer.event)).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText(mockPlayer.event)).not.toBeInTheDocument();
  });

  it("calls logout function when logout button is clicked", () => {
    render(
      <Router>
        <Header player={mockPlayer} logoutUser={mockLogoutUser} />
      </Router>
    );

    fireEvent.click(screen.getByRole("button"));
    const logoutButton = screen.getByText("Logout");

    fireEvent.click(logoutButton);
    expect(mockLogoutUser).toHaveBeenCalledTimes(1);
  });
});
