export class WebTablesPage {
  acessar() {
    cy.visit('/webtables')
  }

  abrirFormulario() {
    cy.get('#addNewRecordButton').click()
  }

  preencherFormulario(dados) {
    cy.get('#firstName').type(dados.firstName)
    cy.get('#lastName').type(dados.lastName)
    cy.get('#userEmail').type(dados.email)
    cy.get('#age').type(dados.age)
    cy.get('#salary').type(dados.salary)
    cy.get('#department').type(dados.department)
  }

  submeterFormulario() {
    cy.get('#submit').click()
  }

  editarRegistroPorEmail(email, novoSalario) {
    cy.contains('div.rt-td', email)
      .parent()
      .within(() => {
        cy.get('[title="Edit"]').click()
      })
    cy.get('#salary').clear().type(novoSalario)
    cy.get('#submit').click()
  }

  deletarRegistroPorEmail(email) {
    cy.contains('div.rt-td', email)
      .parent()
      .within(() => {
        cy.get('[title="Delete"]').click()
      })
  }

  validarRegistroRemovido(email) {
    cy.get('.rt-tbody').should('not.contain', email)
  }
}
