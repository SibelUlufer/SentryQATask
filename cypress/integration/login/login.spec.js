/// <reference types= "cypress" />
import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('Land on login page', ()=>{
    cy.visit('/')
})
When('Enter not existed email', ()=>{
    cy.get('[name="email"]').clear().type(Cypress.env('email'))
})
And('Enter the valid format password', ()=>{
    cy.get('[name="password"]').clear().type(Cypress.env('password'))
})
Then('Click the login button', ()=>{
    cy.get('[type="submit"]').click()
    cy.request({
        method: 'POST',
        url:'https://api.sentryc.com/en/api/signin',
        failOnStatusCode: false ,
        body: { email: Cypress.env('email'),
                password: Cypress.env('password')} 
    }).then( (response) => {
        expect(response.status).to.eq(401) 
                     })
    
})
And('Should not login', ()=>{
    cy.get('[type="submit"]').should('be.disabled')
    cy.contains('[title="The password field is required."]', 'The password field is required.') 
})
When('Enter the invalid format email',()=>{
    cy.get('[name="email"]').type(Cypress.env('invalidEmail'))
})
And('Enter the invalid format password', ()=>{
    cy.get('[name="password"]').type(Cypress.env('invalidPassword')) 
    cy.get('.login-page').click()
})
And('See validation errors', ()=>{
    cy.contains('[title="The email format is invalid."]','The email format is invalid.' )
    cy.contains('[title="The password must be at least 8 characters."]', 'The password must be at least 8 characters.')
})
When('Click on Terms', ()=>{
    cy.get('[href="/terms"]').click()
})
Then('See Terms page and go back', ()=>{
    cy.url().should('include', '/terms')
    cy.contains('.main', 'Terms')
    cy.go(-1)
})
And('Click on Conditions', ()=>{
    cy.get('[href="/conditions"]').click()
})
Then('See Conditions and go back', ()=>{
    cy.url().should('include', '/conditions')
    cy.contains('.main', 'Conditions')
    cy.go(-1)
})


