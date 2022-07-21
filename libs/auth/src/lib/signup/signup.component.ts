import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SignupFormGroup, UserTypes, Validation } from '@stack/models';
import { PasswordValidationService } from '@stack/services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'stack-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  @Input() userType: UserTypes | undefined;
  @Input() formGroupName!: string;

  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  form!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  passwordValidationRules: Validation =
    this.passwordValidationService.passwordValidationRules;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private passwordValidationService: PasswordValidationService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  setValidationRules() {
    this.passwordValidationRules = {
      ...this.passwordValidationService.updateValidations<SignupFormGroup>(
        this.passwordValidationRules,
        this.form,
        'password'
      ),
    };
  }

  initialize() {
    this.form = this.formGroupDirective.control.get(
      this.formGroupName
    ) as FormGroup;

    this.setValidationRules();
    this.password?.valueChanges
      .pipe(tap(() => this.setValidationRules()))
      .subscribe();
  }
}
