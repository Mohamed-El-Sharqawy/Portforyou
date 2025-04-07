/// <reference types="cypress" />

// Declare the custom commands for TypeScript
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with email and password
       * @example cy.login('test@example.com', 'password123')
       */
      login(email: string, password: string): void
      
      /**
       * Custom command to register a new user
       * @example cy.register('testuser', 'test@example.com', 'password123')
       */
      register(username: string, email: string, password: string): void
    }
  }
}

// Custom command to login a user
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/sign-in');
  cy.get('[data-cy=email-signin]').type(email);
  cy.get('[data-cy=password-signin]').type(password);
  cy.get('[data-cy=submit-signin-btn]').click();
});

// Custom command to register a new user
Cypress.Commands.add('register', (username: string, email: string, password: string) => {
  cy.visit('/sign-up');
  cy.get('[data-cy=username-signup]').type(username);
  cy.get('[data-cy=email-signup]').type(email);
  cy.get('[data-cy=password-signup]').type(password);
  cy.get('[data-cy=submit-signup-btn]').click();
});

// Export an empty object to make this file a module
export {};