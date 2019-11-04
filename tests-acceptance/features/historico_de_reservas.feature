Given eu estou logado como administrador do sistema, na página principal.
And o livro "Construindo Software como Serviço (SaaS)" do autor "Armando Fox e David Patterson" com tópico "Engenharia de Software" está cadastrado no sistema
And o petiano(a) “Anderson César” de cpf "1234” com email “anderson@pet.cin.ufpe.br” está cadastrado(a) no sistema com a senha “123".
And o petiano com email “anderson@pet.cin.ufpe.br” com senha “123” pegou o livro “Construindo Software como Serviço (SaaS)” na data “20/11/2019” até “26/11/2019”.
When eu seleciono a opção que me encaminha para a Página Acervo.
And eu seleciono a opção que me encaminha para a Página do Histórico de Reservas do livro “Construindo Software como Serviço (SaaS)”
And eu coloco a data inicial “19/11/2019” e a data final “31/12/2019” 
Then eu consigo visualizar que o aluno "Anderson César" está na uma lista dos alunos que pegaram esse livro entre essas datas, na data “20/11/2019”.