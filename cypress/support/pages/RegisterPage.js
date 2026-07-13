class RegisterPage {
  selectors = {
    name: 'input[placeholder="Digite seu nome"]',
    email: 'input[placeholder="Digite seu email"]',
    password: 'input[placeholder="Digite sua senha"]',
    adminCheckbox: 'input[type="checkbox"]',
    submitBtn: 'button:contains("Cadastrar")',
    successMsg: 'Cadastro realizado com sucesso',
  };

  visit() {
    cy.visit('/login');
    cy.contains('a', 'Cadastre-se').click();
    cy.contains('h2', 'Cadastro').should('be.visible');
    return this;
  }

  fill(user) {
    cy.get(this.selectors.name).clear().type(user.nome || user.name);
    cy.get(this.selectors.email).clear().type(user.email);
    cy.get(this.selectors.password).clear().type(user.password || user.senha);

    if (user.administrador === 'true' || user.administrator) {
      cy.get(this.selectors.adminCheckbox).check({ force: true });
    }

    return this;
  }

  submit() {
    cy.contains('button', 'Cadastrar').click();
    return this;
  }

  expectSuccess() {
    cy.contains(this.selectors.successMsg, { timeout: Cypress.config('defaultCommandTimeout') }).should('be.visible');
    return this;
  }
}

module.exports = new RegisterPage();
