Feature: Como um usuario
         Eu quero ver se o livro está alugado
         Para que eu possa ou não possa alugá-lo

Scenario: Tela de Login verifica se é usuário ou administrador
Given I am at some “Login” page not logged
When I fill login as “PET-Admin” and password “admin”
And I see a warning telling that I’m now logged as “System Admin”
Then I am at “System Management” page
