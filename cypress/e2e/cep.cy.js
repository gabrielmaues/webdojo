import addres from '../fixtures/cep.json'

describe('CEP', () => {
    beforeEach(() =>{
        cy.login()
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('Deve validar a consulta de CEP', ()=>{
       
        cy.intercept('GET',`https://viacep.com.br/ws/${addres.cep}/json/`, {
            statusCode: 200,
            body: {
                logradouro: addres.street,
                bairro: addres.neighborhood,
                localidade: addres.city,
                uf: addres.state
            }
        }).as('getCep')
        
        cy.get('#cep')
            .type(addres.cep)
        cy.contains('button','Buscar')
            .click()

        cy.wait('@getCep')
        
        cy.get('#street')
            .should('have.value',addres.street)

         cy.get('#neighborhood')
            .should('have.value',addres.neighborhood)

         cy.get('#city')
            .should('have.value',addres.city)

         cy.get('#state')
            .should('have.value',addres.state)

    })
})