import { Reserve } from "../common/Reserve";

export class Reserves {
    reserves: Array<Reserve>;;

    create(Reserve: Reserve){}
    read(id: number){}
    update(Reserve: Reserve){}
    delete(id: number){}
    log(){}
    logByDate(startDate: Date,endDate: Date){}
    logByEmail(email: String){}
    logByBook(id: number){}
    actives(id_user: number){}

}