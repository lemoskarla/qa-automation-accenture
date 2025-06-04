import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { WebTablesPage } from '../pages/WebTablesPage'

const page = new WebTablesPage()

Given('que estou na tela Web Tables', () => {
  page.acessar()
})

When('adiciono um novo registro com os dados:', (dataTable) => {
  const [dados] = dataTable.hashes() // pega a primeira linha como objeto
  page.abrirFormulario()
  page.preencherFormulario(dados)
  page.submeterFormulario()
})


When('edito o registro alterando o campo Salary para {string}', (novoSalario) => {
  page.editarRegistroPorEmail('norab@exemplo.com', novoSalario)
})

When('deleto o registro pelo email {string}', (email) => {
  page.deletarRegistroPorEmail(email)
})

Then('a tabela não deve conter mais o email {string}', (email) => {
  page.validarRegistroRemovido(email)
})
