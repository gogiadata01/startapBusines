import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventCardDto } from './core/models/common.model';
import { environment } from '../environments/environment.development';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class EventCardService {
  private apiUrl = `${environment.apiUrl}/EventCard`;  // Use environment variable for API URL

  constructor(private http: HttpClient) { }

  // GET all EventCards
  getAllEventCard(): Observable<EventCardDto[]> {
    return this.http.get<EventCardDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Error handling
    );
  }

  // GET EventCard by ID
  getEventCardById(id: any): Observable<EventCardDto> {
    return this.http.get<EventCardDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Error handling
    );
  }

  // POST (add) a new EventCard
  addEventCard(eventCardDto: EventCardDto): Observable<EventCardDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<EventCardDto>(this.apiUrl, eventCardDto, { headers }).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  getEventCardForHome(): Observable<any[]> {  // Adjust the return type based on your requirements
    return this.http.get<any[]>(`${this.apiUrl}/home`).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  // Centralized error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
