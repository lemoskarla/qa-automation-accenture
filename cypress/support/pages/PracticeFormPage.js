export class PracticeFormPage {
    visitar() {
        cy.visit('/automation-practice-form')
    }

    preencherFormulario(dados) {
        cy.get('#firstName').type(dados.firstName)
        cy.get('#lastName').type(dados.lastName)
        cy.get('#userEmail').type(dados.email)
        cy.contains('.custom-control-label', dados.gender).click()
        cy.get('#userNumber').type(dados.mobile)

        cy.get('#dateOfBirthInput').click()

cy.get('.react-datepicker__year-select').select('2025')
cy.get('.react-datepicker__month-select').select('June')

// Aguarda e seleciona o dia 3 (visível, fora do outro mês)
cy.contains('.react-datepicker__day', /^3$/)
  .not('.react-datepicker__day--outside-month')
  .should('be.visible')
  .click()


        cy.get('#subjectsInput').type(dados.subject).type('{enter}')

        dados.hobbies.forEach(hobby => {
            cy.contains('.custom-control-label', hobby).click()
        })

        cy.get('#uploadPicture').selectFile('cypress/fixtures/Desafio_Accenture.txt')
        cy.get('#currentAddress').type(dados.address)
        cy.get('#state').click().contains(dados.state).click()
        cy.get('#city').click().contains(dados.city).click()
    }

    submeter() {
        cy.get('#submit').click({ force: true })
    }

    validarPopup() {
        cy.get('#example-modal-sizes-title-lg')
            .should('be.visible')
            .and('contain', 'Thanks for submitting the form')
        cy.get('table').should('contain', 'Nora Bitter')
        cy.get('table').should('contain', 'norab@exemplo.com')
        cy.get('table').should('contain', 'Desafio_Accenture.txt')
    }

    fecharPopup() {
        cy.get('#closeLargeModal')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })
    }
}
