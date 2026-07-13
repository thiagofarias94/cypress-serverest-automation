describe('API - ServeRest', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');

  const buildUser = () => ({
    nome: `API User ${Date.now()}`,
    email: `api.${Date.now()}@mail.com`,
    password: '123456',
    administrador: 'false',
  });

  it('cria um usuário com sucesso', () => {
    const user = buildUser();

    cy.request('POST', `${apiBaseUrl}/usuarios`, user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.include('Cadastro realizado com sucesso');
    });
  });

  it('realiza login e devolve um token válido', () => {
    const user = buildUser();

    cy.request('POST', `${apiBaseUrl}/usuarios`, user).then(() => {
      cy.request('POST', `${apiBaseUrl}/login`, {
        email: user.email,
        password: user.password,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.include('Login realizado com sucesso');
        expect(response.body.authorization || response.body.token).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('cria um carrinho e cancela a compra para um usuário autenticado', () => {
    const user = buildUser();

    cy.request('POST', `${apiBaseUrl}/usuarios`, user).then(() => {
      cy.request('POST', `${apiBaseUrl}/login`, {
        email: user.email,
        password: user.password,
      }).then((loginResponse) => {
        const token = loginResponse.body.authorization || loginResponse.body.token;

        cy.request('GET', `${apiBaseUrl}/produtos`).then((productsResponse) => {
          const availableProduct = productsResponse.body.produtos.find((product) => product.quantidade > 0);
          expect(availableProduct, 'Expected at least one available product').to.exist;

          cy.request({
            method: 'POST',
            url: `${apiBaseUrl}/carrinhos`,
            headers: { authorization: token },
            body: {
              produtos: [{ idProduto: availableProduct._id, quantidade: 1 }],
            },
          }).then((cartResponse) => {
            expect(cartResponse.status).to.eq(201);
            expect(cartResponse.body.message).to.include('Cadastro realizado com sucesso');
          });

          cy.request({
            method: 'DELETE',
            url: `${apiBaseUrl}/carrinhos/cancelar-compra`,
            headers: { authorization: token },
          }).then((cancelResponse) => {
            expect(cancelResponse.status).to.eq(200);
            expect(cancelResponse.body.message).to.include('Registro excluído com sucesso');
          });
        });
      });
    });
  });
});
