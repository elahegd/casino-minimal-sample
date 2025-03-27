import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Category from './Category';

const categories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
];

describe('Category Component', () => {
  it('renders all categories', () => {
    render(
      <Category 
        categories={categories} 
        handleSelectedCategory={() => {}} 
        selectedCategory={null} 
      />
    );

    categories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('applies the correct classes when a category is selected', () => {
    render(
      <Category 
        categories={categories} 
        handleSelectedCategory={() => {}} 
        selectedCategory={1}
      />
    );

    const selectedCategory = screen.getByText('Category 1');
    const unselectedCategory = screen.getByText('Category 2');

    expect(selectedCategory).toHaveClass('bg-green-600');
    expect(unselectedCategory).toHaveClass('bg-gray-800');
  });

  it('calls handleSelectedCategory when a category is clicked', () => {
    const mockHandleSelectedCategory = jest.fn();

    render(
      <Category 
        categories={categories} 
        handleSelectedCategory={mockHandleSelectedCategory} 
        selectedCategory={null} 
      />
    );

    fireEvent.click(screen.getByText('Category 2'));

    expect(mockHandleSelectedCategory).toHaveBeenCalledWith(2);
  });
});

