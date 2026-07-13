class ProductsPage {
  selectors = {
    heading: /Produtos|Lista|Carrinho/i,
  };

  expectProductsVisible() {
    cy.get('body', { timeout: Cypress.config('defaultCommandTimeout') }).should(($body) => {
      expect($body.text()).to.match(this.selectors.heading);
    });
    return this;
  }
}

module.exports = new ProductsPage();
