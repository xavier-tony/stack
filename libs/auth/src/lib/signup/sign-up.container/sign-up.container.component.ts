import { Component } from '@angular/core';
import { KeyValue } from '@stack/models';
import { SignupService } from '../signup.service';

@Component({
  selector: 'stack-signup-container',
  templateUrl: './sign-up.container.component.html',
  styleUrls: ['./sign-up.container.component.scss'],
})
export class SignUpContainerComponent {
  form = this.signupService.buildForm();
  userTypes: KeyValue[] = this.signupService.getUserTypesExceptAdmin();

  constructor(private signupService: SignupService) {}

  onSignup() {
    this.signupService.signup(this.form);
  }
}
