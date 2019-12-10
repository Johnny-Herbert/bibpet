import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservesComponent } from './reserves.component';
import {ReserveService} from './reserve.service';

@NgModule({
  declarations: [
    AppComponent,
    ReservesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'reserves',
        component: ReservesComponent
      }
      //New Paths Here
    ])
  ],
  providers: [ReserveService],
  bootstrap: [AppComponent]
})
export class AppModule { }