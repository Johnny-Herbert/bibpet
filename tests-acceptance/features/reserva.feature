Feature: As a usuario.
         I want to realizar reservas
         So that I can gerenciar minhas reservas

Scenario: Reserva para data disponível (Sucesso).
Given: "César" e um petiano cadastrado no sistema com a senha "Pão_Com_Ovo".
AND: O livro "Cracking the Coding Interview" esta cadastrado com o tempo máximo de reserva sendo "7 dias", seu dono Sendo "Luan", seu tema sendo "Algoritmos" e seu id sendo "001".
AND: Nao ha nenhuma reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no intervalo de "25/08/2019" até "01/09/2019".
AND: Estou na página do livro de id "001".
AND: Estou logado como "César"
WHEN: Eu solicito a reserva do livro no intervalo de "25/08/2019" até "01/09/2019".
THEN: Eu recebo uma mensagem de confirmação de reserva.
AND: Há uma  reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no intervalo de "25/08/2019" até "01/09/2019" em nome de "César".

Scenario: Reserva com intervalo de datas superiores ao limite do livro (Falha).
Given: "César" é um petiano cadastrado no sistema com a senha "Pão_Com_Ovo".
AND: O livro "Cracking the Coding Interview" está cadastrado no sistema com o tempo máximo de reserva sendo "7" dias, seu dono Sendo "Luan", seu tema sendo "Algoritmos" e seu id sendo "001".
AND: Não há nenhuma reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no periodo de "25/08/2019" até "01/09/2019".
AND: Estou na página do livro com id "001".
AND: Estou logado como "César"
WHEN: Eu reservo o livro "Cracking the Coding Interview" de id "001" no intervalo de "25/08/2019" até "03/09/2019".
THEN: Eu recebo uma mensagem de erro avisando que o livro "Cracking the Coding Interview" de id "001" possui um tempo Máximo de reserva de "7 dias".
AND: Não há uma reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no intervalo de "25/08/2019" até "03/09/2019".

Scenario: Cancelar reserva.
Given: "César" é um petiano cadastrado no sistema com a senha "Pão_Com_Ovo"
AND: Há uma reserva no sistema para o livro "Cracking the Coding Interview" de id "001"no intervalo de "25/08/2019" Até "01/09/2019 em nome de "César".
AND: Estou na página "Minhas Reservas".
AND: Estou logado como "César"
WHEN: Eu solicito o cancelamento da reserva do livro de id "001".
THEN: Eu recebo uma mensagem confirmando o cancelamento.
AND: Não há nenhuma reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no intervalo de "25/08/2019" até "01/09/2019".

Scenario: Estender reserva.
Given: "César" é um petiano cadastrado no sistema com a senha "Pão_Com_Ovo"
AND: Há uma reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no intervalo de "25/08/2019" Até "01/09/2019 em nome de "César".
AND: Não há nenhuma reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no intervalo de "02/08/2019" Até "05/09/2019 em nome de "César".
AND: Estou na página "Minhas Reservas".
AND: Estou logado como "César"
WHEN: Eu solicito a extensão da reserva do livro de id "001" no intervalo de "25/08/2019" até "05/09/2019".
THEN: Eu recebo uma mensagem confirmando a extensão.
AND: Há uma reserva no sistema para o livro "Cracking the Coding Interview" de id "001" no intervalo de "25/08/2019" até "05/09/2019" em nome de "César".
