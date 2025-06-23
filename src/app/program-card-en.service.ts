import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgramCardDto,FieldDto,ProgramNamesDto , ProgramCardEnDto ,ProgramNamesEnDto, FieldEnDto} from './core/models/common.model';
import { CardBodyComponent } from '@coreui/angular';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { environment } from '../environments/environment.development';  // Import environment
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramCardEnService {
  private apiUrl = `${environment.apiUrl}/ProgramCardEn`; 

  constructor(private http: HttpClient) { }

  
  // GET all ProgramCards
  getProgramCard(): Observable<ProgramCardEnDto[]> {
    return this.http.get<ProgramCardEnDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
  getFieldProgram(fieldName: string): Observable<ProgramNamesEnDto[]> {
    return this.http.get<ProgramNamesEnDto[]>(`${this.apiUrl}/GetProgramsByField/${fieldName}`).pipe(
      catchError(this.handleError)
    );
  }
  getProgramCardWithProgramName(programname: string): Observable<ProgramCardEnDto[]> {
    return this.http.get<ProgramCardEnDto[]>(`${this.apiUrl}/getProgramCardWithProgramName/${programname}`).pipe(
      catchError(this.handleError)
    );
  }
  getProgramCardDetailsBySubjects(subjects: string[]): Observable<ProgramCardEnDto[]> {
    // Initialize HttpParams
    let params = new HttpParams();
  
    // Append each subject to the params
    subjects.forEach(subject => {
      params = params.append('subjects', subject); // Add each subject individually
    });
  
    // Make the HTTP GET request with the constructed parameters
    return this.http.get<ProgramCardEnDto[]>(`${this.apiUrl}/GetProgramCardDetailsBySubjects`, { params });
  }
  




  
  
  // Fetch fields only

  getAllFieldNames(): Observable<FieldEnDto[]> {
    return this.http.get<FieldEnDto[]>(`${this.apiUrl}/GetAllFieldNames`).pipe(
      catchError(this.handleError)
    );
  }
  
getAllFields(): Observable<{ fieldName: string; programNames: { programName: string }[] }[]> {
  return this.http.get<{ fieldName: string; programNames: { programName: string }[] }[]>(`${this.apiUrl}/GetFields`).pipe(
    catchError(this.handleError)
  );
}
getProgramsByField(fieldName: string): Observable<ProgramNamesEnDto[]> {
  return this.http.get<ProgramNamesEnDto[]>(`${this.apiUrl}/GetProgramsByField/${fieldName}`).pipe(
    catchError(this.handleError)  // Ensure handleError is defined properly
  );
}

  // GET ProgramCard by ID
  getProgramCardById(id: number): Observable<ProgramCardEnDto> {
    return this.http.get<ProgramCardEnDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Error handling
    );
  }
// GET ProgramName by CheckBoxName
getProgramNameByCheckBoxName(checkBoxName: string): Observable<ProgramCardEnDto> {
  return this.http.get<ProgramCardEnDto>(`${this.apiUrl}/byCheckBoxName/${checkBoxName}`).pipe(
    catchError(this.handleError)  // Error handling
  );
}

  // POST (add) a new ProgramCard
  addProgramCard(programCard: ProgramCardEnDto): Observable<ProgramCardEnDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProgramCardEnDto>(
      `${this.apiUrl}/AddProgramCardEn`, // <-- fixed endpoint
      programCard,
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
  

  // GET ProgramCard by Program Name
  getProgramCardByProgramName(programName: string): Observable<ProgramCardEnDto> {
    return this.http.get<ProgramCardEnDto>(`${this.apiUrl}/byProgramName/${programName}`).pipe(
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
