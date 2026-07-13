/* UI helper commands */
const LoginPage = require('./pages/LoginPage');

Cypress.Commands.add('loginSession', (user) => {
  cy.session([user.email, user.password], () => {
    LoginPage.visit().fill(user).submit();
    cy.location('pathname', { timeout: Cypress.config('defaultCommandTimeout') * 2 }).should('include', '/home');
  });

  cy.visit('/home');
  cy.get('body', { timeout: Cypress.config('defaultCommandTimeout') * 2 }).should(($body) => {
    expect($body.text()).to.match(/Produtos|Lista|Carrinho/i);
  });
});
