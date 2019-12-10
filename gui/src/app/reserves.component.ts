 
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Reserve } from '../../../common/Reserve';
import { ReserveService } from './reserve.service';

@Component({
  selector: 'reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css']
})

 export class ReservesComponent implements OnInit {
    constructor(private reserveService: ReserveService) {}

    newEndDate: Date;
    activeReserves: Reserve[];
    inactiveReserves: Reserve[];

    removeReserve(reserve: Reserve): Reserve{
      for(var i = 0; i <  this.activeReserves.length; i++){
        var activeR = this.activeReserves[i];
        if(activeR.book.id === reserve.book.id && activeR.startDate.toString === reserve.startDate
          .toString && activeR.endDate.toString === reserve.endDate.toString){
            var reserveAux = this.activeReserves[i];
            this.activeReserves.splice(i,1);
            return reserveAux;
          }
      }
    };

    extendReserve(reserve: Reserve): void {
      this.removeReserve(reserve);
      reserve.endDate = this.newEndDate;
       this.reserveService.extendReserve(reserve).subscribe(
          ar => {
            if(ar){
              this.activeReserves.push(ar);
            }
          },
          msg => {alert(msg.message);}
       );
    }

    cancelReserve(reserve: Reserve): void{
      this.reserveService.cancelReserve(reserve).subscribe(
          ar => {
            this.removeReserve(ar);
          },
          msg => {alert(msg.message);}
      );
    }

    ngOnInit(): void {
      this.reserveService.getActiveReserves().subscribe(
          as => {this.activeReserves = as;},
          msg => {alert(msg.message);}
      );
      this.reserveService.getInactiveReserves().subscribe(
          as => {this.inactiveReserves = as;},
          msg => {alert(msg.message);}
      )
    }
  }