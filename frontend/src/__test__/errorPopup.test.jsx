import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import ErrorPopup from "../ErrorPopup";

describe("Error popup test", () => {
  it("should render error message and call close handler on button click", async () => {
    const mockClose = vi.fn();

    render(
      <ErrorPopup
      errorMessage={"errorMessage"}
      showErrorPopup={true}
      handleCloseErrorPopup={mockClose}
      />
    );

    // Check if the error message is shown
    expect(screen.getByText("errorMessage")).toBeInTheDocument();

    // Find and click the "Close" button
    const closeButton = screen.getByTestId('close-error-button');
    fireEvent.click(closeButton);

    // Expect the mock function to be called
    expect(mockClose).toHaveBeenCalled();
  });
});