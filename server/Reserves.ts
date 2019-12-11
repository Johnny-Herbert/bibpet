import { Reserve } from "../common/Reserve";

export class Reserves {
    private reserves:Reserve[] = [];

    private validateReserve(reserveToDo: Reserve,reserveDone: Reserve):boolean{
        if(reserveToDo.book.id === reserveDone.book.id && 
            reserveDone.active === true && (this.verifyConflict(reserveToDo,reserveDone) ||
            this.verifyConflict(reserveDone,reserveToDo))){
                console.log("Validate True");
                return true;
        }else{
            console.log("Validate False");
            return false;
        }
    }
    private verifyConflict(reserveToDo: Reserve, reserveDone: Reserve):boolean{
        if((this.dateGreaterThan(reserveToDo.startDate,reserveDone.startDate) &&
                this.dateGreaterThan(reserveDone.endDate,reserveToDo.startDate)) ||
           (this.dateGreaterThan(reserveToDo.endDate,reserveDone.startDate) && 
                this.dateGreaterThan(reserveDone.endDate,reserveToDo.endDate))){
                    console.log("Verify True");
                    return true;
        }else{
            console.log("Verify False");
            return false;
        }
    }
    private dateGreaterThan(dateGrater: String, dateThan: String):boolean{
        console.log(dateGrater);
        console.log(dateThan);
        var arrayDateGrater = dateGrater.split('/');
        var arrayDateThan = dateThan.split('/');
        if((arrayDateGrater[2] > arrayDateThan[2]) ||
           (arrayDateGrater[1] > arrayDateThan[1]) ||
           (arrayDateGrater[0] > arrayDateThan[0])){
            console.log("Date True");
            return true;
        }else{
            console.log("Date False");
            return false;
        }
    }
    private sameReserve(reserve1:Reserve,reserve2:Reserve){
        if(reserve1.book.id === reserve2.book.id && reserve1.startDate === reserve2.startDate &&
            reserve1.user.email === reserve2.user.email){
            return true;
        }else{
            return false;
        }
    }

    
    create(reserveToDo: Reserve):Object{
        var reserveConflicts = this.reserves.filter(reserve => (this.validateReserve(reserveToDo,reserve)));
        var answer;
        if(reserveConflicts.length === 0){
            this.reserves.push(reserveToDo);
            console.log("Create");
            console.log(this.reserves);
            answer = [reserveToDo,"Success"];
            return answer;
        }else{
            answer = [reserveConflicts,"Failure"]
            return answer;
        }
    }
    read(id: number){}
    update(newReserve: Reserve):Object{
        var toUpIndex = this.reserves.findIndex(reserve => this.sameReserve(newReserve,reserve));
        var newReserveConflicts = this.reserves.filter(reserve => this.validateReserve(newReserve,reserve));
        var answer;
        if(toUpIndex !== -1 && newReserveConflicts.length <= 1){
            this.reserves[toUpIndex] = newReserve;
            answer = [newReserve,"Success"];
            console.log("Update");
            console.log(this.reserves);
            return answer;
        }else{
            answer = [newReserveConflicts,"Failure"];
            return answer;
        }
    }
    delete(reservetoDelete: Reserve): String{
        var toDeleteIndex = this.reserves.findIndex(reserve => this.sameReserve(reservetoDelete,reserve));
        if(toDeleteIndex !== -1){
            this.reserves[toDeleteIndex].active = false;
            console.log("Delete");
            console.log(this.reserves);
            return "Success";
        }else{
            return "Failure";
        }
    }
    log(){}
    logByDate(startDate: Date,endDate: Date){}
    logByEmail(email: String){}
    logByBook(id: number){}
    actives(email: String):Array<Reserve>{
        email = email.substring(10,email.length-2);
        console.log(email);
        var activeReserves = this.reserves.filter(reserve => (reserve.active && reserve.user.email == email));
        console.log(activeReserves);
        return activeReserves;
    }
    inactives(email: String):Array<Reserve>{
        email = email.substring(10,email.length-2);
        console.log(email);
        var inactiveReserves = this.reserves.filter(reserve => (!reserve.active && reserve.user.email == email));
        console.log(inactiveReserves);
        return inactiveReserves;
    }

}