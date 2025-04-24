import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminStartGamePopup from '../Sessions/AdminStartGamePopup';

describe('AdminStartGamePopup', () => {
  const sessionId = '123456';

  it('renders the modal with correct session ID and copy link', () => {
    render(
      <AdminStartGamePopup
        sessionId={sessionId}
        showStartGameSession={true}
        handleCloseStartGameSession={() => {}}
      />
    );

    // Check thta the game session id, copy able link, and popup title are shown.
    expect(screen.getByText('New game session started!')).toBeInTheDocument();
    expect(screen.getByText(`Game SessionId: ${sessionId}`)).toBeInTheDocument();
    expect(screen.getByText(/\(Copy Link\)/i)).toBeInTheDocument();
  });

  it('calls the close handler when Close button is clicked', () => {
    const mockClose = vi.fn();

    render(
      <AdminStartGamePopup
        sessionId={sessionId}
        showStartGameSession={true}
        handleCloseStartGameSession={mockClose}
      />
    );

    // Close the start game popup.
    const closeButton = screen.getByTestId('close-start-game-popup');;
    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalled();
  });
});