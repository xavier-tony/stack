import { Injectable } from '@angular/core';
import {
  KeyValue,
  SignupFormGroup,
  User,
  UserTypes,
  Validation,
} from '@stack/models';
import { getAllEnumKeys } from 'enum-for';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as AuthActions from '@stack/auth';
import { AuthFacade } from '../+state/auth.facade';
import { PasswordValidatorService } from '@stack/services';

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private passwordValidatorService: PasswordValidatorService
  ) {}

  getUserTypes(): KeyValue[] {
    return getAllEnumKeys(UserTypes).map(ut => ({
      key: ut,
      value: UserTypes[ut],
    }));
  }

  getUserTypesExceptAdmin(): KeyValue[] {
    return getAllEnumKeys(UserTypes)
      .filter(ut => ut !== 'Admin')
      .map(ut => ({
        key: ut,
        value: UserTypes[ut],
      }));
  }

  buildForm() {
    return this.formBuilder.group(
      {
        userType: [UserTypes.Student, [Validators.required]],
        signup: this.formBuilder.group({
          firstname: ['', [Validators.required]],
          lastname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            {
              validators: [
                Validators.required,
                this.passwordValidatorService.passwordValidator(),
              ],
            },
          ],
          confirmPassword: ['', [Validators.required]],
        }),
      },
      {
        validators: [
          this.passwordValidatorService.comparePasswordValidator(
            'signup.password',
            'signup.confirmPassword'
          ),
        ],
      }
    );
  }

  signup(form: FormGroup<SignupFormGroup>) {
    if (form.valid) {
      const value = form.value;
      if (value.signup) {
        const user: User = {
          firstname: value.signup.firstname!,
          lastname: value.signup.lastname!,
          displayname: value.signup.firstname!,
          email: value.signup.email!,
          userTypeId: value.userType!,
          password: value.signup.password
            ? btoa(value.signup.password)
            : undefined,
        };
        this.authFacade.dispatch(AuthActions.signup({ user }));
      }
    }
  }

  updateValidations(
    passwordValidationRules: Validation,
    form: FormGroup<SignupFormGroup>
  ): Validation {
    console.log(form.errors);
    const errors = form.get('password')?.errors;
    const dirty = form.get('password')?.dirty;
    if (!errors) {
      passwordValidationRules = {
        ...passwordValidationRules,
        messages: passwordValidationRules.messages.map(message => ({
          ...message,
          valid: dirty ? true : undefined,
        })),
      };
      return passwordValidationRules;
    }

    passwordValidationRules = {
      ...passwordValidationRules,
      messages: passwordValidationRules.messages.map(message => ({
        ...message,
        valid: errors['required']
          ? dirty
            ? false
            : undefined
          : Object.keys(errors).includes(message.code)
          ? false
          : true,
      })),
    };
    return passwordValidationRules;
  }


}
