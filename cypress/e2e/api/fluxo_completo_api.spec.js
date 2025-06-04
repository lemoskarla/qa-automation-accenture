describe('Fluxo completo da API - Desafio Accenture', () => {
  it('Deve executar todo o processo de forma contínua', () => {
    cy.fixture('user').then((user) => {
      user.userName = `${user.userName}_${Date.now()}`

      cy.request('POST', '/Account/v1/User', user).then((resUser) => {
        expect(resUser.status).to.eq(201)
        const userId = resUser.body.userID
        cy.log(`Usuário criado: ${resUser.body.username} | ID: ${userId}`)

        cy.request('POST', '/Account/v1/GenerateToken', user).then((resToken) => {
          expect(resToken.status).to.eq(200)
          const token = resToken.body.token
          cy.log(`Token gerado com sucesso`)

          cy.request('POST', '/Account/v1/Authorized', user).then((resAuth) => {
            expect(resAuth.body).to.eq(true)
            cy.log(`Usuário autorizado com sucesso`)

            cy.request('GET', '/BookStore/v1/Books').then((resBooks) => {
              expect(resBooks.status).to.eq(200)
              const todosLivros = resBooks.body.books
              const livrosSelecionados = todosLivros.slice(0, 2).map(b => ({ isbn: b.isbn }))
              const nomesSelecionados = todosLivros
                .filter(b => livrosSelecionados.find(l => l.isbn === b.isbn))
                .map(b => b.title)

              cy.log(`Livros selecionados:`)
              nomesSelecionados.forEach((titulo, i) => {
                cy.log(`   ${i + 1}. ${titulo}`)
              })

              cy.request({
                method: 'POST',
                url: '/BookStore/v1/Books',
                headers: {
                  Authorization: `Bearer ${token}`
                },
                body: {
                  userId,
                  collectionOfIsbns: livrosSelecionados
                }
              }).then((resAluguel) => {
                expect(resAluguel.status).to.eq(201)
                cy.log(`Aluguel de livros efetuado`)

                cy.request({
                  method: 'GET',
                  url: `/Account/v1/User/${userId}`,
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then((resDetalhes) => {
                  expect(resDetalhes.status).to.eq(200)
                  expect(resDetalhes.body.books).to.have.length(2)

                  cy.log(`Validação final do usuário:`)
                  cy.log(`- Nome: ${resDetalhes.body.username}`)
                  cy.log(`- Livros cadastrados no perfil:`)
                  resDetalhes.body.books.forEach((livro, i) => {
                    cy.log(`  ${i + 1}. ISBN: ${livro.isbn}`)
                  })

                  cy.log('Fluxo completo finalizado com sucesso!')
                })
              })
            })
          })
        })
      })
    })
  })
})
