import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventCardDto } from './core/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class EventCardService {
  private apiUrl ='https://localhost:7144/EventCard'
  constructor(private http: HttpClient) { }

  getAllEventCard():Observable<EventCardDto[]>{
    return this.http.get<EventCardDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    )
  }

  getEventCardById(id:number):Observable<EventCardDto>{
    return this.http.get<EventCardDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  addEventCard(EventCardDto:EventCardDto):Observable<EventCardDto>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<EventCardDto>(this.apiUrl,EventCardDto,{headers}).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
