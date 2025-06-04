Feature: Validar nova janela do tipo browser window

  Scenario: Usuário clica no botão New Window e valida o conteúdo
    Given que estou na tela de Browser Windows
    When acesso a nova janela
    Then a nova página deve conter a mensagem "This is a sample page"

