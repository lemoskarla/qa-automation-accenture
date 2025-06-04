Feature: Gerenciar registros na tabela da DemoQA

  Scenario: Criar, editar e deletar um registro
    Given que estou na tela Web Tables
    When adiciono um novo registro com os dados:
      | firstName | lastName | email              | age | salary | department |
      | Nora      | Bitter   | norab@exemplo.com  | 28  | 3500   | QA         |
    And edito o registro alterando o campo Salary para "4500"
    And deleto o registro pelo email "norab@exemplo.com"
    Then a tabela não deve conter mais o email "norab@exemplo.com"
