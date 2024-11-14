import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { UniversityVisit } from '../app/core/models/common.model';

@Injectable({
  providedIn: 'root',
})
export class UniversityVisitService {
  private apiUrl = `${environment.apiUrl}/universityvisit`; // Ensure this matches your backend URL

  constructor(private http: HttpClient) {}


  logVisit(universityName: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/log`, { universityName });
  }


  getVisitCount(universityName: string): Observable<{ UniversityName: string; VisitCount: number }> {
    return this.http.get<{ UniversityName: string; VisitCount: number }>(
      `${this.apiUrl}/count/${universityName}`
    );
  }
}
