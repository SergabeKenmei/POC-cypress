// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/**
 * Action that selects an option in a primereaact/dropdown component
 * @param  {String} option option to select
 */
Cypress.Commands.add(
    'ReactSelectOption',
    { prevSubject: 'element' },
    (subject, option) => {
        cy.wrap(subject).children('div').last().as('dropdownButton')
        cy.wait(100)
        cy.get('@dropdownButton').scrollIntoView()
        cy.get('@dropdownButton').should('be.visible')
        cy.get('@dropdownButton').click({ force: true })
        cy.wait(150)
        cy.root()
            .find('.p-dropdown-items')
            .within(() => {
                cy.contains(option).click({ force: true })
            })
    },
)