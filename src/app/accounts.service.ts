import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, first, map, retry } from 'rxjs/operators';
import { combineLatest, Observable, throwError } from 'rxjs';

import { Config } from './user';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message, error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`, error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAccounts(): Observable<any> {
    const allUsersUrl =
      'http://degem2.migvan.co.il/cgi-webaxy/sal/sal.pl?ID=307434_degem2&' +
      'act=search2&dbid=users&query=res_len%3CD%3Eall%3CD%3Ef9_notnull%3CD%3E1&getValueAJAX=dataid,f8,f9,f46';
    // const allUsersUrl = // dev mode
    //   '/api/cgi-webaxy/sal/sal.pl?ID=307434_degem2' +
    //   '&act=search2&dbid=users&query=res_len<D>all<D>f9_notnull<D>1&getValueAJAX=dataid,f8,f9,f46';
    // const currentUserUrl = //dev mode
    //   '/api/cgi-webaxy/sal/sal.pl?ID=307434_degem2&act=search2&dbid=users&query=dataid<D>webaxyUser&getValueAJAX=dataid,f8,f9,f46';
    const currentUserUrl =
      'http://degem2.migvan.co.il/cgi-webaxy/sal/sal.pl?ID=307434_degem2&' +
      'act=search2&dbid=users&query=dataid%3CD%3EwebaxyUser&getValueAJAX=dataid,f8,f9,f46';
    const allUsers = this.http.get(allUsersUrl, {responseType: 'text'})
      .pipe(
        retry(3),
        catchError(this.handleError),
        first()
      );
    const currentUser = this.http.get(currentUserUrl, {responseType: 'text'})
      .pipe(
        retry(3),
        catchError(this.handleError),
        first()
      );
    return combineLatest([allUsers, currentUser]).pipe(first()).pipe<Config>(
      map(([all, current]) => new Config(all, current))
    );
  }
}
