import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ConfigPage from './ConfigPage';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<ConfigPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ConfigPage', () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  it('renders input and button correctly', () => {
    renderWithRouter();

    expect(screen.getByLabelText(/enter number of graph bars/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view graph/i })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    renderWithRouter();

    const input = screen.getByLabelText(/enter number of graph bars/i);
    fireEvent.change(input, { target: { value: '5' } });

    expect(input.value).toBe('5');
  });

  it('navigates to graph page when valid number is entered', () => {
    renderWithRouter();

    const input = screen.getByLabelText(/enter number of graph bars/i);
    const button = screen.getByRole('button', { name: /view graph/i });

    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/graph?bars=4');
  });

  it('shows error when input is empty or invalid', () => {
    renderWithRouter();

    const input = screen.getByLabelText(/enter number of graph bars/i);
    const button = screen.getByRole('button', { name: /view graph/i });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it('clears error on valid input after error', () => {
    renderWithRouter();

    const input = screen.getByLabelText(/enter number of graph bars/i);
    const button = screen.getByRole('button', { name: /view graph/i });

    // Trigger error first
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(input).toHaveAttribute('aria-invalid', 'true');

    // Enter valid value
    fireEvent.change(input, { target: { value: '3' } });
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
