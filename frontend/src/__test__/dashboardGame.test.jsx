import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DashboardGame from '../Games/DashboardGame';
import { BrowserRouter } from 'react-router-dom';

describe("Dashboard game popup test", () => {
  const mockGame = {
    "gameId": 1,
    "name": "My first game",
    "owner": "1",
    "active": 0,
    "thumbnail": "",
    "questions": [
      {
        "questionId": 100,
        "question": "Question 1?",
        "duration": 10,
        "type": "multiple_choice",
        "points": 2,
        "attachment": "https://youtu.be/Ui09cCfXAVo?si=mXXbB_eEpzxY0YyH",
        "correctAnswers": [
          200, 201
        ],
        "answers": [
          {
          "answerId": 200,
          "answer": "Choice 1"
          },
          {
          "answerId": 201,
          "answer": "Choice 2"
          }
        ]
      },
      {
        "questionId": 101,
        "question": "Question 2?",
        "duration": 10,
        "type": "single_choice",
        "points": 1,
        "attachment": "https://youtu.be/_XeUEoDEc00?si=iG6jSnLokvcc7Kzz",
        "correctAnswers": [
          203
        ],
        "answers": [
          {
          "answerId": 203,
          "answer": "Choice 3"
          },
          {
          "answerId": 204,
          "answer": "Choice 4"
          }
        ]
      }
    ]
  }
  const mockSetGames = vi.fn();

  // Use a browser router to be able to mimick how the component works better.
  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders game name, question count, and duration', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);

    expect(screen.getByText(/Number of questions: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Total duration: 20/)).toBeInTheDocument();
  });

  it('renders the Start Game Session button enabled if session not active', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);

    const startBtn = screen.getByRole('button', { name: /Start Game Session/i });
    expect(startBtn).toBeEnabled();
  });

  it('renders Edit and Delete icons', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    
    expect(screen.getByRole('button', { name: /Modify Game Session/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Stop Game Session/i })).toBeInTheDocument();
  });

  it('calls navigation when Edit icon is clicked', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);

    const editIcon = screen.getByRole('button', { name: /Modify Game Session/i });
    fireEvent.click(editIcon);
  });

  it('can open confirm delete modal when Delete is clicked', () => {
    renderWithRouter(<DashboardGame game={mockGame} games={[mockGame]} setGames={mockSetGames} />);
    const deleteIcon = screen.getByRole('button', { name: /Stop Game Session/i });
    fireEvent.click(deleteIcon);
  });
});