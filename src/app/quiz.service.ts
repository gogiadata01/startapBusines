import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError,throwError,of } from 'rxjs';
import {QuizDto} from './core/models/common.model'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'https://localhost:7144/api/Quiz'; 
  private quizCache: { [time: string]: { quizzes: QuizDto[], timestamp: number } } = {};
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

  // Get quizzes by time and cache them for 1 hour
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
  // getQuizByTime(time: any): Observable<QuizDto[]> {
  // return this.http.get<QuizDto[]>(`${this.apiUrl}/time/${time}`).pipe(
  //   catchError(this.handleError)
  // );
  // }


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
