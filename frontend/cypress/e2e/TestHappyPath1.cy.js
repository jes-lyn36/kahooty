window.describe('Admin start and end game succesfully', () => {
  window.it('should make a valid register and try game session.', () => {
    window.cy.visit('http://localhost:3000/register');

    // This email needs to be changed every run of the test.
    window.cy.get("#email-input").type("email9");
    window.cy.get('#password-input').type("password");
    window.cy.get('#username-input').type("username");
    window.cy.get('#confirm-password-input').type("password");

    window.cy.get('#submit-login-register-form').click();
    window.cy.url().should('include', '/dashboard');

    // Create a new game
    window.cy.get('#create-game-button').click();
    window.cy.get('#new-game-name').type("game1");

    window.cy.get("#create-new-game-form").should("be.visible");

    window.cy.get('#create-new-game').click();

    // Start a game successfully
    window.cy.get('[aria-label="Start Game Session game1"]').click();
    
    window.cy.get("#admin-start-game-session-popup").should("be.visible");
    window.cy.contains('[role="button"]', 'Close').click();

    // Stops a game successfully
    window.cy.get('[aria-label="Stop Game Session game1"]').click();

    window.cy.get("#admin-game-ended-popup").should("be.visible");

    // View results
    window.cy.contains('[role="button"]', 'View Results').click();
    window.cy.url().should('include', '/result');

    // Logout
    window.cy.get('#logout-button').click();

    // Log back in
    window.cy.visit('http://localhost:3000/login');

    window.cy.get("#email-input").type("email9");
    window.cy.get('#password-input').type("password");

    window.cy.get('#submit-login-register-form').click();
    window.cy.url().should('include', '/dashboard');
  })
})