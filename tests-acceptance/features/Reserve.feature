Scenario: Reserva para data disponível (Sucesso).
		Given: O petiano "César Silva", com a senha "Pão_Com_Ovo" e email "accs2@cin.ufpe.br" esta logado no sistema.
		AND: O livro “Cracking the Coding Interview” esta catalogado, seu tema e “Algoritmos”, seu isbn e "123a4", seu autor e "Marcelo", sua edicao e "Segunda".
		AND: Estou na página “Acervo de Livros”.
		AND: Não há nenhuma reserva no sistema para o livro “Cracking the Coding Interview” de isbn “123a4” no intervalo de “25/08/2019” até “01/09/2019”.
		WHEN: Eu solicito a reserva do livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019”.
		THEN: Eu recebo uma mensagem de confirmação de reserva.
		AND:  Há uma  reserva no sistema para o livro “Cracking the Coding Interview” de id “001” no intervalo de “25/08/2019” até “01/09/2019” em nome de “César Silva”.

//
Scenario: Reserva com intervalo de datas superiores ao limite do livro (Falha).
		Given: “César” é um petiano cadastrado no sistema com a senha
 “Pão_Com_Ovo”.
		AND: O livro “Cracking the Coding Interview” está cadastrado
			com o tempo máximo de reserva sendo “7 dias”, seu dono
Sendo “Luan”, seu tema sendo “Algoritmos” e seu id sendo 
“001”.
		AND: Não há nenhuma reserva no sistema para o livro
“Cracking the Coding Interview” de id “001” no intervalo de
“25/08/2019” até “01/09/2019”.
		AND: Estou na página “Reserva 001”.
		AND: Estou logado como “César”
		WHEN: Eu solicito a reserva do livro “Cracking the Coding Interview”
			  de id “001” no intervalo de “25/08/2019” até “03/09/2019”.
		THEN: Eu recebo uma mensagem de erro avisando que o livro
“Cracking the Coding Interview” de id “001” possui um tempo
Máximo de reserva de “7 dias”.
		AND:  Não há uma reserva no sistema para o livro
“Cracking the Coding Interview” de id “001” no intervalo de
“25/08/2019” até “03/09/2019”.

Scenario: Cancelar reserva.
		Given: “César” é um petiano cadastrado no sistema com a senha
 “Pão_Com_Ovo”
		AND: Há uma reserva no sistema para o livro “Cracking the 
Coding Interview” de id “001” no intervalo de “25/08/2019”
Até “01/09/2019 em nome de “César”.
		AND: Estou na página “Minhas Reservas”.
		AND: Estou logado como “César”
		WHEN: Eu solicito o cancelamento da reserva do livro “Cracking the 
			 Coding Interview” de id “001” no intervalo de “25/08/2019” até
			 “01/09/2019”.
		THEN: Eu recebo uma mensagem confirmando o cancelamento.
		AND:  Não há nenhuma reserva no sistema para o livro
“Cracking the Coding Interview” de id “001” no intervalo de
“25/08/2019” até “01/09/2019”.

Scenario: Estender reserva.
		Given: “César” é um petiano cadastrado no sistema com a senha
 “Pão_Com_Ovo”
		AND: Há uma reserva no sistema para o livro “Cracking the 
Coding Interview” de id “001” no intervalo de “25/08/2019”
Até “01/09/2019 em nome de “César”.
AND: Não há nenhuma reserva no sistema para o livro “Cracking the 
Coding Interview” de id “001” no intervalo de “02/08/2019”
Até “05/09/2019 em nome de “César”.
		AND: Estou na página “Minhas Reservas”.
		AND: Estou logado como “César”
		WHEN: Eu solicito a extensão da reserva do livro “Cracking the 
			 Coding Interview” de id “001” no intervalo de “25/08/2019” até
			 “05/09/2019”.
		THEN: Eu recebo uma mensagem confirmando a extensão.
		AND:  Há uma reserva no sistema para o livro
“Cracking the Coding Interview” de id “001” no intervalo de
“25/08/2019” até “05/09/2019” em nome de “César”.
