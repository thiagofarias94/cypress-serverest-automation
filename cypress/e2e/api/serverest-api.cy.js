describe('API - ServeRest', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  const { buildUser } = require('../../support/factories/user');

  afterEach(() => {
    cy.cleanupCreatedUsers();
  });

  it('cria um usuário com sucesso', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.include('Cadastro realizado com sucesso');

      cy.apiLogin({ email: user.email, password: user.password }).then((login) => {
        const token = login.body.authorization || login.body.token;
        const userId = response.body._id || login.body._id || (login.body.usuario && login.body.usuario._id);

        if (userId && token) {
          cy.registerCreatedUser(userId, token);
        }
      });
    });
  });

  it('realiza login e devolve um token válido', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      cy.apiLogin({ email: user.email, password: user.password }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.include('Login realizado com sucesso');
        expect(response.body.authorization || response.body.token).to.be.a('string').and.not.be.empty;

        const token = response.body.authorization || response.body.token;
        const userId = createResponse.body._id || response.body._id || (response.body.usuario && response.body.usuario._id);

        if (userId && token) {
          cy.registerCreatedUser(userId, token);
        }
      });
    });
  });

  it('cria um carrinho e cancela a compra para um usuário autenticado', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      cy.apiLogin({ email: user.email, password: user.password }).then((loginResponse) => {
        const token = loginResponse.body.authorization || loginResponse.body.token;
        const userId = createResponse.body._id || loginResponse.body._id || (loginResponse.body.usuario && loginResponse.body.usuario._id);

        if (userId && token) {
          cy.registerCreatedUser(userId, token);
        }

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

  it('retorna erro ao cadastrar um usuário com e-mail duplicado', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then((firstResponse) => {
      expect(firstResponse.status).to.eq(201);

      cy.apiCreateUser(user).then((duplicateResponse) => {
        expect(duplicateResponse.status).to.be.oneOf([400, 409]);
        expect(duplicateResponse.body.message).to.match(/email|usuário|já está/i);
      });
    });
  });

  it('retorna erro ao tentar fazer login com senha incorreta', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      cy.apiLogin({ email: user.email, password: 'senha-errada' }).then((response) => {
        expect(response.status).to.be.oneOf([400, 401]);
        expect(response.body.message).to.match(/senha|email|usuário/i);
      });
    });
  });

  it('retorna erro ao criar um carrinho sem token de autenticação', () => {
    const user = buildUser();

    cy.apiCreateUser(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      cy.apiCreateCart({ produtos: [] }, '').then((response) => {
        expect(response.status).to.be.oneOf([400, 401]);
        expect(response.body.message).to.match(/token|autoriz|login|usuário/i);
      });
    });
  });
});
