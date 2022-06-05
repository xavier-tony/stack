import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'out-school';
  loginSubscription!: Subscription;

  constructor(private http: HttpClient) {}



  login(callback?: Function) {
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
      .subscribe((res) => {
        console.log('response', res);
        callback && callback();
      });
  }

  register() {}
}
