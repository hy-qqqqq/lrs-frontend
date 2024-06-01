// cypress/e2e/dashboard.cy.ts

describe('Dashboard Tests', () => {
    before(() => {
        // Set up intercepts for API calls
        cy.intercept('GET', '/api/count_order_by_type', { fixture: 'count_order_by_type.json' }).as('getOrderByType');
        cy.intercept('GET', '/api/count_order_by_status', { fixture: 'count_order_by_status.json' }).as('getOrderByStatus');
    });

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

    it('Should navigate to dashboard and verify charts', () => {
        // Navigate to the dashboard
        cy.get('.v-navigation-drawer ul').first().children('li').eq(1).click();
        cy.url().should('include', '/dashboard');

        // Wait for API calls to complete
        cy.wait('@getOrderByType');
        cy.wait('@getOrderByStatus');

        // Verify the donut chart
        cy.get('#donutChart').should('be.visible');
        cy.get('#donutChart').within(() => {
            cy.get('.apexcharts-pie-series').should('exist');
        });

        // Verify the priority chart
        cy.get('#priorityChart').should('be.visible');
        cy.get('#priorityChart').within(() => {
            cy.get('.apexcharts-bar-series').should('exist');
        });

        // Verify the factory chart
        cy.get('#factoryChart').should('be.visible');
        cy.get('#factoryChart').within(() => {
            cy.get('.apexcharts-bar-series').should('exist');
        });

        // Verify the lab chart
        cy.get('#labChart').should('be.visible');
        cy.get('#labChart').within(() => {
            cy.get('.apexcharts-bar-series').should('exist');
        });
    });
});
