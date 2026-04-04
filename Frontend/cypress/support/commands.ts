declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      registerCustomer(): Chainable<void>
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login")

  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)

  cy.get('button[type="submit"]').click()

  cy.location("pathname", { timeout: 20000 })
    .should("not.include", "/login")
})

Cypress.Commands.add("registerCustomer", () => {
  cy.visit("/register")
  cy.get('form').within(() => {
    cy.get('input').filter(':visible').eq(0).type("Test")
    cy.get('input').filter(':visible').eq(1).type("User")
    cy.get('input[type="email"]').type(`test${Date.now()}@test.com`)
    cy.get('input[type="password"]').type("Test@1234")
    cy.get('button[type="submit"]').click()
  })
})