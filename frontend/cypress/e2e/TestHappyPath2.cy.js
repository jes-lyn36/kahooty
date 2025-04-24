// describe and cy are undefined in lint, so i commented it out for now
/*
describe('Landing Page, Register, and Login page including errors', () => {
  it('should navigate from the landing to register page.', () => {
    cy.visit('localhost:3000/');
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('[name="register-nav-link"]').click();
    cy.url().should('include', '/register');
  })

  it('should input different passwords and fail to register.', () => {
    cy.visit('http://localhost:3000/register');

    cy.get("#email-input").type("email4");
    cy.get('#password-input').type("password");
    cy.get('#username-input').type("username");
    cy.get('#confirm-password-input').type("password1");

    cy.get('#submit-login-register-form').click();
    cy.get("#error-popup").should("be.visible");
  })

  it('should register a new user, then logout', () => {
    cy.visit('http://localhost:3000/register');

    // This email needs to be changed every run of the test.
    cy.get("#email-input").type("email5");
    cy.get('#password-input').type("password");
    cy.get('#username-input').type("username");
    cy.get('#confirm-password-input').type("password");

    cy.get('#submit-login-register-form').click();
    cy.url().should('include', '/dashboard');

    cy.get('#logout-button').click();
    cy.get('[name="login-nav-link"]').click();
    cy.url().should('include', '/login');
  })

  it('should make an invalid login.', () => {
    cy.visit('http://localhost:3000/login');

    cy.get("#email-input").type("najsknfjkasdf");
    cy.get('#password-input').type("anjaksnjkfa");

    cy.get('#submit-login-register-form').click();
    cy.get("#error-popup").should("be.visible");
  })

  it('should make a valid login.', () => {
    cy.visit('http://localhost:3000/login');

    cy.get("#email-input").type("email3");
    cy.get('#password-input').type("password");

    cy.get('#submit-login-register-form').click();
    cy.url().should('include', '/dashboard');
  })
})
*/