module.exports = {
  buildUser: (overrides = {}) => {
    const ts = Date.now();
    return Object.assign(
      {
        nome: `API User ${ts}`,
        email: `api.${ts}@mail.com`,
        password: '123456',
        administrador: 'false',
      },
      overrides
    );
  },
  fromFixture: (fixtureName = 'user') => {
    const fixture = require(`../../fixtures/${fixtureName}.json`);
    return Object.assign({}, fixture);
  },
};
