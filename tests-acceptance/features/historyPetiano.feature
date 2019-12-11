Given eu estou logado como administrador do sistema, na página principal.
o livro "Construindo Software como Serviço (SaaS)", de ISBN "9780984881246", da edição "13", do autor "Armando Fox e David Patterson" e tópico "Engenharia de Software" está presente no acervo de livro
And o petiano “Anderson César” com email “anderson@pet.cin.ufpe.br” está cadastrado no sistema com a senha “789".
And o petiano com email “anderson@pet.cin.ufpe.br” com senha “789” pegou o livro “Construindo Software como Serviço (SaaS)” na data “20/11/2019” até “26/11/2019”
When eu seleciono a opção que me encaminha para a Página Acervo
And eu seleciono a opção que me encaminha para a Página do Histórico de Reservas do livro “Construindo Software como Serviço (SaaS)”
And eu coloco a data inicial “19/11/2019” e a data final “31/12/2019” 
Then eu consigo visualizar que o aluno "Anderson César" está na uma lista dos alunos que pegaram esse livro entre essas datas, na data “20/11/2019”.