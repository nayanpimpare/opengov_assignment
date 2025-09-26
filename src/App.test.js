import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mocks for components
jest.mock('./components/ConfigPage/ConfigPage', () => () => (
  <div data-testid="config-page">Mock Config Page</div>
));

jest.mock('./components/GraphPage/GraphPage', () => () => (
  <div data-testid="graph-page">Mock Graph Page</div>
));

describe('App Routing', () => {
  it('renders ConfigPage when path is /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('config-page')).toBeInTheDocument();
    expect(screen.queryByTestId('graph-page')).not.toBeInTheDocument();
  });

  it('renders GraphPage when path is /graph', () => {
    render(
      <MemoryRouter initialEntries={['/graph?bars=4']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('graph-page')).toBeInTheDocument();
    expect(screen.queryByTestId('config-page')).not.toBeInTheDocument();
  });

  it('renders nothing or fallback if path does not match', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    // Since there's no fallback route, neither page should render
    expect(screen.queryByTestId('config-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('graph-page')).not.toBeInTheDocument();
  });
});
