window.describe('Landing Page, Register, and Login page including errors', () => {
  window.it('should navigate from the landing to register page.', () => {
    window.cy.visit('localhost:3000/');
    window.cy.url().should('eq', 'http://localhost:3000/');

    window.cy.get('[name="register-nav-link"]').click();
    window.cy.url().should('include', '/register');
  })

  window.it('should input different passwords and fail to register.', () => {
    window.cy.visit('http://localhost:3000/register');

    window.cy.get("#email-input").type("email4");
    window.cy.get('#password-input').type("password");
    window.cy.get('#username-input').type("username");
    window.cy.get('#confirm-password-input').type("password1");

    window.cy.get('#submit-login-register-form').click();
    window.cy.get("#error-popup").should("be.visible");
  })

  window.it('should register a new user, then logout', () => {
    window.cy.visit('http://localhost:3000/register');

    // This email needs to be changed every run of the test.
    window.cy.get("#email-input").type("email230");
    window.cy.get('#password-input').type("password");
    window.cy.get('#username-input').type("username");
    window.cy.get('#confirm-password-input').type("password");

    window.cy.get('#submit-login-register-form').click();
    window.cy.url().should('include', '/dashboard');

    window.cy.get('#logout-button').click();
    window.cy.get('[name="login-nav-link"]').click();
    window.cy.url().should('include', '/login');
  })

  window.it('should make an invalid login.', () => {
    window.cy.visit('http://localhost:3000/login');

    window.cy.get("#email-input").type("najsknfjkasdf");
    window.cy.get('#password-input').type("anjaksnjkfa");

    window.cy.get('#submit-login-register-form').click();
    window.cy.get("#error-popup").should("be.visible");
  })

  window.it('should make a valid login and create->edit->delete a game.', () => {
    window.cy.visit('http://localhost:3000/login');

    window.cy.get("#email-input").type("email230");
    window.cy.get('#password-input').type("password");

    window.cy.get('#submit-login-register-form').click();
    window.cy.url().should('include', '/dashboard');

    // Create a new game
    window.cy.get('#create-game-button').click();
    window.cy.get('#new-game-name').type("new game 1");

    window.cy.get("#create-new-game-form").should("be.visible");

    window.cy.get('#create-new-game').click();

    // Edit the game
    window.cy.get('[aria-label="Edit game new game 1"]').click();

    window.cy.url().should('include', '/question');

    // Edit the game name
    window.cy.get('#input-new-game-title').type("new game 2");

    // Add new question
    window.cy.contains('[role="button"]', 'Add Question').click();

    // Add question title for question 1
    window.cy.get('#question-title-intput').type("new question 2");

    // Add new answer option
    window.cy.contains('[role="button"]', 'Add Answer').click();

    // Change question duration and points
    window.cy.get('#question-duration').type("10");
    window.cy.get('#question-points').type("3");

    // Confirm changes
    window.cy.contains('[role="button"]', 'Confirm Changes').click();
  
    // Delete the new game
    window.cy.get('[aria-label="Delete game new game 1new game 2"]').click();

    // Confirm delete the game
    window.cy.get("#confirm-delete-popup").should("be.visible");
    window.cy.get('#confirm-delete-game').click();

    // Logout
    window.cy.get('#logout-button').click();
  })
})
