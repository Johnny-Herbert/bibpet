import { Comment } from '../../common/Comment';
import { Comments} from '../Comments';
import { CatalogedBook } from '../../common/CatalogedBook';
import { CatalogedBooks } from '../CatalogedBooks';
import { Book } from '../../common/Book'
import { User } from '../../common/User'
import { Users } from '../Users';

describe("O cadastro de comentários", () => {
  var comments : Comments;
  var catalogeds : CatalogedBooks;
  var users : Users;

  const userRegister = (name: string, email: string, password: string):User => {
      var user: User = new User(name, email, password);
      return users.create(user);
  }

  const bookRegister = (name: string, isbn: string, author: string, edition: string, type: string):CatalogedBook => {
    var book: Book = new Book(1, name, isbn, author, edition, type);
    var user: User = new User("Cesar", "accs2@pet.cin.ufpe.br", "123");
    var catalogedBook: CatalogedBook = new CatalogedBook(user, book);
    return catalogeds.create(catalogedBook);
  }

  const commentRegister = (catalogedBook:CatalogedBook, id:number, text: string, user: User):Comment => {
      var cBook : CatalogedBook = catalogeds.catalogedBookList.find(a => a.book.id === catalogedBook.book.id);
      var comment : Comment = new Comment(id,text,user);
      cBook.book.commentsLists.commentList.push(comment);
      return comments.create(comment);
  }

  const commentBook = (text: string):Comment => {
      var user = userRegister("Samuel", "som3@pet.ufpe.br", "451452sam")
      var catalogedBook = bookRegister("Metodologia ágil", "12524151254", "Patterson", "7", "Engenharia de software");
      return commentRegister(catalogedBook,1,text, user);
  }

  beforeEach(() => comments = new Comments())

  it("é inicialmente vazio", () => {
      expect(comments.read().length).toBe(0);
  })

  it("insere comentários corretamente", () => {
      commentBook("Ameiii o livro gente!")
      
      expect(comments.read().length).toBe(1);
      var commented = comments.read()[0];
      expect(commented.id).toBe(1);
      expect(commented.text).toBe("Amei o livroo");
      expect(commented.user.name).toBe("Samuel");
      expect(commented.user.email).toBe("som3@pet.ufpe.br");

  })

  it("atualiza comentários corretamente", () => {
      var comment = commentBook("Ameiii o livro gente!");
      comment.text = "Talvez não amei tanto assim";
      comments.update(comment)

      expect(comments.read().length).toBe(1);
      var commented = comments.read()[0];
      expect(commented.id).toBe(1);
      expect(commented.text).toBe("Talvez não amei tanto assim");
      expect(commented.user.name).toBe("Samuel");
      expect(commented.user.email).toBe("som3@pet.ufpe.br");

  })

  it("Remove comentários corretamente", () => {
    var comment = commentBook("O livro era muito incompleto! Falta questões.");
    expect(comments.read().length).toBe(1);
    comments.delete(comment.id);

    expect(comments.read().length).toBe(0);
  })
  })