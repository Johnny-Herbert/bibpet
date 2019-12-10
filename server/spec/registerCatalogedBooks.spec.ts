import { CatalogedBooks } from "../CatalogedBooks";
import { CatalogedBook } from '../../common/CatalogedBook';
import { Book } from "../../common/Book";
import { User } from "../../common/User";

describe("O cadastro de livros", () => {
    var register: CatalogedBooks;

    const bookRegister = (name: string, isbn: string, author: string, edition: string, type: string) => {
        var book: Book = new Book(1, name, isbn, author, edition, type);
        var user: User = new User("Cesar", "accs2@pet.cin.ufpe.br", "123");
        var catalogedBook: CatalogedBook = new CatalogedBook(user, book);
        return register.create(catalogedBook);
      }

    const bookUpdate = (id: number, name: string, isbn: string, author: string, edition: string, type: string) => {
      var book: Book = new Book(id, name, isbn, author, edition, type);
      var user: User = new User("Cesar", "accs2@pet.cin.ufpe.br", "123");
      var catalogedBook: CatalogedBook = new CatalogedBook(user, book);
      return register.update(catalogedBook);
    }

    const expectOnlyOneBook = () => {
      expect(register.catalogedBookList.length).toBe(1);
      var catalogedBook = register.catalogedBookList[0];
      return catalogedBook;
    }

    beforeEach(() => register = new CatalogedBooks());

    it("cadastra livros corretamente", () => {
        bookRegister("Introdução a algoritmos", "isbn", "Samuel Oliveira", "5", "Algoritimos");

        var catalogedBook = expectOnlyOneBook();
        expect(catalogedBook.book.name).toBe("Introdução a algoritmos");
        expect(catalogedBook.book.isbn).toBe("isbn");
        expect(catalogedBook.book.author).toBe("Samuel Oliveira");
        expect(catalogedBook.book.edition).toBe("5");
        expect(catalogedBook.book.type).toBe("Algoritimos");

    });

    it("buscar livro corretamente", () => {
      var newCatalogedBook = bookRegister("Introdução a algoritmos","isbn", "Samuel Oliveira", "5", "Algoritimos");
      register.readOnly(newCatalogedBook.book.id);
      var catalogedBook = expectOnlyOneBook();
      expect(catalogedBook.book.id).toBe(newCatalogedBook.book.id);
      expect(catalogedBook.book.name).toBe("Introdução a algoritmos");
      expect(catalogedBook.book.isbn).toBe("isbn");
      expect(catalogedBook.book.author).toBe("Samuel Oliveira");
      expect(catalogedBook.book.edition).toBe("5");
      expect(catalogedBook.book.type).toBe("Algoritimos");

    });

    it("atualizar livros corretamente", () => {
      var newCatalogedBook = bookRegister("Introdução a algoritmos","isbn", "Samuel Oliveira", "5", "Algoritimos");
      bookUpdate(newCatalogedBook.book.id, "Programação", "isbn", "Johnny Herbert", "5", "IP");

      var catalogedBook = expectOnlyOneBook();
      expect(catalogedBook.book.name).toBe("Programação");
      expect(catalogedBook.book.isbn).toBe("isbn");
      expect(catalogedBook.book.author).toBe("Johnny Herbert");
      expect(catalogedBook.book.edition).toBe("5");
      expect(catalogedBook.book.type).toBe("IP");

    });

    it("excluir livros corretamente", () => {
      var catalogedBook = bookRegister("Introdução a algoritmos", "isbn", "Samuel Oliveira", "3", "Algoritimos");
      register.delete(catalogedBook.book.id);
      expect(register.catalogedBookList.length).toBe(0);
    });

});
