import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserDto } from '../app/core/models/common.model'; // Adjust the import path

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly cookieName = 'currentUser';
  private currentUserSubject: BehaviorSubject<UserDto | null>;
  public currentUser$: Observable<UserDto | null>;

  constructor(private cookieService: CookieService) {
    // Initialize currentUserSubject with data from the cookie if available
    const storedUser = this.cookieService.get(this.cookieName);
    this.currentUserSubject = new BehaviorSubject<UserDto | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Set current user in cookie
  setCurrentUser(user: UserDto): void {
    this.cookieService.set(this.cookieName, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Get current user from cookie
  getCurrentUser(): UserDto | null {
    const user = this.cookieService.get(this.cookieName);
    return user ? JSON.parse(user) : null;
  }

  // Clear current user cookie
  clearCurrentUser(): void {
    this.cookieService.delete(this.cookieName);
    this.currentUserSubject.next(null);
  }

  // Check if user is logged in by cookie
  isUserLoggedIn(): boolean {
    return !!this.cookieService.get(this.cookieName);
  }
}
