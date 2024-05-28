// cypress/e2e/success.cy.ts

describe('Login Tests', () => {
  before(() => {
    // 在測試開始之前創建一個測試用戶
    cy.fixture('user').then((userData) => {
      cy.visit('/register');
      cy.get('input[name="username"]').type(userData.username);
      cy.get('input[name="password"]').type(userData.password);
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('#dep').click({ force: true });
      cy.contains('Fab A').click({ force: true });
      cy.get('button[type="submit"]').click();
    });
  });

  beforeEach(() => {
    cy.fixture('user').as('userData');
  });

  it('Should login successfully and redirect to /order', function() {
    cy.visit('/login');
    cy.get('input[name="username"]').type(this.userData.username);
    cy.get('input[name="password"]').type(this.userData.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/order');
  });
});
