/// <reference types="cypress" />

describe('Opening Example.com', () => {
  it("should load correct url in a reasonable amount of time", () => {
    cy.visit("https://www.example.com", { timeout: 10000 }) // timeout parameter is a time limit for the page to load
  })

  it("should check correct url", () => {
    cy.url().should('include', 'example.com') //cy.url()
  })

  it('should check for correct element on the page', () => {
    cy.get('h1').should('be.visible')
  })

  it('should figure out if the page contains certain text', () => {
    cy.contains('illustrative')
  })
})