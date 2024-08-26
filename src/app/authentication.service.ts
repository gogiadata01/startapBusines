import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../app/core/models/common.model'; // Adjust the import path based on your project structure

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserDto | null>;
  public currentUser$: Observable<UserDto | null>;

  constructor() {
    // Initialize currentUserSubject with data from localStorage if available
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserDto | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Method to update the current user information
  setCurrentUser(user: UserDto): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Method to clear user information (e.g., on logout)
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Method to get the current user value synchronously
  getCurrentUserValue(): UserDto | null {
    return this.currentUserSubject.value;
  }
}
