class LoginPage {
  selectors = {
    emailInput: 'input[data-testid="email"], input[name="email"], input[placeholder="Digite seu email"], input[placeholder="Email"]',
    passwordInput: 'input[data-testid="senha"], input[name="password"], input[name="senha"], input[placeholder="Digite sua senha"], input[placeholder="Senha"]',
    submitBtn: 'button[data-testid="entrar"], button[type="submit"], button:contains("Entrar")',
    invalidMsg: 'Email e/ou senha inválidos',
  };

  visit() {
    cy.visit('/login');
    return this;
  }

  fill(user) {
    cy.get(this.selectors.emailInput).should('be.visible').then(($emailInput) => {
      cy.wrap($emailInput).clear().type(user.email);
    });

    cy.get(this.selectors.passwordInput).should('be.visible').then(($passwordInput) => {
      cy.wrap($passwordInput).clear().type(user.password || user.senha);
    });
    return this;
  }

  submit() {
    cy.contains('button', 'Entrar').should('be.visible').click();
    return this;
  }

  expectInvalidCredentials() {
    cy.contains(this.selectors.invalidMsg, { timeout: Cypress.config('defaultCommandTimeout') }).should('be.visible');
    cy.url().should('include', '/login');
    return this;
  }
}

module.exports = new LoginPage();
