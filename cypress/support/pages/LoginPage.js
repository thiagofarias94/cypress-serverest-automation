class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  fill(user) {
    cy.get('input[placeholder="Digite seu email"]').clear().type(user.email);
    cy.get('input[placeholder="Digite sua senha"]').clear().type(user.password);
    return this;
  }

  submit() {
    cy.contains('button', 'Entrar').click();
    return this;
  }

  expectInvalidCredentials() {
    cy.contains('Email e/ou senha inválidos', { timeout: 10000 }).should('be.visible');
    cy.url().should('include', '/login');
    return this;
  }
}

module.exports = new LoginPage();
