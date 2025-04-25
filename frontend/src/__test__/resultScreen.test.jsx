import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import ResultScreen from '../Players/ResultScreen'; 

describe('ResultScreen', () => {
  const mockResults = [
    {
      correct: true,
      questionStartedAt: '2025-04-25T12:00:00Z',
      answeredAt: '2025-04-25T12:00:10Z',
    },
    {
      correct: false,
      questionStartedAt: '2025-04-25T12:01:00Z',
      answeredAt: '2025-04-25T12:01:25Z',
    },
  ];

  // Set mock sessionStorage values
  beforeEach(() => {
    // points for Q1
    sessionStorage.setItem('0', '10');
    // duration for Q1
    sessionStorage.setItem('0-duration', '30');

    // points for Q2
    sessionStorage.setItem('1', '15');
    // duration for Q2
    sessionStorage.setItem('1-duration', '25');
  });

  // Clear after each sessino
  afterEach(() => {
    sessionStorage.clear();
  });

  it('renders the result screen with calculated points and time taken', () => {
    render(<ResultScreen results={mockResults} />);

    // Headings
    expect(screen.getByText(/Results/)).toBeInTheDocument();
    expect(screen.getByText(/Points Gained/)).toBeInTheDocument();

    // First result line (correct)
    expect(screen.getByText(/Question 1/)).toBeInTheDocument();
    expect(screen.getByText(/\(10.0 s\)/)).toBeInTheDocument();
    expect(screen.getByText(/Correct/)).toBeInTheDocument();

    // Second result line (Wrong)
    expect(screen.getByText(/Question 2/)).toBeInTheDocument();
    expect(screen.getByText(/\(25.0 s\)/)).toBeInTheDocument();
    expect(screen.getByText(/Wrong/)).toBeInTheDocument();
    expect(screen.getByText(/0 points/)).toBeInTheDocument();

    // Total (just make sure it shows)
    expect(screen.getByText(/Total/)).toBeInTheDocument();
  });
});