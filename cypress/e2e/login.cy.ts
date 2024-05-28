describe('Redirection Test', () => {
  it('Should redirect to /login when visiting "/"', () => {
    cy.visit('/')
    cy.url().should('include', '/login')
  })
})

describe('Login Tests', () => {
  it('Should fail to login with unregistered account', () => {
    cy.visit('/login')
    cy.get('input[name="username"]').type('unregistered-user')
    cy.get('input[name="password"]').type('wrong-password')
    cy.get('button[type="submit"]').click()
    cy.intercept('POST', '/api/login', (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.equal(401)
      })
    })
  })

  it('Should not login with empty User ID', () => {
    cy.visit('/login')
    cy.get('input[name="password"]').type('password')
    cy.get('button[type="submit"]').click()
    cy.contains('Required.') // 假設驗證消息是 "Required."
  })

  it('Should not login with empty Password', () => {
    cy.visit('/login')
    cy.get('input[name="username"]').type('username')
    cy.get('button[type="submit"]').click()
    cy.contains('Required.') // 假設驗證消息是 "Required."
  })

  it('Should not login with empty User ID and Password', () => {
    cy.visit('/login')
    cy.get('button[type="submit"]').click()
    cy.contains('Required.') // 假設驗證消息是 "Required."
  })

  it('Should navigate to /register from /login', () => {
    cy.visit('/login')
    cy.get('button').contains('Go to Register').click()
    cy.url().should('include', '/register')
  })
})
