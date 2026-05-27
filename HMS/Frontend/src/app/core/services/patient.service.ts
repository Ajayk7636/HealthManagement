import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = 'http://localhost:5023/api/patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPatient(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }
}
