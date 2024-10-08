import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UniCardDto } from './core/models/common.model';
import { environment } from '../environments/environment.development';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class HomeUniCardService {
  private apiUrl = `${environment.apiUrl}/UniCard`;  // Use environment variable for API URL

  constructor(private http: HttpClient) {}

  // GET all UniCard data
  getData(): Observable<UniCardDto[]> {
    return this.http.get<UniCardDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Error handling
    );
  }

  // GET UniCard by ID
  getUniCard(id: any): Observable<UniCardDto> {
    return this.http.get<UniCardDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Error handling
    );
  }

  // POST (add) a new UniCard
  addUniCard(uniCardDto: UniCardDto): Observable<UniCardDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UniCardDto>(this.apiUrl, uniCardDto, { headers }).pipe(
      catchError(this.handleError)  // Error handling
    );
  }

  // GET UniCard by title and program name (with query params)
  getUniCardByTitleAndProgramName(title: any, programName: any): Observable<any> {
    const params = new HttpParams()
      .set('title', title)
      .set('programName', programName);

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }
  getUniCardByProgramName(programName: string): Observable<UniCardDto[]> {
    const params = new HttpParams().set('programName', programName);
    return this.http.get<UniCardDto[]>(`${this.apiUrl}/by-program-name`, { params }).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  getUniCardByIdAndProgramName(id: any, programName: any): Observable<UniCardDto[]> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('programName', programName);

    return this.http.get<UniCardDto[]>(`${this.apiUrl}/searchById`, { params }).pipe(
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

