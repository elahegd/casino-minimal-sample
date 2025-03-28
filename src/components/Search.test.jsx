import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

describe("Search Component", () => {
  it("renders the search input", () => {
    render(<Search handleSearch={jest.fn()} search="" />);

    const inputElement = screen.getByPlaceholderText("Search games...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls handleSearch when typing", () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} search="" />);

    const inputElement = screen.getByPlaceholderText("Search games...");
    fireEvent.change(inputElement, { target: { value: "test game" } });

    expect(mockHandleSearch).toHaveBeenCalledWith("test game");
  });

  it("shows the clear button when there is a text in search input", () => {
    render(<Search handleSearch={jest.fn()} search="test" />);

    const clearButton = screen.getByAltText("clear search");
    expect(clearButton).toBeInTheDocument();
  });

  it("calls handleSearch with an empty string when clicking the clear button", () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} search="test" />);

    const clearButton = screen.getByAltText("clear search");
    fireEvent.click(clearButton);

    expect(mockHandleSearch).toHaveBeenCalledWith("");
  });

  it("does not show clear button when search is empty", () => {
    render(<Search handleSearch={jest.fn()} search="" />);

    expect(screen.queryByAltText("clear search")).not.toBeInTheDocument();
    expect(screen.getByAltText("search icon")).toBeInTheDocument();
  });
});
