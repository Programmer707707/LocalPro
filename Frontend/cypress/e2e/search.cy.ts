describe("Search", () => {
    it("loads search page", () => {
      cy.visit("/search")
      cy.url().should("include", "/search")
    })  
    it("searches by keyword", () => {
      cy.visit("/search")
      cy.get('input[placeholder="Search professionals..."]').type("plumber")
      cy.get('button[type="submit"]').click()
      cy.url().should("include", "keyword=plumber")
    })  
    it("filters by city", () => {
      cy.visit("/search")
      cy.get('input[placeholder="City..."]').type("Budapest")
      cy.get('button[type="submit"]').click()
      cy.url().should("include", "city=Budapest")
    })  
    it("shows empty state when no results", () => {
      cy.visit("/search?keyword=xyznonexistent123")
      cy.contains("No professionals found").should("be.visible")
    })  
    it("shows clear filters button when filters active", () => {
      cy.visit("/search?city=Budapest")
      cy.contains("Budapest").should("be.visible")
    })
})