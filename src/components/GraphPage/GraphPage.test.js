import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GraphPage from './GraphPage';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const renderWithRouter = (bars = 4) => {
  return render(
    <MemoryRouter initialEntries={[`/graph?bars=${bars}`]}>
      <Routes>
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('GraphPage Component', () => {
  it('renders correct number of bars and buttons', () => {
    renderWithRouter(4);

    const bars = screen.getAllByRole('presentation');
    const buttons = screen.getAllByRole('button', { name: /bar \d/i });

    // Ensure 4 bars and 4 buttons exist
    expect(bars).toHaveLength(4);
    expect(buttons).toHaveLength(4);
  });

  it('highlights the correct bar on button click', () => {
    renderWithRouter(3);

    const buttons = screen.getAllByRole('button', { name: /bar \d/i });

    // Click Bar 2
    fireEvent.click(buttons[1]);

    const bars = screen.getAllByRole('presentation');

    // Check if Bar 2 has orange background
    expect(bars[1]).toHaveStyle('background-color: orange');

    // Check other bars are not highlighted
    expect(bars[0]).not.toHaveStyle('background-color: orange');
    expect(bars[2]).not.toHaveStyle('background-color: orange');
  });

  it('navigates to config page on back button click', () => {
    renderWithRouter(2);

    const backButton = screen.getByRole('button', { name: '' }); // Back button has no accessible name due to icon

    fireEvent.click(backButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});
