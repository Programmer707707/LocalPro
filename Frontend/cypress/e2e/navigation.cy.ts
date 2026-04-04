describe("Navigation", () => {
    beforeEach(() => {
      cy.clearLocalStorage()
      cy.clearCookies()
    })  
    it("loads homepage", () => {
      cy.visit("/")
      cy.contains("Find Trusted Local", { timeout: 10000 }).should("be.visible")
    })  
    it("navigates to search from homepage", () => {
      cy.visit("/")
      cy.get('button[type="submit"]').first().click()
      cy.location("pathname", { timeout: 10000 }).should("include", "/search")
    })  
    it("shows 404 page for unknown route", () => {
      cy.visit("/this-page-does-not-exist", { failOnStatusCode: false })
      cy.contains("Page not found", { timeout: 10000 }).should("be.visible")
    })
})