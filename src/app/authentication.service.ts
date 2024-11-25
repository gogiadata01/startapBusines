// import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import * as CryptoJS from 'crypto-js';
// import { BehaviorSubject } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {
//   private key = 'your-secret-key'; // Secret key for encryption/decryption
//   private currentUserSubject = new BehaviorSubject<any>(null); // Default value is null
//   currentUser$ = this.currentUserSubject.asObservable();

//   constructor(private cookieService: CookieService,) {}

//   setToken(token: string): void {
//     // Encrypt the token and store it in the cookie
//     const encryptedToken = this.encrypt(token);
//     this.cookieService.set('userToken', encryptedToken);
//     this.currentUserSubject.next(this.getCurrentUser()); // Update current user subject
//   }
  

//   getToken(): string | null {
//     // Retrieve the encrypted token from the cookie
//     const encryptedToken = this.cookieService.get('userToken');
//     return encryptedToken ? this.decrypt(encryptedToken) : null; // Decrypt the token if it exists
//   }

  // isAuthenticated(): boolean {
  //   return this.getToken() !== null;
  // }

//   getCurrentUser(): any {
//     const encryptedToken = this.getToken(); // Retrieve the encrypted token
//     if (encryptedToken) {
//       return this.decodeToken(encryptedToken); // Decrypt and decode the token
//     }
//     return null;
//   }
//   removeToken(): void {
//     this.cookieService.delete('userToken');
//     this.currentUserSubject.next(null);
//   }

//   private encrypt(data: string): string {
//     return CryptoJS.AES.encrypt(data, this.key).toString();
//   }

//   private decrypt(data: string): string {
//     const bytes = CryptoJS.AES.decrypt(data, this.key);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   }

  // isUserLoggedIn(): boolean {
  //   const token = this.cookieService.get('userToken');
  //   return !!token;
  // }

// private decodeToken(token: string): any {
//   try {
//     const decodedToken = jwtDecode(token); // Decode the decrypted token (JWT)
//     return decodedToken;
//   } catch (error) {
//     console.error('Error decoding token', error);
//     return null;
//   }
// }
  
// }
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';  // Ensure CryptoJS is imported
import { jwtDecode } from 'jwt-decode';  // JWT decoding library

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private key = 'your-secret-key';  // Secret key for encryption/decryption
  private currentUserSubject = new BehaviorSubject<any>(null); // Default value is null
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private cookieService: CookieService) {}

  // Set token (store raw token in cookies)
  setToken(token: string): void {
    const encryptedToken = this.encrypt(token);  // Encrypt the token before storing
    this.cookieService.set('userToken', encryptedToken);
    this.currentUserSubject.next(this.getCurrentUser());  // Update current user subject
  }

  // Get and decode the token
  getToken(): any {
    const token = this.cookieService.get('userToken');  // Retrieve encrypted token
    if (token) {
      return this.decodeToken(token);  // Decrypt and decode the token
    }
    return null;
  }

  // Get current user (decoded token)
  getCurrentUser(): any {
    return this.getToken();  // Calls getToken, which decrypts and decodes the token
  }

  // Remove token from cookies
  removeToken(): void {
    this.cookieService.delete('userToken');
    this.currentUserSubject.next(null);
  }

  // Decrypt token method
  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.key);  // Decrypt using the key
    return bytes.toString(CryptoJS.enc.Utf8);  // Return decrypted string
  }
  getNameIdentifier(): number | null {
    const token = this.cookieService.get('userToken');
    if (token) {
      try {
        const decoded = this.decodeToken(token);
        const nameIdentifier =
          decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return nameIdentifier ? Number(nameIdentifier) : null; // Convert to number
      } catch (error) {
        console.error('Error extracting nameidentifier:', error);
        return null;
      }
    }
    return null;
  }
  

  // Encrypt token method (for setting token)
  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.key).toString();  // Encrypt with the key
  }

  isUserLoggedIn(): boolean {
    const token = this.cookieService.get('userToken');
    return !!token;
  }
  // Decode JWT method
  private decodeToken(token: string): any {
    try {
      const decryptedToken = this.decrypt(token);  // Decrypt first
      const decoded = jwtDecode(decryptedToken);  // Then decode the JWT token
      return decoded;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
