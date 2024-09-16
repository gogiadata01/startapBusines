import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UniCardDto } from './core/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class HomeUniCardService {
  private apiUrl = 'https://localhost:7144/api/UniCard';

  constructor(private http: HttpClient) {}

  getData(): Observable<UniCardDto[]> {
    return this.http.get<UniCardDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getUniCard(id: any): Observable<UniCardDto> {
    return this.http.get<UniCardDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addUniCard(uniCardDto: UniCardDto): Observable<UniCardDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UniCardDto>(this.apiUrl, uniCardDto, { headers }).pipe(
      catchError(this.handleError)
    );
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

