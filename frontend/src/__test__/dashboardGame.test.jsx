import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DashboardGame from '../Games/DashboardGame';
import { BrowserRouter } from 'react-router-dom';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Dashboard game popup test", () => {
  const mockGame = {
    name: "My first game",
    owner: "1",
    active: 0,
    thumbnail: "",
    questions: [
      {
        question: "Question 1?",
        duration: 10,
        type: "multiple_choice",
        points: 2,
        attachment: "https://youtu.be/Ui09cCfXAVo?si=mXXbB_eEpzxY0YyH",
        correctAnswers: [200, 201],
        answers: [{ answer: "Choice 1" }, { answer: "Choice 2" }],
      },
      {
        question: "Question 2?",
        duration: 10,
        type: "single_choice",
        points: 1,
        attachment: "https://youtu.be/_XeUEoDEc00?si=iG6jSnLokvcc7Kzz",
        correctAnswers: [203],
        answers: [{ answer: "Choice 3" }, { answer: "Choice 4" }],
      },
    ],
  };

  const mockSetGames = vi.fn();

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders game name, number of questions, and total duration', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    expect(screen.getByText(/My first game/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of questions: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Total duration: 20/)).toBeInTheDocument();
  });

  it('renders Start Game Session button enabled when no session is active', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    const startBtn = screen.getByRole('button', { name: /Start Game Session/i });
    expect(startBtn).toBeEnabled();
  });

  it('renders Modify and Stop Game Session buttons disabled when session is not active', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    expect(screen.getByRole('button', { name: /Modify Game Session/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Stop Game Session/i })).toBeDisabled();
  });

  it('renders Edit and Delete icons', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    expect(screen.getByLabelText(/Edit game/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Delete game/i)).toBeInTheDocument();
  });

  it('fires navigation when Edit icon is clicked', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    const editIcon = screen.getByLabelText(/Edit game/i);
    fireEvent.click(editIcon);
    expect(navigateMock).toHaveBeenCalled();
  });

  it('opens confirm delete modal when Delete icon is clicked', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    const deleteIcon = screen.getByLabelText(/Delete game/i);
    fireEvent.click(deleteIcon);
    expect(screen.getByText(/Are you sure you want to delete/i)).toBeInTheDocument();
  });
});