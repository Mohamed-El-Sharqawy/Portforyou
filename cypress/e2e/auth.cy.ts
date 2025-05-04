describe("Authentication Flow", () => {
  describe("Sign In Page", () => {
    it("should sign in and redirect to templates page", () => {
      // Visit the sign-in page
      cy.visit("/sign-in");

      // Fill the sign-in form
      cy.get("[data-cy=email-signin]").type("dev.elbehery@gmail.com");
      cy.get("[data-cy=password-signin]").type("asd2481977");

      // Submit the form
      cy.get("[data-cy=submit-signin-btn]").click();

      // Check redirection to templates page
      cy.url().should("include", "/templates");
    });

    it("should navigate to sign-up page", () => {
      // Visit the sign-in page
      cy.visit("/sign-in");

      // Click on sign-up link
      cy.get("[data-cy=sign-up-btn]").click();

      // Check redirection to sign-up page
      cy.url().should("include", "/sign-up");
    });
  });

  describe("Sign Up Page", () => {
    it("should sign up and redirect to survey page", () => {
      // Visit the sign-up page
      cy.visit("/sign-up");

      // Fill the sign-up form
      cy.get("[data-cy=username-signup]").type("newuser");
      cy.get("[data-cy=email-signup]").type("new3@example.com");
      cy.get("[data-cy=password-signup]").type("password123");

      // Submit the form
      cy.get("[data-cy=submit-signup-btn]").click();

      // Check redirection to survey page
      cy.url().should("include", "/survey");
    });
  });
});
