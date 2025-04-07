# Cypress E2E Testing for Portforyou

This directory contains end-to-end tests for the Portforyou application using
Cypress.

## Test Structure

- `e2e/` - Contains all E2E test files
  - `auth.cy.ts` - Tests for authentication flows (sign-in and sign-up)
- `support/` - Contains helper functions and custom commands
  - `commands.ts` - Custom Cypress commands for common operations
  - `e2e.ts` - Configuration for E2E tests

## Available Tests

### Authentication Tests

- Sign In

  - Display of sign-in form
  - Form validation
  - Failed login attempt
  - Successful login
  - Navigation to sign-up page

- Sign Up
  - Display of sign-up form
  - Form validation
  - Failed registration
  - Successful registration

## Custom Commands

The following custom commands are available for use in tests:

- `cy.login(email, password)` - Simulates a user login with the provided
  credentials
- `cy.register(username, email, password)` - Simulates user registration with
  the provided information

## Running Tests

To run the tests in the Cypress UI:

```bash
npm run cypress:open
```

To run the tests headlessly in the command line:

```bash
npm run cypress:run
```

To run the tests with the application automatically started:

```bash
npm run test:e2e
```

## Notes

- Tests use mocked API responses to avoid actual network requests
- The tests are designed to work with the existing data-cy attributes in the
  application
