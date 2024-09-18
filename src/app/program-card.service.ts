import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgramCardDto } from './core/models/common.model';
import { CardBodyComponent } from '@coreui/angular';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root'
})
export class ProgramCardService {
  private apiUrl = "https://localhost:7144/api/ProgramCard"
  constructor(private http: HttpClient) { }

  getProgramCard():Observable<ProgramCardDto[]>{
    return this.http.get<ProgramCardDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    )
  }

  getProgramCardById(id:any):Observable<ProgramCardDto>{
    return this.http.get<ProgramCardDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addProgramCard(ProgramCardDto:ProgramCardDto):Observable<ProgramCardDto>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProgramCardDto>(this.apiUrl,ProgramCardDto,{headers}).pipe(
      catchError(this.handleError)
    )
  }
  getProgramCardByProgramName(programname: any): Observable<ProgramCardDto> {
    return this.http.get<ProgramCardDto>(`${this.apiUrl}/byProgramName/${programname}`);
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
