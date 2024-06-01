// cypress/e2e/order.cy.ts

describe('Order Management Tests', () => {
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

    it('Should create a new order', () => {
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

    });

    it('Should edit the priority of the created order', () => {
        cy.wait(2000);

        // 點擊最新的訂單行
        cy.get('.v-data-table tbody tr').first().click();

        // 編輯優先級
        cy.contains('.v-list-item', 'Priority').click();
        cy.contains('Select to update priority').should('be.visible');
        cy.get('.v-input__control').contains('一般').click({ force: true });
        cy.get('.v-list-item').contains('急單').click({ force: true });
        cy.get('.v-card').last().contains('button', 'Update').click();
        cy.contains('Order updated').should('be.visible');

        // 確認優先級已更新
        cy.get('.v-data-table tbody tr').first().within(() => {
            cy.get('td').contains('急單').should('be.visible');
        });
    });


    it('Should not complete the created order', () => {
        cy.wait(2000);
        cy.get('.v-data-table tbody tr').first().click();

        // 完成訂單
        cy.get('button').contains('Complete').click();
        cy.contains('Are you sure to complete this order?').should('be.visible');
        cy.get('.v-card').last().contains('button', 'Complete').click();
        cy.contains('User department does not match order lab').should('be.visible');

    });


    it('Should delete the created order', () => {
        cy.wait(2000);
        // 點擊最新的訂單行
        cy.get('.v-data-table tbody tr').first().click();

        // 刪除訂單
        cy.get('button').contains('Delete').click();
        cy.contains('Are you sure to delete this order?').should('be.visible');
        cy.get('.v-card').last().contains('button', 'Delete').click();
        cy.contains('Order deleted').should('be.visible');

    });

});
