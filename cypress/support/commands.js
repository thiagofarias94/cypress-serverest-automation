Cypress.Commands.add('registerUser', (user) => {
  cy.visit('/login');
  cy.contains('a', 'Cadastre-se').click();
  cy.contains('h2', 'Cadastro').should('be.visible');
  cy.get('input[placeholder="Digite seu nome"]').clear().type(user.name);
  cy.get('input[placeholder="Digite seu email"]').clear().type(user.email);
  cy.get('input[placeholder="Digite sua senha"]').clear().type(user.password);

  if (user.administrator) {
    cy.contains('label', 'Administrador').click();
  }

  cy.contains('button', 'Cadastrar').click();
});

Cypress.Commands.add('loginUser', (user) => {
  cy.visit('/login');
  cy.get('input[placeholder="Digite seu email"]').clear().type(user.email);
  cy.get('input[placeholder="Digite sua senha"]').clear().type(user.password);
  cy.contains('button', 'Entrar').click();
});
