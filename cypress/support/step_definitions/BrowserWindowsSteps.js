import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage'

const page = new BrowserWindowsPage()

Given('que estou na tela de Browser Windows', () => {
  page.acessar()
})

When('acesso a nova janela', () => {
  page.clicarEmNewWindow()
})


Then('a nova página deve conter a mensagem {string}', (mensagemEsperada) => {
  page.validarMensagemNaNovaPagina(mensagemEsperada)
})

