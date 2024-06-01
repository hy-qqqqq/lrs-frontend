// cypress/e2e/sidebar.cy.ts

describe('Sidebar Tests', () => {
    beforeEach(() => {
      cy.fixture('user').then((userData) => {
        const user = userData.users[0];
        cy.visit('/login');
        cy.get('input[name="username"]').type(user.username);
        cy.get('input[name="password"]').type(user.password);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/order');
      });
    });
  
    it('Should display the navigation links', () => {
      // 打开侧边栏
      cy.get('.v-navigation-drawer').should('be.visible');
  
      // 選擇特定的導航鏈接
      cy.get('.v-navigation-drawer ul').first().children('li').should('have.length', 3);
      cy.get('.v-navigation-drawer ul').first().children('li').eq(1).should('contain', 'Dashboard');
      cy.get('.v-navigation-drawer ul').first().children('li').eq(2).should('contain', 'Order');
  
      cy.get('.v-navigation-drawer ul').last().children('li').should('have.length', 2);
      cy.get('.v-navigation-drawer ul').last().children('li').eq(0).should('contain', 'User');
      cy.get('.v-navigation-drawer ul').last().children('li').eq(1).should('contain', 'Logout');
    });
  
    it('Should display the correct username', () => {
      cy.fixture('user').then((userData) => {
        const user = userData.users[0];
        cy.get('.v-navigation-drawer ul').last().children('li').eq(0).should('contain', user.username);
      });
    });
  

    it('Should clear session storage on logout', () => {
      // 模擬點擊登出按鈕
      cy.get('.v-navigation-drawer ul').last().children('li').contains('Logout').click();
      // 等待登出請求完成並驗證響應訊息
      cy.url().should('include', '/login');

    });
  });
  