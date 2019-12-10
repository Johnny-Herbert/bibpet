import { Reserve } from "../common/Reserve";

export class Reserves {
    reserves: Array<Reserve>;;

    private validateReserve(reserve: Reserve):boolean{
        for(var i = 0; i < this.reserves.length; i++){
            if(reserve.book.id === this.reserves[i].book.id && 
                reserve.active === true && this.verifyConflict(reserve,this.reserves[i])){
                return true;
            }else{
                return false;
            }
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
    create(reserve: Reserve):Array<Object>{
        var reserveConflicts = this.reserves.filter(reserve => this.validateReserve(reserve));
        var answer;
        if(reserveConflicts.length === 0){
            answer = [reserve,"Success"];
            return answer;
        }else{
            answer = [reserveConflicts,"Failure"]
            return answer;
        }
    }
    read(id: number){}
    update(reserveToUp: Reserve,newReserv: Reserve){
        
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