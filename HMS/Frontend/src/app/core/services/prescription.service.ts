import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private apiUrl = 'http://localhost:5023/api/prescriptions';

  constructor(private http: HttpClient) {}

  getPrescriptionByAppointment(appointmentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointment/${appointmentId}`);
  }

  createPrescription(prescription: any): Observable<any> {
    return this.http.post(this.apiUrl, prescription);
  }
}
