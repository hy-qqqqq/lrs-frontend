// cypress/e2e/order_filter.cy.ts

describe('Order Filter Tests', () => {
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

    const applyFilterAndVerify = (fieldName, filterName, columnIndex) => {
        cy.get('.mdi-filter-multiple-outline').click();
        cy.get('.v-slide-group__content').find('.v-chip').contains(filterName).then(($chip) => {
            if ($chip.length) {
                cy.wrap($chip).click();
                cy.get('.mdi-filter-multiple-outline').click();

                // 檢查是否顯示 "No data available"
                cy.get('.v-data-table tbody tr').then(($rows) => {
                    if ($rows.hasClass('v-data-table-rows-no-data')) {
                        cy.wrap($rows).should('contain.text', 'No data available');
                        cy.log(`No orders found for filter "${filterName}"`);
                    } else {
                        // 如果不是空的，檢查每一行
                        cy.get('.v-data-table tbody tr').not('.v-data-table-rows-no-data').each(($row) => {
                            cy.wrap($row).find('td').eq(columnIndex).then(($td) => {
                                const text = $td.text().trim();
                                if (text !== '') {
                                    expect(text).to.contain(filterName);
                                }
                            });
                        });
                    }
                });
            } else {
                cy.log(`Filter "${filterName}" not found`);
            }
        });
    };

    it('Should filter orders by priority "一般"', () => {
        applyFilterAndVerify('priority', '一般', 1);
    });

    it('Should filter orders by priority "急單"', () => {
        applyFilterAndVerify('priority', '急單', 1);
    });

    it('Should filter orders by priority "特急單"', () => {
        applyFilterAndVerify('priority', '特急單', 1);
    });

    it('Should filter orders by factory "Fab A"', () => {
        applyFilterAndVerify('factory', 'Fab A', 2);
    });

    it('Should filter orders by factory "Fab B"', () => {
        applyFilterAndVerify('factory', 'Fab B', 2);
    });

    it('Should filter orders by factory "Fab C"', () => {
        applyFilterAndVerify('factory', 'Fab C', 2);
    });

    it('Should filter orders by lab "化學實驗室"', () => {
        applyFilterAndVerify('lab', '化學實驗室', 3);
    });

    it('Should filter orders by lab "表面分析實驗室"', () => {
        applyFilterAndVerify('lab', '表面分析實驗室', 3);
    });

    it('Should filter orders by lab "成分分析實驗室"', () => {
        applyFilterAndVerify('lab', '成分分析實驗室', 3);
    });

    it('Should filter orders by status "Issued"', () => {
        applyFilterAndVerify('status', 'Issued', 7);
    });

    it('Should filter orders by status "Approved"', () => {
        applyFilterAndVerify('status', 'Approved', 7);
    });

    it('Should filter orders by status "Completed"', () => {
        applyFilterAndVerify('status', 'Completed', 7);
    });

    it('Should filter orders by status "Rejected"', () => {
        applyFilterAndVerify('status', 'Rejected', 7);
    });

    const applyMultipleFiltersAndVerify = (fieldName, filterNames, columnIndex) => {
        cy.get('.mdi-filter-multiple-outline').click();
        filterNames.forEach((filterName) => {
            cy.get('.v-slide-group__content').find('.v-chip').contains(filterName).then(($chip) => {
                if ($chip.length) {
                    cy.wrap($chip).click();
                } else {
                    cy.log(`Filter "${filterName}" not found`);
                }
            });
        });
        cy.get('.mdi-filter-multiple-outline').click();

        // 檢查是否顯示 "No data available"
        cy.get('.v-data-table tbody tr').then(($rows) => {
            if ($rows.hasClass('v-data-table-rows-no-data')) {
                cy.wrap($rows).should('contain.text', 'No data available');
                cy.log(`No orders found for filters "${filterNames.join(', ')}"`);
            } else {
                // 如果不是空的，檢查每一行
                cy.get('.v-data-table tbody tr').not('.v-data-table-rows-no-data').each(($row) => {
                    filterNames.forEach((filterName) => {
                        cy.wrap($row).find('td').eq(columnIndex).then(($td) => {
                            const text = $td.text().trim();
                            if (text !== '') {
                                expect(text).to.contain(filterName);
                            }
                        });
                    });
                });
            }
        });
    };

    it('Should filter orders by multiple priorities "一般" and "急單"', () => {
        applyMultipleFiltersAndVerify('priority', ['一般', '急單'], 1);
    });

    it('Should filter orders by multiple priorities "急單" and "特急單"', () => {
        applyMultipleFiltersAndVerify('priority', ['急單', '特急單'], 1);
    });

    it('Should filter orders by multiple priorities "一般" and "特急單"', () => {
        applyMultipleFiltersAndVerify('priority', ['一般', '特急單'], 1);
    });
});
