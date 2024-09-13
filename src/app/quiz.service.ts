import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError,throwError } from 'rxjs';
import {QuizDto} from './core/models/common.model'

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'https://localhost:7144/api/Quiz'; 

  constructor(private http: HttpClient) {}

  // GET all quizzes
  getQuizzes(): Observable<QuizDto[]> {
    return this.http.get<QuizDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

 
  getQuizById(id: number): Observable<QuizDto> {
    return this.http.get<QuizDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  
  createQuiz(quiz: QuizDto): Observable<QuizDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<QuizDto>(this.apiUrl, quiz,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getQuizByTime(time: string): Observable<QuizDto[]> {
  return this.http.get<QuizDto[]>(`${this.apiUrl}/ByTime/${time}`).pipe(
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
