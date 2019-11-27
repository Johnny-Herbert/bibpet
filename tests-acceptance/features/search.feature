Scenário: Pesquisa por nome com o livro cadastrado
	Given O petiano "Cesar" está logado no sistema com o email "cesar@pet.cin.ufpe.br" e a senha "cesar"
    And está na tela página acervo de livros
    And o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Algoritmos" está cadastrado no sistema
    And o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" está cadastrado no sistema
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Algoritmos" na lista de livros cadastrados
    And eu vejo o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" na lista de livros cadastrados
    When eu pesquiso pelo nome "Introdução a algoritmos"
    Then eu vejo na lista de livros o livro de nome "Introdução a algoritmos" de autor "Samuel Oliveira" e de tópico "Algoritmos"

Scenário: Pesquisa por nome com filtro de tópico com o livro cadastrado
	Given O petiano "Felipe" está logado no sistema com o email "felipe@pet.cin.ufpe.br" e a senha "felipe"
    And está na tela página acervo de livros
    And o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Algoritmos" está cadastrado no sistema
    And o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Pseudocódigo" está cadastrado no sistema
    And o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" está cadastrado no sistema
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Algoritmos" na lista de livros cadastrados
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Pseudocódigo" na lista de livros cadastrados
    And eu vejo o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" na lista de livros cadastrados
    When eu pesquiso pelo nome "Introdução a algoritmos" e pelo tópico "Algoritmos"
    Then eu vejo na lista de livros o livro de nome "Introdução a algoritmos" de autor "Samuel Oliveira" e de tópico "Algoritmos"

Scenário: Pesquisa por nome e por autor com o livro cadastrado
	Given O petiano "Roger" está logado no sistema com o email "roger@pet.cin.ufpe.br" e a senha "roger"
    And está na tela página acervo de livros
    And o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Algoritmos" está cadastrado no sistema
    And o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Pseudocódigo" está cadastrado no sistema
    And o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" está cadastrado no sistema
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Algoritmos" na lista de livros cadastrados
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Pseudocódigo" na lista de livros cadastrados
    And eu vejo o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" na lista de livros cadastrados
    When eu pesquiso pelo nome "Introdução a algoritmos" e pelo autor "Samuel Oliveira"
    Then eu vejo na lista de livros o livro de nome "Introdução a algoritmos" de autor "Samuel Oliveira" e de tópico "Algoritmos"

Scenário: Pesquisa por nome, por autor e por filtro com o livro cadastrado
	Given O petiano "Vitor" está logado no sistema com o email "vitor@pet.cin.ufpe.br" e a senha "vitor"
    And está na tela página acervo de livros
    And o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Algoritmos" está cadastrado no sistema
    And o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Pseudocódigo" está cadastrado no sistema
    And o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Pseudocódigo" está cadastrado no sistema
    And o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" está cadastrado no sistema
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Algoritmos" na lista de livros cadastrados
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Johnny Herbert" e de tópico "Pseudocódigo" na lista de livros cadastrados
    And eu vejo o livro de nome "Introdução a algoritmos", de autor "Samuel Oliveira" e de tópico "Pseudocódigo" na lista de livros cadastrados
    And eu vejo o livro de nome "Aprendendo a programar em C#", de autor "José Guilherme" e de tópico "Introdução a programação" na lista de livros cadastrados
    When eu pesquiso pelo nome "Introdução a algoritmos", pelo autor "Johnny Herbert" e pelo tópico "Pseudocódigo"
    Then eu vejo na lista de livros o livro de nome "Introdução a algoritmos" de autor "Johnny Herbert" e de tópico "Pseudocódigo"