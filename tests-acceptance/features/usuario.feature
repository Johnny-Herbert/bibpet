Feature: Como um usuario
         Eu quero ver se o livro está alugado
         Para que eu possa ou não possa alugá-lo

Scenario: Tela de Login verifica se é usuário ou administrador
Given I am at some "Login" page not logged
When I fill login as "PET-Admin" and password "admin"
And I see a warning telling that I’m now logged as "System Admin"
Then I am at "System Management" page

Scenario: Tela de Login verifica se é usuário ou administrador
Given I am at some "Login" page not logged
When I fill login as "vss2@pet.cin.ufpe.br" and password "012345689"
Then I am at "Home" page logged as "Vitor Sousa"

Scenario: Confirmar posse do livro na data prevista
Given I am at "Cracking the Code" page logged as "Vitor Sousa"
And I see the "Cracking the Code" details 
And The book status is "Disponível"
And I see a "Peguei o livro" option
When I check "Peguei o livro" option
Then The "Book status" is now "emprestado" by "Vitor Sousa"

Scenario: Confirmar devolução na data posterior
Given I am at "Cracking the Code" "Book" page logged as "Vitor Sousa"
And I see the "Cracking the Code" details 
And The book status is "emprestado"
And I see a "Devolver o livro" option
And The "Book devolution status" is "no prazo"
When I check "Devolver o livro" option
Then The "Book status" is now "disponível"
