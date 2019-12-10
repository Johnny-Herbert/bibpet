import { Reserve } from "../common/Reserve";

export class Reserves {
    reserves: Array<Reserve>;;

    private validateReserve(reserveToDo: Reserve,reserveDone: Reserve):boolean{
        if(reserveToDo.book.id === reserveDone.book.id && 
            reserveDone.active === true && this.verifyConflict(reserveToDo,reserveDone)){
            return true;
        }else{
            return false;
        }
    }
    private verifyConflict(reserveToDo: Reserve, reserveDone: Reserve):boolean{
        if((this.dateGreaterThan(reserveToDo.startDate,reserveDone.startDate) && 
                this.dateGreaterThan(reserveDone.endDate,reserveToDo.startDate)) ||
           (this.dateGreaterThan(reserveToDo.endDate,reserveDone.startDate) && 
                this.dateGreaterThan(reserveDone.endDate,reserveToDo.endDate))){
            return true;
        }else{
            return false;
        }
    }
    private dateGreaterThan(dateGrater: Date, dateThan: Date):boolean{
        if((dateGrater.getFullYear > dateThan.getFullYear) ||
           (dateGrater.getMonth > dateThan.getMonth) ||
           (dateGrater.getDay > dateThan.getDay)){
            return true;
        }else{
            return false;
        }
    }
    create(reserveToDo: Reserve):Array<Object>{
        var reserveConflicts = this.reserves.filter(reserve => this.verifyConflict(reserveToDo,reserve));
        var answer;
        if(reserveConflicts.length === 0){
            answer = [reserveToDo,"Success"];
            return answer;
        }else{
            answer = [reserveConflicts,"Failure"]
            return answer;
        }
    }
    read(id: number){}
    update(reserveToUp: Reserve,newReserve: Reserve){
        var toUpIndex = this.reserves.findIndex(reserve => reserve.equals(reserveToUp));
        if(toUpIndex !== -1 && this.validateReserve(newReserve)){
            this.reserves[toUpIndex] = newReserve;
            return "Sucess";
        }else{
            return "Failure";
        }
    }
    delete(reservetoDelete: Reserve){
        var toDeleteIndex = this.reserves.findIndex(reserve => reserve.equals(reservetoDelete));
        if(toDeleteIndex !== -1){
            this.reserves.splice(toDeleteIndex,1);
            return "Success";
        }else{
            return "Failure";
        }
    }
    log(){}
    logByDate(startDate: Date,endDate: Date){}
    logByEmail(email: String){}
    logByBook(id: number){}
    actives(id_user: number){}

}