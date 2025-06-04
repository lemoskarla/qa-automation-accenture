export class BrowserWindowsPage {
  acessar() {
    cy.visit('/browser-windows')
  }

 clicarEmNewWindow() {
  cy.visit('/sample')
}

  

  validarMensagemNaNovaPagina(msg) {
    cy.get('h1').should('have.text', msg)
  }
}
