import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterLogin from '../RegisterLogin/RegisterLogin';
import { BrowserRouter } from 'react-router-dom';

const navigateMock = vi.fn();

// Mocking the useNavigate hook from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("RegisterLogin Component", () => {
  const successJobMock = vi.fn();
  const token = null;
  const name = 'register';

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders the form with appropriate fields', () => {
    renderWithRouter(<RegisterLogin successJob={successJobMock} token={token} name={name} />);
    
    // Check that form fields are rendered correctly
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/input password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('shows an error popup if passwords do not match', async () => {
    renderWithRouter(<RegisterLogin successJob={successJobMock} token={token} name={name} />);
    
    // Fill out the form with mismatched passwords
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/input password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'DifferentPassword123' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/submit/i));

    // Check for the error message
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('calls successJob on successful form submission', async () => {
    renderWithRouter(<RegisterLogin successJob={successJobMock} token={token} name={name} />);
    
    // Fill out the form with valid inputs
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/input password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123' } });
    
    // Simulate successful form submission
    fireEvent.click(screen.getByText(/submit/i));
    
    // Check if successJob is called
    expect(successJobMock).toHaveBeenCalled;
    
    // Check if navigate function was called
    expect(navigateMock).toHaveBeenCalled;
  });

  it('does not submit the form if passwords do not match', () => {
    renderWithRouter(<RegisterLogin successJob={successJobMock} token={token} name={name} />);
  
    // Fill out the form with mismatched passwords
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/input password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'DifferentPassword123' } });

    // Submit the form
    fireEvent.click(screen.getByText(/submit/i));

    // Ensure the successJob function was not called
    expect(successJobMock).not.toHaveBeenCalled();
  });
});