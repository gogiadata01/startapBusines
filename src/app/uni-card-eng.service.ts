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
  getData(): Observable<UnicardEnDto[]> {
    return this.http.get<UnicardEnDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  getUniCard(id: any): Observable<UnicardEnDto> {
    return this.http.get<UnicardEnDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getUniCardByProgramName(programName: string): Observable<UnicardEnDto[]> {
    const params = new HttpParams().set('programName', programName);
    return this.http.get<UnicardEnDto[]>(`${this.apiUrl}/by-program-name`, { params }).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  getUniCardByIdAndProgramName(id: any, programName: any): Observable<UnicardEnDto[]> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('programName', programName);

    return this.http.get<UnicardEnDto[]>(`${this.apiUrl}/searchById`, { params }).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  getUniCardByTitleMainTextUrl(title: any): Observable<UnicardEnDto[]> {
    const params = new HttpParams().set('title', title);

    return this.http.get<UnicardEnDto[]>(`${this.apiUrl}/searchByTitleMainTextUrl`, { params }).pipe(
      catchError((error) => {
        console.error('Error in search:', error);
        return throwError(() => new Error('Search failed, please try again.'));
      })
    );
  }
  getUniCardByTitleAndProgramName(title: any, programName: any): Observable<any> {
    const params = new HttpParams()
      .set('title', title)
      .set('programName', programName);

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
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
