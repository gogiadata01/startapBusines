import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UniCardDto, UnicardEnDto } from './core/models/common.model';
import { environment } from '../environments/environment.development';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class UniCardEngService {
  private apiUrl = `${environment.apiUrl}/UnicardEn`;  // Use environment variable for API URL

  constructor(private http: HttpClient) { }
  addUniCard(uniCardEngDto: UnicardEnDto): Observable<UnicardEnDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UnicardEnDto>(this.apiUrl, uniCardEngDto, { headers }).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
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
