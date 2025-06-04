import { PracticeFormPage } from '../../support/pages/PracticeFormPage'

const formPage = new PracticeFormPage()

describe('Formulário DemoQA - Desafio Accenture', () => {
  it('Preenche o formulário, valida popup e fecha corretamente', () => {
    cy.fixture('usuario').then((dados) => {
      formPage.visitar()
      formPage.preencherFormulario(dados)
      formPage.submeter()
      formPage.validarPopup()
      formPage.fecharPopup()
      cy.log('Formulário automatizado com sucesso.')
    })
  })
})
