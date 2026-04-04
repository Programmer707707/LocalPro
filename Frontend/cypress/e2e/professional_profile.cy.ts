describe("Professional Profile", () => {
    beforeEach(() => {
      cy.clearLocalStorage()
      cy.clearCookies()
    })  
    it("loads professional profile page", () => {
      cy.visit("/professionals/2")
      cy.get("h1", { timeout: 10000 }).should("be.visible")
    })  
    it("shows 404 for nonexistent professional", () => {
      cy.visit("/professionals/99999", { failOnStatusCode: false })
      cy.contains(/not found|professional not found/i, { timeout: 10000 }).should("be.visible")
    })  
    it("opens review modal for logged in customer", () => {
      cy.login("user@example.com", "12345678")
      cy.visit("/professionals/2")
    
      cy.contains("Write a Review", { timeout: 10000 }).should("be.visible")
      cy.contains("Write a Review").click()
    
      cy.contains("Submit Review", { timeout: 10000 }).should("be.visible")
    })
})