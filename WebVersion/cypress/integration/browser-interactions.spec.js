/// <reference types="cypress" />

describe('Opening a webpage', () => {
  it("should load correct url", () => {
    cy.visit("https://www.google.com", { timeout: 10000 }) // timeout parameter is a time limit for the page to load
  })
})