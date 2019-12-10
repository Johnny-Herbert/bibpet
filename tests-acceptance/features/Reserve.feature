Feature: Reservas de Livros
		I Whant: Criar e gerenciar minhas reservas.
		So That: Eu consigo solicitar a reserva de livros disponiveis e cancelar/estender essa reserva.

Scenario: Reserva para data disponível (Sucesso).
		Given: O petiano "César Silva", com a senha "Pão_Com_Ovo" e email "accs2@cin.ufpe.br" esta logado no sistema.
		AND: O livro “Cracking the Coding Interview” esta catalogado, seu tema e “Algoritmos”, seu isbn e "123a4", seu autor e "Marcelo", sua edicao e "Segunda".
		AND: Estou na página “Página Acervo de Livros”.
		AND: Não há nenhuma reserva no sistema para o livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019”.
		WHEN: Eu solicito a reserva do livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019”.
		THEN: Eu recebo uma mensagem de confirmação de reserva.
		AND:  Há uma  reserva no sistema para o livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019” em nome de “César Silva”.

Scenario: Cancelar reserva.
		Given: O petiano "César Silva", com a senha "Pão_Com_Ovo" e email "accs2@cin.ufpe.br" esta logado no sistema.
		AND: Há uma  reserva no sistema para o livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019” em nome de “César Silva”.
		AND: Estou na página “Página Reservas”.
		WHEN: Eu solicito o cancelamento da reserva do livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019”.
		THEN: Eu recebo uma mensagem confirmando o cancelamento.
		AND:  Não há nenhuma reserva no sistema para o livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019”.

Scenario: Estender reserva.
		Given: O petiano "César Silva", com a senha "Pão_Com_Ovo" e email "accs2@cin.ufpe.br" esta logado no sistema.
		AND: Há uma reserva no sistema para o livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019” em nome de “César Silva”.
		AND: Não há nenhuma reserva no sistema para o livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “05/09/2019”.
		AND: Estou na página “Página Reservas”.
		WHEN: Eu solicito a extenção da reserva do livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “05/09/2019”.
		THEN: Eu recebo uma mensagem confirmando a extensão.
		AND:  Há uma  reserva no sistema para o livro “Cracking the Coding Interview” no intervalo de “25/08/2019” até “01/09/2019” em nome de “César Silva”.
