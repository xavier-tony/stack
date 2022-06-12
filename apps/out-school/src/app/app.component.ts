import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@stack/shared/components';

@Component({
  selector: 'stack-root',
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  title = 'out-school';
  loginSubscription!: Subscription;

  constructor(private http: HttpClient) {}

  login(callback?: () => void): void {
    console.log('login');
    this.loginSubscription = this.http
      .post('api/register', {
        username: 'shawnz',
        firstname: 'Shawn',
        lastname: 'Tony',
        blocked: false,
        frozen: false,
        email: 'sh@gmail.com',
        userTypeId: 1,
        dob: new Date(),
      })
      .subscribe(res => {
        console.log('response', res);
        callback && callback();
      });
  }

  register() {}
}
