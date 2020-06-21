/// <reference types="cypress" />

describe('Opening Example.com and inspecting it', () => {
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

// describe('Implicit Waits, Pauses, Debugs', () => {
//   it('should wait for 3 seconds before moving onto next test', () => {
//     cy.wait(3000)
//   })

//   it('should pause the test-runner', () => {
//     cy.pause() // to resume, click on the Play/Resume button on the interface
//   })
// })

describe('Play with Buttons/Links', () => {
  it('should load the books website (good practice to start with this)', () => {
    cy.visit('http://books.toscrape.com/index.html', { timeout: 10000})
    cy.url().should('include', 'index.html') // verify you're on correct address, GOOD PRACTICE
  })

  it('should successfully click on a link (in this case Travel)', () => {
    cy.get('a')
      .contains('Travel')
      .click()
    cy.get('h1').contains('Travel')
    cy.url().should('include', 'travel')
  })

  it('should have the correct number of child components (in this case, search results', () => {
    cy.get('.product_pod').its('length').should('equal', 11)
  })
})

describe('PRACTICE (check the price of "Olio" is 23.88)', () => {
  it('should load the books website', () => {
    cy.visit('http://books.toscrape.com/index.html', { timeout: 10000})
    cy.url().should('include', 'index.html')
  })

  it('should successfully click on the Poetry section', () => {
    cy.get('a').contains('Poetry').click()
    cy.get('h1').contains('Poetry')
    cy.get('.product_pod').contains('Olio')
  })

  it('should successfully go to the Olio book', () => {
    cy.get('a').contains('Olio').click()
  })
  
  it('should show 23.88 for the Olio book\'s price', () => {
    cy.get('.price_color').should('include.text', 23.88.toString())
  })
})
