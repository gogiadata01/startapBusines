import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgramCardDto,FieldDto,ProgramNamesDto } from './core/models/common.model';
import { CardBodyComponent } from '@coreui/angular';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { environment } from '../environments/environment.development';  // Import environment
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramCardService {
  private apiUrl = `${environment.apiUrl}/ProgramCard`;  // Use environment variable for API URL

  constructor(private http: HttpClient) { }

  // GET all ProgramCards
  getProgramCard(): Observable<ProgramCardDto[]> {
    return this.http.get<ProgramCardDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  getFieldProgram(fieldName: string): Observable<ProgramNamesDto[]> {
    return this.http.get<ProgramNamesDto[]>(`${this.apiUrl}/GetProgramsByField/${fieldName}`).pipe(
      catchError(this.handleError)
    );
  }
  getProgramCardWithProgramName(programname: string): Observable<ProgramCardDto[]> {
    return this.http.get<ProgramCardDto[]>(`${this.apiUrl}/getProgramCardWithProgramName/${programname}`).pipe(
      catchError(this.handleError)
    );
  }
  getProgramCardDetailsBySubjects(subjects: string[]): Observable<ProgramCardDto[]> {
    // Initialize HttpParams
    let params = new HttpParams();
  
    // Append each subject to the params
    subjects.forEach(subject => {
      params = params.append('subjects', subject); // Add each subject individually
    });
  
    // Make the HTTP GET request with the constructed parameters
    return this.http.get<ProgramCardDto[]>(`${this.apiUrl}/GetProgramCardDetailsBySubjects`, { params });
  }
  




  
  
  // Fetch fields only

  getAllFieldNames(): Observable<FieldDto[]> {
    return this.http.get<FieldDto[]>(`${this.apiUrl}/GetAllFieldNames`).pipe(
      catchError(this.handleError)
    );
  }
  
getAllFields(): Observable<{ fieldName: string; programNames: { programName: string }[] }[]> {
  return this.http.get<{ fieldName: string; programNames: { programName: string }[] }[]>(`${this.apiUrl}/GetFields`).pipe(
    catchError(this.handleError)
  );
}
// Fetch program names by field name
// getProgramsByField(fieldName: string): Observable<ProgramNamesDto[]> {
//   return this.http.get<ProgramNamesDto[]>(`${this.apiUrl}/GetProgramsByField/${fieldName}`).pipe(
//     catchError(this.handleError)
//   );
// }
getProgramsByField(fieldName: string): Observable<ProgramNamesDto[]> {
  return this.http.get<ProgramNamesDto[]>(`${this.apiUrl}/GetProgramsByField/${fieldName}`).pipe(
    catchError(this.handleError)  // Ensure handleError is defined properly
  );
}

  // GET ProgramCard by ID
  getProgramCardById(id: number): Observable<ProgramCardDto> {
    return this.http.get<ProgramCardDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
// GET ProgramName by CheckBoxName
getProgramNameByCheckBoxName(checkBoxName: string): Observable<ProgramCardDto> {
  return this.http.get<ProgramCardDto>(`${this.apiUrl}/byCheckBoxName/${checkBoxName}`).pipe(
    catchError(this.handleError)  // Error handling
  );
}

  // POST (add) a new ProgramCard
  addProgramCard(programCard: ProgramCardDto): Observable<ProgramCardDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProgramCardDto>(this.apiUrl, programCard, { headers }).pipe(
      catchError(this.handleError)  // Error handling
    );
  }

  // GET ProgramCard by Program Name
  getProgramCardByProgramName(programName: string): Observable<ProgramCardDto> {
    return this.http.get<ProgramCardDto>(`${this.apiUrl}/byProgramName/${programName}`).pipe(
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
