import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'stack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'out-school';

  constructor(private http: HttpClient) {}

  login() {
    this.http
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
      .subscribe();
  }
}
