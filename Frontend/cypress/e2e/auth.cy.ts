describe("Authentication", () => {
    beforeEach(() => {
      cy.clearLocalStorage()
      cy.clearCookies()
    })  
    it("shows error on invalid login", () => {
      cy.visit("/login")
      cy.contains("Sign in").should("be.visible")
      cy.get('input[type="email"]').type("wrong@test.com")
      cy.get('input[type="password"]').type("Wrong@1234")
      cy.get('button[type="submit"]').click()   
      cy.location("pathname").should("eq", "/login")
      cy.get("form").should("be.visible")
    })  
    it("logs in with valid customer credentials", () => {
      cy.visit("/login")
      cy.contains("Sign in").should("be.visible")
      cy.get('input[type="email"]').type("user@example.com")
      cy.get('input[type="password"]').type("12345678")
      cy.get('button[type="submit"]').click()   
      cy.location("pathname", { timeout: 20000 }).should("eq", "/")
    })  
    it("logs in with valid professional credentials", () => {
      cy.visit("/login")
      cy.contains("Sign in").should("be.visible")
      cy.get('input[type="email"]').type("master@example.com")
      cy.get('input[type="password"]').type("87654321")
      cy.get('button[type="submit"]').click()   
      cy.location("pathname", { timeout: 20000 }).should("eq", "/dashboard")
    })  
    it("loads register page and shows role selection", () => {
      cy.visit("/register")
      cy.contains(/create account/i).should("be.visible")
      cy.contains("button", /customer/i).should("be.visible")
      cy.contains("button", /professional/i).should("be.visible")
    })

    it("registers a new customer successfully", () => {
        const uniqueEmail = `test${Date.now()}@test.com`

        cy.visit("/register")
        cy.contains(/create account/i).should("be.visible")

        cy.get('input[placeholder="John"]').type("Test")
        cy.get('input[placeholder="Smith"]').type("User")
        cy.get('input[placeholder="you@example.com"]').type(uniqueEmail)
        cy.get('input[placeholder="Min 8 characters"]').type("Test@1234")
        cy.get('button[type="submit"]').click()

        cy.location("pathname", { timeout: 20000 }).should("eq", "/")
    })

    it("registers a new professional successfully", () => {
      const uniqueEmail = `pro${Date.now()}@test.com`

      cy.visit("/register")
      cy.contains(/create account/i).should("be.visible")

      cy.get("button").filter(':contains("professional")').not(':contains("Find")').click()
        
      cy.get("button").filter(':contains("professional")').not(':contains("Find")')
        .should("have.class", "border-primary")

      cy.get('input[placeholder="John"]').type("Jane")
      cy.get('input[placeholder="Smith"]').type("Smith")
      cy.get('input[placeholder="you@example.com"]').type(uniqueEmail)
      cy.get('input[placeholder="Min 8 characters"]').type("Test@1234")
      cy.get('button[type="submit"]').click()

      cy.location("pathname", { timeout: 30000 }).should("eq", "/dashboard")
    })
})