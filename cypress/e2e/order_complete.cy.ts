// cypress/e2e/order_complete.cy.ts

describe('Order Management Tests', () => {
    let createdOrderSerial;

    it('User0 should create a new order', () => {
        cy.fixture('user').then((userData) => {
            const user0 = userData.users[0];
            cy.visit('/login');
            cy.get('input[name="username"]').type(user0.username);
            cy.get('input[name="password"]').type(user0.password);
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/order');
        });

        cy.get('button').contains('Add Order').click();
        cy.get('input[id="factory"]').should('be.visible').click({ force: true });
        cy.get('.v-list-item').contains('Fab A').click({ force: true });
        cy.get('input[id="lab"]').should('be.visible').click({ force: true });
        cy.get('.v-list-item').contains('化學實驗室').click({ force: true });
        cy.get('input[id="priority"]').should('be.visible').click({ force: true });
        cy.get('.v-list-item').contains('一般').click({ force: true });
        cy.get('textarea[id="description"]').click({ force: true });
        cy.get('textarea[id="description"]').type('New Order Description');
        cy.get('button[type="submit"]').click();
        cy.contains('Order created successfully').should('be.visible');

        // 獲取創建的訂單 Serial No.
        cy.wait(2000); // 等待訂單列表更新
        cy.get('.v-data-table tbody tr').first().find('td').first().then(($td) => {
            createdOrderSerial = $td.text().trim();
        });
    });

    it('User3 should complete the created order', () => {
        cy.fixture('user').then((userData) => {
            const user3 = userData.users[3];
            cy.visit('/login');
            cy.get('input[name="username"]').type(user3.username);
            cy.get('input[name="password"]').type(user3.password);
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/order');
        });

        // 點擊創建的訂單行
        cy.wait(2000);
        cy.get('.v-data-table tbody tr').contains('td', createdOrderSerial).click();

        // 完成訂單
        cy.get('button').contains('Complete').click();
        cy.contains('Are you sure to complete this order?').should('be.visible');
        cy.get('.v-card').last().contains('button', 'Complete').click();
        cy.wait(2000); // 等待請求完成
        cy.contains('Order updated successfully').should('be.visible');
    });

    it('User0 should delete the created order', () => {
        cy.fixture('user').then((userData) => {
            const user0 = userData.users[0];
            cy.visit('/login');
            cy.get('input[name="username"]').type(user0.username);
            cy.get('input[name="password"]').type(user0.password);
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/order');
        });

        // 點擊創建的訂單行
        cy.wait(2000);
        cy.get('.v-data-table tbody tr').contains('td', createdOrderSerial).click();

        // 刪除訂單
        cy.get('button').contains('Delete').click();
        cy.contains('Are you sure to delete this order?').should('be.visible');
        cy.get('.v-card').last().contains('button', 'Delete').click();
        cy.wait(2000); // 等待請求完成
        cy.contains('Order deleted').should('be.visible');
    });
});
