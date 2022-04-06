/// <reference types= "cypress" />
import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given('Land on login page', ()=>{
    cy.visit('/')
})
When('Click on forgot password', ()=>{
    cy.get(':nth-child(4) > .base-text').click()
})
Then('Go to forgot password page', ()=>{
    cy.url().should('include','/forgot-password')
})
And('Enter the invalid format email', ()=>{
    cy.get('[name="email"]').type(Cypress.env('invalidEmail'))
    cy.get('.forgot-password-page').click()
})
Then('See validation error',()=>{
    cy.contains('[title="The email format is invalid."]', 'The email format is invalid.')
    cy.get('[type="submit"]').should('be.disabled')
})
And('Go back to login', ()=>{
    cy.get(':nth-child(4) > .base-text').click()
    cy.contains('.p-t-25', 'Hello!')
})
And('Enter not existed email',()=>{
    cy.get('[name="email"]').type(Cypress.env('email'))
})
And('Click the restore button', ()=>{
    cy.get('[type="submit"]').click()
    
})
Then('See failed api result',()=>{
    cy.request({
        method: 'POST',
        url:'https://api.sentryc.com/en/api/forgot-password',
        failOnStatusCode: false ,
        body: { email: Cypress.env('email')} 
    }).then( (response) => {
        expect(response.status).to.eq(422) 
        expect(response.body.validation.email).to.eq('This value is invalid.')
        })  
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