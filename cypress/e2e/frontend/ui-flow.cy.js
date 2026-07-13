const RegisterPage = require('../../support/pages/RegisterPage');
const LoginPage = require('../../support/pages/LoginPage');
const ProductsPage = require('../../support/pages/ProductsPage');

describe('Frontend E2E - ServeRest', () => {
  const buildUser = () => ({
    name: 'Usuário Cypress',
    email: `cypress.ui.${Date.now()}@mail.com`,
    password: '123456',
  });

  it('cadastra um novo usuário com sucesso', () => {
    const user = buildUser();
    RegisterPage.visit().fill(user).submit().expectSuccess();
  });

  it('realiza login com credenciais válidas e entra na home', () => {
    const user = buildUser();
    RegisterPage.visit().fill(user).submit().expectSuccess();

    LoginPage.visit().fill(user).submit();

    ProductsPage.expectProductsVisible();
  });

  it('bloqueia login com credenciais inválidas', () => {
    const user = buildUser();
    LoginPage.visit().fill({ ...user, password: 'senha-errada' }).submit();

    LoginPage.expectInvalidCredentials();
  });
});
