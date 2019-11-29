import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

const httpClient = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverUrl = 'http://localhost:3000/users';
  loggedUserData: User;

  constructor(private http: HttpClient, private cookies: CookieService) {}

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl, httpClient)
    .pipe(catchError(this.handleError));
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}/register`, user, httpClient)
    .pipe(catchError(this.handleError));
  }


  loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}/login`, user, httpClient)
    .pipe(catchError(this.handleError));
  }

  userSession(): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}/session`, httpClient)
    .pipe(catchError(this.handleError));
  }

  userSessionLogout(): Observable<User> {
    this.cookies.delete('express-session-storage');

    return this.http.post<User>(`${this.serverUrl}/logout`, httpClient)
    .pipe(catchError(this.handleError));
  }

  vacationsOrdered(): Observable<any> {
    return this.http.get(`${this.serverUrl}/vacationsOrdered`, httpClient)
    .pipe(catchError(this.handleError));
  }

  vacationLike(id): Observable<any> {
    return this.http.post(`${this.serverUrl}/like/${id}`, this.loggedUserData, httpClient)
    .pipe(catchError(this.handleError));
  }


  // vacationUnlike(id): Observable<any> {
  //   return this.http.delete(`${this.serverUrl}/unlike/${id}`, httpClient)
  //   .pipe(catchError(this.handleError));
  // }

  // Error Handling
  handleError(error) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
