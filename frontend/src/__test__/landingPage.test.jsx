import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LandingPage from '../LandingPage/LandingPage';

describe('LandingPage component', () => {
  it('renders the title and description correctly', () => {
    render(<LandingPage />);
    
    // Check the title and description. Make sure they're correct.
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('BigBrain');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Your reliable, totally not Kahoot, timed quiz app!'
    );
  });

  it('renders the landing image with correct alt text', () => {
    render(<LandingPage />);
    
    // Check the image and alt text of the image for screen readers.
    const image = screen.getByAltText('Students playing a quiz game together');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('landing-page-picture.png'));
  });
});