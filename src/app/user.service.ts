import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDto } from './core/models/common.model';
import { UserSignInDto } from './core/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '  https://localhost:7144/api/User';

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getUserById(id:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  registerUser(user: UserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  signInUser(loginDto: UserSignInDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, loginDto);
  }
  updateUserCoin(id: number, newCoinValue: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/coin`, newCoinValue)
  }
}
