class RegisterPage {
  visit() {
    cy.visit('/login');
    cy.contains('a', 'Cadastre-se').click();
    cy.contains('h2', 'Cadastro').should('be.visible');
    return this;
  }

  fill(user) {
    cy.get('input[placeholder="Digite seu nome"]').clear().type(user.name);
    cy.get('input[placeholder="Digite seu email"]').clear().type(user.email);
    cy.get('input[placeholder="Digite sua senha"]').clear().type(user.password);

    if (user.administrator) {
      cy.contains('label', 'Administrador').click();
    }

    return this;
  }

  submit() {
    cy.contains('button', 'Cadastrar').click();
    return this;
  }

  expectSuccess() {
    cy.contains('Cadastro realizado com sucesso', { timeout: 10000 }).should('be.visible');
    return this;
  }
}

module.exports = new RegisterPage();
