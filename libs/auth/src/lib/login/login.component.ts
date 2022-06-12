import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'stack-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
  constructor(private loginService: LoginService) {}

  form = this.loginService.buildForm();

  ngOnInit(): void {}

  onLoginClicked() {
    this.loginService.login(this.form);
  }
}
