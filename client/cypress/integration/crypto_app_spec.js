describe("Crypto app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.wait(6000);
  });

  it("home page can be opened", () => {
    cy.contains("Current Top 10 Cryptocurrencies");
  });

  it("single crypto page can be viewed and exited", () => {
    cy.get(".home-table__link:first").click();
    cy.wait(5000);
    cy.contains("Whitepaper");
    cy.contains("go back").click();
    cy.contains("Current Top 10 Cryptocurrencies");
  });

  it("crypto can be liked (duplicate error thrown)", () => {
    cy.get(".btn-like:first").click();
  });

  it("cryptos sorted by likes", () => {
    cy.get("#rank").should("be.checked");
    cy.get("#likes").click();
    cy.get("#likes").should("be.checked");
  });

  it("next and prev buttons navigate through different sets of cryptos", () => {
    cy.get("button")
      .contains("prev 10")
      .should("be.disabled");
    cy.get(".home-table__cell:first").contains("1");
    cy.get("button")
      .contains("next 10")
      .click();
    cy.get(".home-table__cell:first").contains("11");
    cy.get("button")
      .contains("prev 10")
      .click();
    cy.get(".home-table__cell:first").contains("1");
    cy.get("button")
      .contains("prev 10")
      .should("be.disabled");
  });

  it("can search for cryptos", () => {
    cy.get(".search-box__input").type("dogecoin");
    cy.get(".home-table__link:first").contains("Dogecoin");
  });
});
