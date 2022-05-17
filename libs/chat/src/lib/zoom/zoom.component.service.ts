import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ZoomComponentService {
  constructor(private http: HttpClient) {}

  getSignature() {
    return this.http
      .post('http://localhost:3333/api/signature', {
        meetingNumber: '9733863734',
        role: 1,
      })
  }
}
