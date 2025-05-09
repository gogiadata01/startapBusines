import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDto } from './core/models/common.model';
import { UserSignInDto } from './core/models/common.model';
import { environment } from '../environments/environment.development';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/User`;  // Use API URL from environment

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      catchError(this.handleError)  // Added error handling
    );
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)  // Added error handling
    );
  }

  registerUser(user: UserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)  // Added error handling
    );
  }
  getQuizHistory(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz-history/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
  

  signInUser(loginDto: UserSignInDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, loginDto).pipe(
      catchError(this.handleError)  // Added error handling
    );
  }
  recoverPassword(email: string, newPassword: string): Observable<any> {
    const body = { email, newPassword };  // Ensure that the object has the correct keys
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/recover-password`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  updateRemainingTime(userId: number, additionalTime: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-remaining-time/${userId}`, additionalTime);
  }
  
  
  updateUserCoin(id: any, newCoinValue: number): Observable<any> {
    const body = { newCoinValue }; // Wrap the value in an object
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}/coin`, body, { headers }).pipe(
      catchError(this.handleError)  // Added error handling
    );
  }
  checkQuizRestriction(userId: any): Observable<{ CanStartQuiz: boolean; TimeUntilNextAttempt: number }> {
    return this.http.get<{ CanStartQuiz: boolean; TimeUntilNextAttempt: number }>(
      `${environment.apiUrl}/User/check-quiz-restriction/${userId}`
    ).pipe(
      catchError(this.handleError)
    );
  }


  endQuiz(userId: number, correctAnswers: number): Observable<{ Message: string; CoinsEarned: number; TotalCoins: number }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ Message: string; CoinsEarned: number; TotalCoins: number }>(
      `${environment.apiUrl}/User/end-quiz/${userId}`,
      correctAnswers, // Send the number of correct answers as the request body
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
  addQuizCompletion(data: { userId: number; completedDate: any }): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddQuizCompletion`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
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
