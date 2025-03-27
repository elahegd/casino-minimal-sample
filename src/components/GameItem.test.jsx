import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameItem from './GameItem';
import { BrowserRouter } from 'react-router-dom';

const mockGame = {
  name: 'Super Fun Game',
  description: 'This is a test description for a really fun game that goes on and on to exceed the 100 character limit, so we can test the "Read More" button functionality properly.',
  icon: 'test-icon.png',
  code: 'super-fun'
};

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('GameItem Component', () => {
  test('renders game name and icon', () => {
    renderWithRouter(<GameItem game={mockGame} />);
    expect(screen.getByText(mockGame.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockGame.name)).toHaveAttribute('src', mockGame.icon);
  });

  test('shows truncated description and "Read More" button initially', () => {
    renderWithRouter(<GameItem game={mockGame} />);
    const button = screen.getByTestId(`collapse-btn-${mockGame.code}`);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Read More");
  });

  test('"Read More" expands and collapses description', () => {
    renderWithRouter(<GameItem game={mockGame} />);
    const button = screen.getByTestId(`collapse-btn-${mockGame.code}`);

    fireEvent.click(button);
    expect(button).toHaveTextContent("Show Less");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Read More");
  });

  test('renders Play link with correct href', () => {
    renderWithRouter(<GameItem game={mockGame} />);
    const link = screen.getByTestId(`play-btn-${mockGame.code}`);
    expect(link).toHaveAttribute('href', `/game/${mockGame.code}`);
  });
});
