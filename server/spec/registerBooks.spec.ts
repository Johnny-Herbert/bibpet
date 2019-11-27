
describe("O cadastro de livros", () => {
    var register: CatalogedBooks;

    const bookRegister = (name: string, isbn: string, author: string, edition: string, type: string) => {
        var book: Book = new Book();
        book.name = name;
        book.isbn = isbn;
        book.author = author;
        book.edition = edition;
        book.type = type;
        register.create(book);
      }
      const bookUpdate = (id: number, name: string, isbn: string, author: string, edition: string, type: string) => {
        var book: Book = new Book();
        book.id = id;
        book.name = name;
        book.isbn = isbn;
        book.author = author;
        book.edition = edition;
        book.type = type;
        register.update(book);
      }

      const expectOnlyOneBook = () => {
        expect(register.catalogedBookList.length).toBe(1);
        var book = register.catalogedBookList.length[0];
        return book;
      }

      beforeEach(() => register = new CatalogedBooks());

      it("cadastra livros corretamente", () => {
          bookRegister("Introdução a algoritmos", "isbn", "Samuel Oliveira", "5", "Algoritimos");

          var book = expectOnlyOneBook();
          expect(book.name).toBe("Introdução a algoritmos");
          expect(book.isbn).toBe("isbn");
          expect(book.author).toBe("Samuel Oliveira");
          expect(book.edition).toBe("5");
          expect(book.type).toBe("Algoritimos");

      });

      it("atualizar livros corretamente", () => {
        var newBook = bookRegister("Introdução a algoritmos","isbn", "Samuel Oliveira", "5", "Algoritimos");
        bookUpdate(newBook.id, "Programação", "isbn", "Johnny Herbert", "5", "IP");

        var book = expectOnlyOneBook();
        expect(book.name).toBe("Programação");
        expect(book.isbn).toBe("isbn");
        expect(book.author).toBe("Johnny Herbert");
        expect(book.edition).toBe("5");
        expect(book.type).toBe("IP");

      });

      it("excluir livros corretamente", () => {
        var book = bookRegister("Introdução a algoritmos", "isbn", "Samuel Oliveira", "3", "Algoritimos");
        register.delete(book.id);
        expect(register.CatalogedBookList.length).toBe(0);
      
      });

});
