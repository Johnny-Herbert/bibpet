import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Reserve } from '../../../common/Reserve';

@Injectable()
export class ReserveService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  cancelReserve(reserve: Reserve): Observable<Reserve> {
    return this.http.post<any>(this.taURL + "/reserve", reserve, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return reserve} else {return null;}} )
              ); 
  }

  extendReserve(reserve: Reserve): Observable<Reserve> {
    return this.http.put<any>(this.taURL + "/reserve",JSON.stringify(reserve), {headers: this.headers})
              .pipe( 
                retry(2),
                map( res => {if (res.success) {return reserve} else {return res.conflict}} )
              ); 
  }

  getActiveReserves(): Observable<Reserve[]> {
    return this.http.get<Reserve[]>(this.taURL + "/activeReserves")
              .pipe(
                 retry(2)
               );
  }

  getInactiveReserves(): Observable<Reserve[]> {
    return this.http.get<Reserve[]>(this.taURL + "/inactiveReserves")
              .pipe(
                 retry(2)
               );
  }

}