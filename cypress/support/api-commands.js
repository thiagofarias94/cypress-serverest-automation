/* Custom API commands for ServeRest */
const apiBase = Cypress.env('apiBaseUrl') || 'https://serverest.dev';

Cypress.Commands.add('apiCreateUser', (user) => {
  return cy.request({
    method: 'POST',
    url: `${apiBase}/usuarios`,
    body: user,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiLogin', (credentials) => {
  return cy.request({
    method: 'POST',
    url: `${apiBase}/login`,
    body: credentials,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiDeleteUser', (userId, token) => {
  return cy.request({
    method: 'DELETE',
    url: `${apiBase}/usuarios/${userId}`,
    headers: { authorization: token },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiCreateCart', (cartBody, token) => {
  return cy.request({
    method: 'POST',
    url: `${apiBase}/carrinhos`,
    headers: { authorization: token },
    body: cartBody,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiCancelCart', (token) => {
  return cy.request({
    method: 'DELETE',
    url: `${apiBase}/carrinhos/cancelar-compra`,
    headers: { authorization: token },
    failOnStatusCode: false,
  });
});

// track created users for teardown
Cypress.Commands.add('registerCreatedUser', (id, token) => {
  const list = Cypress.env('createdUsers') || [];
  list.push({ id, token });
  Cypress.env('createdUsers', list);
});

Cypress.Commands.add('cleanupCreatedUsers', () => {
  const list = Cypress.env('createdUsers') || [];
  list.forEach((u) => {
    cy.apiDeleteUser(u.id, u.token);
  });
  Cypress.env('createdUsers', []);
});
