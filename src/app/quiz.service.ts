import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError,throwError,of } from 'rxjs';
import {QuizDto} from './core/models/common.model'
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.development';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = `${environment.apiUrl}/Quiz`;  // Use environment variable for API URL
  private quizCache: { [time: string]: { quizzes: QuizDto[], timestamp: number } } = {};

  constructor(private http: HttpClient) {}

  // GET all quizzes
  getQuizzes(): Observable<QuizDto[]> {
    return this.http.get<QuizDto[]>(this.apiUrl).pipe(
      catchError(this.handleError)  // Consistent error handling
    );
  }

  // GET quiz by ID
  getQuizById(id: number): Observable<QuizDto> {
    return this.http.get<QuizDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST (create) a new quiz
  createQuiz(quiz: QuizDto): Observable<QuizDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<QuizDto>(this.apiUrl, quiz, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE quiz by ID
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Added error handling for delete
    );
  }

  // GET quizzes by time and cache them for 1 hour
  getQuizByTime(time: any): Observable<QuizDto[]> {
    const cachedQuizData = this.quizCache[time];
    const currentTime = new Date().getTime();

    // Check if the cache is valid (within 1 hour)
    if (cachedQuizData && (currentTime - cachedQuizData.timestamp < 3600000)) {
      return of(cachedQuizData.quizzes);  // Return cached quizzes if still valid
    }

    return this.http.get<QuizDto[]>(`${this.apiUrl}/time/${time}`).pipe(
      map((quizzes) => {
        // Cache the quizzes and set the timestamp
        this.quizCache[time] = { quizzes, timestamp: currentTime };
        return quizzes;
      }),
      catchError(this.handleError)
    );
  }

  // Centralized error handling method
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
