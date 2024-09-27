import Adele from "../../support/POM.cy.js";

describe("e2e Task Scheduler-Cell tracing-Filtro location & Only Geo ",()=>{

    const master = new Adele
    
   

    

        before("Limpiar cookies & cache",()=>{
            cy.clearAllCookies()
            cy.clearAllLocalStorage()
        })

        it("Login",()=>{
            master.login()
        })

        it("Acceso a 'Task Scheduler'",()=>{
            cy.get('button[data-qa-action="menu_task_scheduler"]').click()          
        })


        it("Add task & cell tracing",()=>{
            cy.get('button[data-qa-action="add_task"]').should('be.visible').click()
            cy.contains('Cell Tracing').click().wait(3000)
        })

        it("Task name",()=>{
            cy.get('button[data-qa-action="continue_to_time_frame"]').click()
        })

        it("Select date & time",()=>{
            master.datetime()
        })

        it("Filtrar por Location", ()=>{
            master.selectLocation()
        })

        it("Añadir nodo & continue",()=>{
            master.addnode()
            cy.get('button[data-qa-action="continue_to_profile_settings"]').should('be.enabled').click()
        
        })

        it("Profile settings, only Geolocation Options",()=>{
            cy.get('label[for="onlyGeolocation"]').then($toogle=>{
                if($toogle.is(':checked')){
                    cy.wait(500)
                }else{
                    $toogle.click()
                }
            })
            cy.get('button[data-qa-action="continue_to_checkout"]').should('be.enabled').click()
        })

        it('Checkout, validacion',()=>{
            cy.get('div[data-qa-element-name="configuration_section"]').within(() => {
                cy.get('div.Checkout_title__tdGzP')
                  .should('contain', 'Time Frame')
                  
                cy.get('div[class="Checkout_column__zGcXr"]')
                  .should('contain', 'Only Geo')
                  
                  
            });
            cy.get('button[data-qa-action="create_task"]').should('be.enabled').click()

        })

        it('Task scheduler, validacion tarea creada',()=>{
            cy.wait(1000)
            cy.get('td[class="owner"]').first().should('have.text', 'Automated Tests')
            cy.screenshot()
        })




})
