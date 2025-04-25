import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PastSessionResultPopup from '../Sessions/PastSessionResultPopup';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('PastSessionResultPopup', () => {
  const handleClosePopupMock = vi.fn();
  const mockGame = {
    oldSessions: ['session1', 'session2', 'session3']
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal when showPopup is true and displays sessions', () => {
    renderWithRouter(
      <PastSessionResultPopup
        game={mockGame}
        showPopup={true}
        handleClosePopup={handleClosePopupMock}
      />
    );

    // Modal title
    expect(screen.getByText(/past sessions/i)).toBeInTheDocument();

    // Each session ID should be rendered
    mockGame.oldSessions.forEach(id => {
      expect(screen.getByText(id)).toBeInTheDocument();
    });
  });

  it('calls navigate when a session ID is clicked', () => {
    renderWithRouter(
      <PastSessionResultPopup
        game={mockGame}
        showPopup={true}
        handleClosePopup={handleClosePopupMock}
      />
    );

    const sessionLink = screen.getByText('session2');
    fireEvent.click(sessionLink);

    expect(navigateMock).toHaveBeenCalledWith('/session/session2/result');
  });

  it('calls handleClosePopup when the close button is clicked', () => {
    renderWithRouter(
      <PastSessionResultPopup
        game={mockGame}
        showPopup={true}
        handleClosePopup={handleClosePopupMock}
      />
    );

    const closeButton = screen.getByLabelText(/Close/i);
    fireEvent.click(closeButton);

    expect(handleClosePopupMock).toHaveBeenCalled();
  });

  it('does not render the modal when showPopup is false', () => {
    renderWithRouter(
      <PastSessionResultPopup
        game={mockGame}
        showPopup={false}
        handleClosePopup={handleClosePopupMock}
      />
    );

    // Modal title shouldn't be found
    expect(screen.queryByText(/past sessions/i)).not.toBeInTheDocument();
  });
});