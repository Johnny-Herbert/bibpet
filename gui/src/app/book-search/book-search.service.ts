import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { CatalogedBook } from '../../../../common/CatalogedBook';

@Injectable()
export class CatalogedBookService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  read(): Observable<Array<CatalogedBook>> {
    return this.http.get<Array<CatalogedBook>>(this.URL + "/catalogedBooks")
              .pipe(
                 retry(2)
               );
  }

  delete(id: number): Observable<CatalogedBook> {
    return this.http.delete<any>(this.URL + `/catalogedBook/${id}`, {headers: this.headers})
              .pipe(
                 retry(2),
               );
  }

  search(name: string, author: string, type: string): Observable<Array<CatalogedBook>> {
    var param = {
        "name": name,
        "author": author,
        "type": type
    }
    return this.http.get<Array<CatalogedBook>>(this.URL + "/filterCatalogedBooks", { params: param })
        .pipe(
            retry(2)
        );
  }
}