import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

export interface UniversityProgramVisitDto {
  universityName: string;
  programName: string;
}

export interface VisitCountResponse {
  universityName: string;
  programName: string;
  visitCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class UniversityProgramVisitService {
  private apiUrl = `${environment.apiUrl}/UniversityProgramVisit`; // Ensure this matches your backend URL

  constructor(private http: HttpClient) {}

  // Method to log a visit
  logVisit(universityName:string,programName:string): Observable<string> {
    const params = new HttpParams()
    .set('universityName', universityName)
    .set('programName', programName);

    return this.http.post<string>(`${this.apiUrl}/log`, {params});
  }

  // Method to get the visit count for a specific university and program
  getVisitCount(universityName: string, programName: string): Observable<VisitCountResponse> {
    const params = new HttpParams()
      .set('universityName', universityName)
      .set('programName', programName);

    return this.http.get<VisitCountResponse>(`${this.apiUrl}/count`, { params });
  }
}
