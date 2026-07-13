describe('API - ServeRest', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  const { buildUser } = require('../../support/factories/user');

  afterEach(function () {
    // Attempt to cleanup created user if set on test context
    if (this.currentTest && this.currentTest.ctx && this.currentTest.ctx.createdUser) {
      const created = this.currentTest.ctx.createdUser;
      if (created.id && created.token) {
        cy.apiDeleteUser(created.id, created.token);
      }
    }
  });

  it('cria um usuário com sucesso', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.include('Cadastro realizado com sucesso');
      // Save created user for teardown
      cy.apiLogin({ email: user.email, password: user.password }).then((login) => {
        const token = login.body.authorization || login.body.token;
        // Some responses include usuario object
        const userId = response.body._id || (login.body._id || (login.body.usuario && login.body.usuario._id));
        if (userId && token) {
          cy.wrap({ id: userId, token }).as('createdUser');
        }
      });
    });
  });

  it('realiza login e devolve um token válido', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then(() => {
      cy.apiLogin({ email: user.email, password: user.password }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.include('Login realizado com sucesso');
        expect(response.body.authorization || response.body.token).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('cria um carrinho e cancela a compra para um usuário autenticado', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then(() => {
      cy.apiLogin({ email: user.email, password: user.password }).then((loginResponse) => {
        const token = loginResponse.body.authorization || loginResponse.body.token;

        cy.request(`${apiBaseUrl}/produtos`).then((productsResponse) => {
          const availableProduct = productsResponse.body.produtos.find((product) => product.quantidade > 0);
          expect(availableProduct, 'Expected at least one available product').to.exist;

          cy.apiCreateCart({ produtos: [{ idProduto: availableProduct._id, quantidade: 1 }] }, token).then((cartResponse) => {
            expect(cartResponse.status).to.eq(201);
            expect(cartResponse.body.message).to.include('Cadastro realizado com sucesso');

            cy.apiCancelCart(token).then((cancelResponse) => {
              expect(cancelResponse.status).to.eq(200);
              expect(cancelResponse.body.message).to.include('Registro excluído com sucesso');
            });
          });
        });
      });
    });
  });
});
