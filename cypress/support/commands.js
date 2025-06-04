//Criação de usuário

Cypress.Commands.add('criarUsuario', (user) => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/User',
    body: user,
    failOnStatusCode: false 
  })
})

// Geração de token

Cypress.Commands.add('gerarToken', (user) => {
  return cy.request({
    method: 'POST',
    url: '/Account/v1/GenerateToken',
    body: user
  })
})

// Verifica se esta autorizado

Cypress.Commands.add('verificarAutorizacao', (user) => {
  return cy.request({
    method: 'POST',
    url: '/Account/v1/Authorized',
    body: user
  })
})

// Listando os livros
Cypress.Commands.add('listarLivros', () => {
  return cy.request({
    method: 'GET',
    url: '/BookStore/v1/Books'
  })
})




import { getUserId, getToken } from '../utils/tokenManager'

Cypress.Commands.add('alugarLivros', (isbns) => {
  return cy.request({
    method: 'POST',
    url: '/BookStore/v1/Books',
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: {
      userId: getUserId(),
      collectionOfIsbns: isbns
    }
  })
})



