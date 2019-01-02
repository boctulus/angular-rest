import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pruebas';
  // http://localhost/SimpleRestFul/api/products
  private base_url = 'http://localhost/SimpleRestFul/api/products';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    sessionStorage.setItem('tokenJwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDY0NTEzNzAsImV4cCI6MTU0Njc1MTM3MCwiZGF0YSI6eyJpZCI6IjQiLCJ1c2VybmFtZSI6InBib3p6b2xvIn19.gRIKtW9f3c2CNcwIRfqSZRqmjwtjonxPNTep4OSXsR4');

    // this.onList();
    this.onGet(67);
    // this.onDelete(64);
    // this.onCreate({ "name": "Vodka", "description": "from Russia", "size": "1L", "cost": 250 });
    // this.onUpdate(61, { "name": "Juice!", "description": "Delicious!!!!!", "size": "1L", "cost": 35 });
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeaders(): object {
    const header: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json; charset=UTF-8')
        .append('Authorization', 'Bearer ' + sessionStorage.getItem('tokenJwt'));
    const httpOptions = {
        headers: header
    };
    return httpOptions;
  }

  onGet (id) {
    return this.http.get(this.base_url + '/' + id.toString(), this.getHeaders())
    .pipe(
      catchError(this.handleError('get one', []))
    )
   .subscribe((response) => {
     console.log(response);
   });
  }

  onList () {
    return this.http.get(this.base_url, this.getHeaders())
    .pipe(
      catchError(this.handleError('get list', []))
    )
   .subscribe((response) => {
     console.log(response);
   });
  }

  onDelete (id) {
    return this.http.delete<any>(this.base_url + '/' + id.toString(), this.getHeaders())
    .pipe(
      catchError(this.handleError('delete', []))
    )
    .subscribe((response) => {
      console.log(response);
    });
  }

  onUpdate (id, data) {
    delete data.id;
    return this.http.put<any>(this.base_url + '/' + id.toString(), data, this.getHeaders() )
    .pipe(
      catchError(this.handleError('update', []))
    )
    .subscribe((response) => {
      console.log(response);
    });
  }

  onCreate (data) {
    return this.http.post<any>(this.base_url, data, this.getHeaders() )
    .pipe(
      catchError(this.handleError('creation', []))
    )
    .subscribe((response) => {
      console.log(response);
    });
  }
}





