import { typeWithDelay } from "../support/functions.js";
import { getYesterdayFormatted } from "../support/functions.js";

class Adele{

     

    login(){
        cy.visit('/')
        cy.get('input[type="email"]').type(Cypress.env('user'))
        cy.get('input[type="password"]').type(Cypress.env('pass'))
        cy.get('button[name="submit"]').click({force:true})
        cy.title().should("eq","Overview - Adele").wait(500)
        cy.get('.NotificationCookies_buttons__EyMkd > :nth-child(1) > [data-testid="button"]').click()
    }

    fecha10123(){
        cy.get('button[class="Button_Button__ny3o7 ButtonUI_ButtonUI__sLNno ButtonOutlined_ButtonOutlined__W71rV mb-16"]').first().click({force:true})
        cy.get('label[for="Map 1_year_2023"]').click({force:true})      
        cy.get('input[id="Map 1_month"]').type("January",{force:true}).type('{enter}') 
        cy.get('div[class="react-datepicker__month"]').contains('10').click({force:true})
    }

    datetime(){
        const formattedDate = getYesterdayFormatted();

        cy.log(formattedDate)
        // Usa el selector dinámico basado en la fecha formateada
        cy.get(`div[aria-label="${formattedDate}"]`).scrollIntoView().click({ force: true });
        cy.get('select[data-qa-action="input_dtart_hour_0"]').select('12').should('have.value', '12')
        cy.get('button[data-qa-action="continue_to_network_scope"]').should('be.enabled').click()
    }
    
    selectLocation(){
        cy.get('input[id="networkscope_search_type"]').type('Location',{force:true}).type('{enter}').wait(1000)                      
        cy.get('input[id="searchValue"]').then($input => {
            const typeDelayed = typeWithDelay('input[id="searchValue"]', Cypress.env('Location'), 500,2000);     // 4 Parametros: Selector, Texto, Delay, Post Type Wait 
            typeDelayed($input);
        })
    }

    selectNode(){
        
    }

    addnode(){
        cy.get('div[class="NodeItem_NodeItem__t2ur2  "]').each($el => {
            cy.wrap($el)
              .should('be.visible')                                                              // Verifica que el elemento es visible
              .click();                                                                          // Luego, hace clic en el elemento
        });
    }

    fechaDataRange(){
        cy.get('.react-datepicker__year-read-view--down-arrow').click()
        cy.contains('2023').click({force: true})
        cy.get('.react-datepicker__month-read-view--down-arrow').click()
        cy.contains('January').click({force: true})
        cy.get('div[class="react-datepicker__day react-datepicker__day--010"]').should('have.text','10').click()  
    }

    max5decimales(locator){
        const decimalRegex = /^-?\d+(\.\d{1,5})?$/;
        cy.get(locator)  // Elegir selector
            .each(($cell) => {            // Itera sobre cada celda
                cy.wrap($cell)              
                    .invoke('text')           // Obtiene el texto de la celda
                    .then((value) => {
                        // Limpia espacios en blanco alrededor del valor
                        const cleanedValue = value.trim();

                        if (cleanedValue === '-') {
                            // Si el valor es un guion, lo consideramos válido y lo registramos
                            cy.log('Valor de celda: Guion ("-"), válido.');
                          } else if (cleanedValue) {
                            // Si el valor no está vacío, validar que sea un número con hasta 15 decimales
                            expect(cleanedValue).to.match(decimalRegex);
                            //cy.screenshot(cleanedValue)
                          } else {
                            // Opcionalmente manejar valores vacíos si es necesario
                            cy.log('Celda vacía');
                          }
                    });
            });
    }

    ToogleEdrOptions(){
        cy.get('label[class="ToggleButton_ToggleButton__sQsVi "]').first().click()
            // cy.get('div[class="ProfileSettings_generalSubCheck__cokdf"]').each($el=>{
            //     cy.wrap($el)
            //      .should('be.enabled')                                                               // Verifica que el elemento es visible  
            // })

            cy.get('span[data-qa-action="option_process_ue_capabilities"]').click()
            cy.get('button[data-qa-action="continue_to_checkout"]').should('be.enabled').click()
    }
    

}

export default Adele;