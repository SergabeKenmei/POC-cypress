Cypress.on('uncaught:exception', (err, runnable) => {return false;});
/// <reference types="cypress" />
const user = Cypress.env('user');
const pass = Cypress.env('pass');


describe("PoC Adele1",()=>{

    before("Limpiar cookies & cache",()=>{
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })

    it("Prueba1",()=>{
        cy.visit("/")
        cy.get('input[type="email"]').type(user)
        cy.get('input[type="password"]').type(pass)
        cy.get('button[name="submit"]').click()
        cy.title().should("eq","Overview - Adele")
        cy.get('.NotificationCookies_buttons__EyMkd > :nth-child(1) > [data-testid="button"]').click()
    })

    it("Prueba2",()=>{
        cy.contains("Call Traces").click().wait(5000)
        cy.get('button[class="Button_Button__ny3o7 ButtonUI_ButtonUI__sLNno ButtonOutlined_ButtonOutlined__W71rV mb-16"]').first().click({force:true})
        cy.get('label[for="Map 1_year_2023"]').click({force:true})
        //cy.get('div[class="ReactSelect-container "]').ReactSelectOption('January')


       
        cy.get('input[id="Map 1_month"]').type("January",{force:true}).type('{enter}') // Esta linea funciona
        cy.get('div[class="react-datepicker__month"]').contains('10').click({force:true})
        cy.get('button[data-qa-action="apply_filters"]').click({force:true})
        
    })


})