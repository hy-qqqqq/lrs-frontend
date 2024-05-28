describe('Registration Tests', () => {
  it('Should not register with empty User ID', () => {
    cy.visit('/register')
    cy.get('input[name="password"]').type('new-password')
    cy.get('input[name="email"]').type('new-email@example.com')
    cy.get('#dep').click({ force: true })
    cy.get('.v-list-item').contains('Fab A').click({ force: true })
    cy.get('button[type="submit"]').click()
    cy.contains('Required.')
  })

  it('Should not register with empty Password', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-username')
    cy.get('input[name="email"]').type('new-email@example.com')
    cy.get('#dep').click({ force: true })
    cy.get('.v-list-item').contains('Fab A').click({ force: true })
    cy.get('button[type="submit"]').click()
    cy.contains('Required.')
  })

  it('Should not register with empty Email', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-username')
    cy.get('input[name="password"]').type('new-password')
    cy.get('#dep').click({ force: true })
    cy.get('.v-list-item').contains('Fab A').click({ force: true })
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid Email address')
  })

  it('Should not register with invalid Email format', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-username')
    cy.get('input[name="password"]').type('new-password')
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('#dep').click({ force: true })
    cy.get('.v-list-item').contains('Fab A').click({ force: true })
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid Email address')
  })

  it('Should not register with empty Department', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-username')
    cy.get('input[name="password"]').type('new-password')
    cy.get('input[name="email"]').type('new-email@example.com')
    cy.get('button[type="submit"]').click()
    cy.contains('Required.')
  })
})
