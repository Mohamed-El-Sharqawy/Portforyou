describe("Survey Page", () => {
  beforeEach(() => {
    // Visit the sign-in page
    cy.visit("/sign-in");

    // Fill the sign-in form
    cy.get("[data-cy=email-signin]").type("new2@example.com");
    cy.get("[data-cy=password-signin]").type("password123");

    // Submit the form
    cy.get("[data-cy=submit-signin-btn]").click();

    // After login, we should be redirected to either the survey page (if no preferences)
    // or the templates page (if preferences are already set)
    cy.url().should("include", "/");
    
    // If we're redirected to templates, navigate to survey page manually
    cy.url().then((url) => {
      if (url.includes('/templates')) {
        cy.visit('/survey');
      }
    });
  });

  it("should display the survey form with all required sections", () => {
    // Check for color selection section
    cy.contains("What are your favorite colors?").should("be.visible");

    // Check for profession selection section
    cy.contains("What's your profession?").should("be.visible");

    // Check for email input section
    cy.contains("What's your Email?").should("be.visible");

    // Check for submit button
    cy.get("[data-cy=submit-survey-btn]").should("be.visible");

    // Check for resume upload button
    cy.contains("Upload Your Resume").should("be.visible");
  });

  it("should complete the survey and redirect to templates page", () => {
    // Select colors (at least one)
    cy.get('button[name="blue"]').click();
    cy.get('button[name="green"]').click();

    // Select profession
    cy.contains("Software Engineering").click();

    // Enter email
    cy.get('input[type="email"]').clear().type("test@example.com");

    // Submit the survey
    cy.get("[data-cy=submit-survey-btn]").should("not.be.disabled").click();

    // Verify the thanks modal appears
    cy.get("[data-cy=survey-thankyou-modal]").should("be.visible");
    cy.contains("Thank you for completing the survey!").should("be.visible");

    // Click the continue button
    cy.get("[data-cy=continue-to-templates-btn]").click();

    // Verify redirection to templates page
    cy.url().should("include", "/templates");
  });

  it('should handle "Other" profession selection', () => {
    // Select colors
    cy.get('button[name="pink"]').click();

    // Select "Other" profession
    cy.contains("Other").click();

    // Check that the input field appears
    cy.get('input[placeholder="Enter your profession"]').should("be.visible");

    // Enter custom profession
    cy.get('input[placeholder="Enter your profession"]').type("AI Researcher");

    // Enter email
    cy.get('input[type="email"]').clear().type("researcher@example.com");

    // Submit the survey
    cy.get("[data-cy=submit-survey-btn]").should("not.be.disabled").click();

    // Verify the thanks modal appears
    cy.get("[data-cy=survey-thankyou-modal]").should("be.visible");
    cy.contains("Thank you for completing the survey!").should("be.visible");

    // Click the continue button
    cy.get("[data-cy=continue-to-templates-btn]").click();

    // Verify redirection to templates page
    cy.url().should("include", "/templates");
  });
});
