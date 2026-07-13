class ProductsPage {
  selectors = {
    heading: 'Produtos',
  };

  expectProductsVisible() {
    cy.contains(this.selectors.heading, { timeout: Cypress.config('defaultCommandTimeout') }).should('be.visible');
    return this;
  }
}

module.exports = new ProductsPage();
