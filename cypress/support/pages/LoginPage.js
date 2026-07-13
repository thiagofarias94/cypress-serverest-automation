class LoginPage {
  selectors = {
    emailInput: 'input[data-testid="email"]',
    passwordInput: 'input[data-testid="senha"]',
    submitBtn: 'button[data-testid="entrar"]',
    invalidMsg: 'Email e/ou senha inválidos',
  };

  visit() {
    cy.visit('/login');
    return this;
  }

  fill(user) {
    cy.get(this.selectors.emailInput).clear().type(user.email);
    cy.get(this.selectors.passwordInput).clear().type(user.password || user.senha);
    return this;
  }

  submit() {
    cy.get(this.selectors.submitBtn).click();
    return this;
  }

  expectInvalidCredentials() {
    cy.contains(this.selectors.invalidMsg, { timeout: Cypress.config('defaultCommandTimeout') }).should('be.visible');
    cy.url().should('include', '/login');
    return this;
  }
}

module.exports = new LoginPage();
