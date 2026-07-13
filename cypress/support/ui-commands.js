/* UI helper commands */
Cypress.Commands.add('loginSession', (user) => {
  cy.session([user.email, user.password], () => {
    cy.visit('/login');
    cy.get('input[data-testid="email"]').clear().type(user.email);
    cy.get('input[data-testid="senha"]').clear().type(user.password);
    cy.get('button[data-testid="entrar"]').click();
    cy.url().should('include', '/home');
  });
});
