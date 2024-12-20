import { setupClerkTestingToken } from "@clerk/testing/cypress";

describe("Login Button Redirect Test", () => {
  beforeEach(() => {
    // Replace with your app's base URL
    cy.visit("/");
  });

  it("redirects to /sign-in page on login button click", () => {
    // Find the login button (adjust selector as needed)
    cy.get("[data-cy=login-btn]").click();

    // Verify the URL changes to /sign-in
    cy.url().should("include", "/sign-in");

    // Optional: Check if the sign-in page contains Clerk's sign-in component
    cy.get("[data-cy=sign-in]").should("exist");
  });
});

describe("Testing Authentication and Protected Route (Survey)", () => {
  it("sign in", () => {
    setupClerkTestingToken();

    cy.visit("/survey");

    cy.contains("h1", "Sign in");
    cy.get(".cl-signIn-root").should("exist");
    cy.get("input[name=identifier]").type(Cypress.env("test_user"));

    cy.get(".cl-formButtonPrimary").contains("button", "Continue").click();
    cy.get("input[name=password]").type(Cypress.env("test_password"));

    cy.get(".cl-formButtonPrimary").contains("button", "Continue").click();

    cy.url().should("include", "/survey");
    cy.contains(
      "h1",
      "Your preferences and profession help us improve your experience"
    );

    cy.visit("/");
    cy.url().should("include", "/survey");
  });

  it("sign up", () => {
    setupClerkTestingToken();

    cy.visit("/sign-up");
    cy.contains("h1", "Create your account");
    cy.get(".cl-signUp-root").should("exist");

    cy.get("input[name=username]").type("e2euser" + new Date().getTime());
    cy.get("input[name=emailAddress]").type(Cypress.env("test_user"));
    cy.get("input[name=password]").type(Cypress.env("test_password"));

    cy.get(".cl-formButtonPrimary").contains("button", "Continue").click();

    cy.visit("/survey");

    cy.url().should("include", "/sign-in");
    cy.contains("h1", "Sign in");
    cy.get(".cl-signIn-root").should("exist");
    cy.get("input[name=identifier]").type(Cypress.env("test_user"));

    cy.get(".cl-formButtonPrimary").contains("button", "Continue").click();
    cy.get("input[name=password]").type(Cypress.env("test_password"));

    cy.get(".cl-formButtonPrimary").contains("button", "Continue").click();

    cy.url().should("include", "/survey");
    cy.contains(
      "h1",
      "Your preferences and profession help us improve your experience"
    );

    cy.visit("/");
    cy.url().should("include", "/survey");
  });
});
