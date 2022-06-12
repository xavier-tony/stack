import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, User } from '@stack/models';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<object[]> {
    return this.httpClient
      .get<ApiResponse<User[]>>('/api/users')
      .pipe(map(res => res.data));
  }

  getLogins(): Observable<object[]> {
    return this.httpClient
      .get<ApiResponse<any[]>>('/api/logins')
      .pipe(map(res => res.data));
  }
}
