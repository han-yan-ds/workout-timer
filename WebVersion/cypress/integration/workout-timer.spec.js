/// <reference types="cypress" />

describe('Sample Test for ', ()=> {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  // it('works with Cypress basics', () => {
  //   expect(2).to.equal(2);
  // })

  it('has a heading that says CREATE WORKOUT', () => {
    cy.get("h3").contains("CREATE WORKOUT");
  })

  it('works with data-test attribute', () => {
    cy.get('[data-test="form-title"').contains("CREATE WORKOUT");
  })
  
})