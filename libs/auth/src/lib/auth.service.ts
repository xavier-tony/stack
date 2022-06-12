import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay, throwError } from 'rxjs';
import {
  ApiResponse,
  SignupResponse,
  User,
  LoginRequest,
  LoginResponse,
} from '@stack/models';
import { catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(user: User): Observable<SignupResponse | null> {
    return this.http
      .post<ApiResponse<SignupResponse>>('api/create', {
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        email: user.email,
        userTypeId: user.userTypeId,
      })
      .pipe(
        shareReplay(),
        map(res => (res && res.data ? res.data : null)),
        catchError(error => throwError(() => error))
      );
  }

  login(request: LoginRequest): Observable<LoginResponse | null> {
    return this.http
      .post<ApiResponse<LoginResponse>>('/api/login', { ...request })
      .pipe(
        shareReplay(),
        map(response => response?.data || null),
        catchError(error => throwError(() => error))
      );
  }

  refreshLogin(): Observable<LoginResponse | null> {
    return this.http
      .post<ApiResponse<LoginResponse>>('/api/refresh', null)
      .pipe(
        shareReplay(),
        map(response => response?.data || null),
        catchError(error => throwError(() => error))
      );
  }

  logout() {
    return this.http.post('api/logout', null).pipe(shareReplay());
  }

  requestForgotPassword(email: string) {
    return this.http.post('api/forgot-password/request', { email });
  }

  forgotPassword(password: string, code: string) {
    return this.http.post<void>('/api/forgot-password', { password, code });
  }
}
