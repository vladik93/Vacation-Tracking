import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Vacation } from './vacation.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


const httpClient = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class VacationService {
  serverUrl = 'http://localhost:3000/vacations';

  vacations: Vacation[] = [];

  // vacationModel = new Vacation(
  //   null,
  //   'Visit the Eiffel Tower on your trip to Paris',
  //   'Paris, France',
  //   'No Image Found',
  //   new Date('2019-10-19'),
  //   new Date('2019-10-29'),
  //   2500
  // );



  constructor(private http: HttpClient) { }

  getVacations(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.serverUrl)
    .pipe(catchError(this.handleError));
  }

  getVacationHotspots(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(`${this.serverUrl}/hotspots`)
    .pipe(catchError(this.handleError));
  }

  getVacationById(id): Observable<Vacation> {
    return this.http.get<Vacation>(`${this.serverUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  postVacation(vacation: Vacation): Observable<Vacation> {
    return this.http.post<Vacation>(this.serverUrl, vacation, httpClient)
    .pipe(catchError(this.handleError));
  }

  updateVacation(vacation: Vacation, id) {
    return this.http.put<Vacation>(`${this.serverUrl}/${id}`, vacation, httpClient)
    .pipe(catchError(this.handleError));
  }

  deleteVacation(id) {
    return this.http.delete(`${this.serverUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

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

