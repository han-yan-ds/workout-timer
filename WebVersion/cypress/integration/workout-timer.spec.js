/// <reference types="cypress" />

describe('Sample Test for ', ()=> {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  // it('works with Cypress basics', () => {
  //   expect(2).to.equal(2);
  // })

  // it('has a heading that says CREATE WORKOUT', () => {
  //   cy.get("h3").contains("CREATE WORKOUT");
  // })

  it('works with data-test attribute', () => {
    cy.get('[data-test="form-title"').contains("CREATE WORKOUT");
  })

  it('works with does-not-contain', () => {
    cy.get('[data-test="doesn\'t exist"]').should('not.exist');
  })

  it('works with 1) type in input, 2) clicking, 3) visible/not visible', () => {
    cy.get('[data-test="form-title"').should('be.visible');
    cy.get('[data-test="exercise-input-0"]').type("Tricep Pullovers");
    cy.get('[data-test="start-workout-button"]').click();
    cy.get('[data-test="form-title"').should('not.be.visible');
  })

})