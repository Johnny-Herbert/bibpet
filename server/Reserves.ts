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
    create(reserveToDo: Reserve):Object{
        var reserveConflicts = this.reserves.filter(reserve => this.validateReserve(reserveToDo,reserve));
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
    update(reserveToUp: Reserve,newReserve: Reserve):Object{
        var toUpIndex = this.reserves.findIndex(reserve => reserve.equals(reserveToUp));
        var newReserveConflicts = this.reserves.filter(reserve => this.validateReserve(newReserve,reserve));
        var answer;
        if(toUpIndex !== -1 && newReserveConflicts.length <= 1){
            this.reserves[toUpIndex] = newReserve;
            answer = [newReserve,"Success"];
            return answer;
        }else{
            answer = [newReserveConflicts,"Failure"];
            return answer;
        }
    }
    delete(reservetoDelete: Reserve): String{
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
    actives(id_user: String):Array<Reserve>{
        var activeReserves = this.reserves.filter(reserve => (reserve.user.email === id_user && reserve.active));
        return activeReserves;
    }
    inactives(id_user: String):Array<Reserve>{
        var inactiveReserves = this.reserves.filter(reserve => (reserve.user.email === id_user && !reserve.active));
        return inactiveReserves;
    }

}