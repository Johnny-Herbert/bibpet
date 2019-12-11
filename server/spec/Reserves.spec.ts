import { Reserves } from "../Reserves";
import { Reserve } from "../../common/Reserve";
import { User} from "../../common/User";
import { Book} from "../../common/Book";

describe("filtro das reservas", () => {
    let reserves: Reserves

    beforeEach(() => { reserves = new Reserves() })
    
    it("filtrar por reservas ativas", () => {
        let user = new User("Guilherme","jgnvs@pet.cin.ufpe.br","1234");
        let book = new Book(1,"Cálculo - Volume 1","978-8522112586",
        "James Stewart",'7ª edition','Math');
        reserves.create( new Reserve(user,book,new Date(2019,11,11),
        new Date(2019,11,18),true));

        book = new Book(2,"Cálculo - Volume 2","978-8522112593",
        "James Stewart",'7ª edition','Math');

        reserves.create(new Reserve(user,book,new Date(2019,11,11),
        new Date(2019,11,18),true));

        user = new User("Samuel","som3@pet.cin.ufpe.br","1234");
        book = new Book(3,"Algoritmos: Teoria e Prática","978-8535236996",
        "Thomas Cormen",'3ª edition','programming')
        reserves.create(new Reserve(user,book,new Date(2019,11,11),
        new Date(2019,11,14),false));
        
        expect(reserves.logByEmail("jgnvs@pet.cin.ufpe.br").length).toBe(2);
    })

    it("filtrar reservas dentro do intervalo desejado", ()=> {
        let user = new User("Guilherme","jgnvs@pet.cin.ufpe.br","1234");
        let book = new Book(1,"Cálculo - Volume 1","978-8522112586",
        "James Stewart",'7ª edition','Math')
        reserves.create( new Reserve(user,book,new Date(2019,11,1),
        new Date(2019,11,10),true));

        book = new Book(1,"Cálculo - Volume 2","978-8522112593",
        "James Stewart",'7ª edition','Math')
        reserves.create(new Reserve(user,book,new Date(2019,11,11),
        new Date(2019,11,18),true))

        book = new Book(1,"Algoritmos: Teoria e Prática","978-8535236996",
        "Thomas Cormen",'3ª edition','programming')
        reserves.create(new Reserve(user,book,new Date(2019,11,17),
        new Date(2019,11,24),false))

        expect(reserves.logByDate(new Date(2019,11,10),new Date(2019,11,18)).length).toBe(1);
    })

})


