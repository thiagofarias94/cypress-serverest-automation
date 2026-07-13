class RegisterPage {
  selectors = {
    name: 'input[placeholder="Digite seu nome"], input[name="nome"], input[name="name"], input[data-testid="nome"]',
    email: 'input[placeholder="Digite seu email"], input[data-testid="email"], input[name="email"]',
    password: 'input[placeholder="Digite sua senha"], input[data-testid="senha"], input[name="password"], input[name="senha"]',
    adminCheckbox: 'input[type="checkbox"], input[name="administrador"]',
    submitBtn: 'button:contains("Cadastrar"), button[type="submit"]',
    successMsg: 'Cadastro realizado com sucesso',
  };

  visit() {
    cy.visit('/login');
    cy.contains('a', 'Cadastre-se').click();
    cy.contains('h2', 'Cadastro').should('be.visible');
    return this;
  }

  fill(user) {
    cy.get(this.selectors.name).should('be.visible').then(($nameInput) => {
      cy.wrap($nameInput).clear().type(user.nome || user.name);
    });

    cy.get(this.selectors.email).should('be.visible').then(($emailInput) => {
      cy.wrap($emailInput).clear().type(user.email);
    });

    cy.get(this.selectors.password).should('be.visible').then(($passwordInput) => {
      cy.wrap($passwordInput).clear().type(user.password || user.senha);
    });

    if (user.administrador === 'true' || user.administrator) {
      cy.get(this.selectors.adminCheckbox).check({ force: true });
    }

    return this;
  }

  submit() {
    cy.contains('button', 'Cadastrar').should('be.visible').click();
    return this;
  }

  expectSuccess() {
    cy.contains(this.selectors.successMsg, { timeout: Cypress.config('defaultCommandTimeout') }).should('be.visible');
    return this;
  }
}

module.exports = new RegisterPage();
