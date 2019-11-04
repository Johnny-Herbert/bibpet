describe("O cadastro de livros", () => {
    var cadastro: CadastroDeLivros;

    const cadastraLivro = (nome:string, autor:string, topico:string) => {
        var livro: Livro = new Livro();
        livro.nome = nome;
        livro.autor = autor;
        livro.topico = topico;
        cadastro.cadastrar(livro);
      }
      const atualizaLivro = (nome:string, autor:string, topico:string) => {
        var livro: Livro = new Livro();
        livro.nome = nome;
        livro.autor = autor;
        livro.topico = topico;
        cadastro.atualizar(livro);
      }

      const expectSoUmLivro = () => {
        expect(cadastro.getLivros().length).toBe(1);
        var livro = cadastro.getLivros()[0];
        return livro;
      }

      beforeEach(() => cadastro = new CadastroDeLivros());

      it("cadastra livros corretamente", () => {
          cadastraLivro("Introdução a algoritmos", "Samuel Oliveira", "Algoritimos");

          var livro = expectSoUmLivro();
          expect(livro.nome).toBe("Introdução a algoritmos");
          expect(livro.autor).toBe("Samuel Oliveira");
          expect(livro.topico).toBe("Algoritimos");

      });

      it("atualizar livros corretamente", () => {
        cadastraLivro("Introdução a algoritmos", "Samuel Oliveira", "Algoritimos");
        atualizaLivro("Programação", "Johnny Herbert", "IP");

        var livro = expectSoUmLivro();
        expect(livro.nome).toBe("Programação");
        expect(livro.autor).toBe("Johnny Herbert");
        expect(livro.topico).toBe("IP");

      });

      it("excluir livros corretamente", () => {
        cadastraLivro("Introdução a algoritmos", "Samuel Oliveira", "Algoritimos");
        cadastro.excluir("Introdução a algoritmos");
        expect(cadastro.getLivros().length).toBe(0);
      
      });

});