class ProductsPage {
  expectProductsVisible() {
    cy.contains('Produtos', { timeout: 10000 }).should('be.visible');
    return this;
  }
}

module.exports = new ProductsPage();
