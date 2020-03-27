describe('Testing our form', function(){
    beforeEach(function (){
        cy.visit('http://localhost:3001/form')
    })

    it ('Add test to some inputs and submit the form', function (){
        cy.get('input[name="name"]')
        .type('Dino Muratovic')
        .should('have.value', 'Dino Muratovic') 

        cy.get('select')
          .should('have.value', 'Small Pizza')  
          .select(['Small Pizza'])

          cy.get('[type="checkbox"]')
          .check()
          .should('be.checked')   

        cy.get('button').click();  
          
    })
} )