import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { of, Observable } from 'rxjs';
import PasswordValidator from 'password-validator';
import { validationErrorCodes } from '@stack/models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PasswordValidatorService {
  constructor() {}

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validationErrors: { [key: string]: string } = {};
      const schema = new PasswordValidator();
      schema
        .is()
        .min(5)
        .is()
        .max(25)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits(1)
        .has()
        .not()
        .spaces();
      console.log(control.value);
      const errors = schema.validate(control.value, { list: true });
      if (Array.isArray(errors)) {
        errors.forEach(error => {
          validationErrors[error] = validationErrorCodes[error];
        });
        //console.log(validationErrors);
        return validationErrors;
      }

      return null;
    };
  }

  comparePasswordValidator(password: string, confirmPassword: string) {
    const passwordLayers: string[] = password.split('.');
    const confirmPasswordLayers: string[] = confirmPassword.split('.');

    return (group: FormGroup): ValidationErrors | null => {
      console.log(passwordLayers, confirmPasswordLayers);
      //   const passwordControl: AbstractControl | null | undefined = group
      //     .get('signup')
      //     ?.get('password');
      //   const confirmPasswordControl: AbstractControl | null | undefined = group
      //     .get('signup')
      //     ?.get('confirmPassword');

      const passwordControl = this.getControlFromLayers(group, passwordLayers);
      const confirmPasswordControl = this.getControlFromLayers(
        group,
        confirmPasswordLayers
      );

      if (!passwordControl?.value || !confirmPasswordControl?.value)
        return null;

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordNotMatch: true });
        return { passwordNotMatch: true };
      }
      return null;
    };
  }

  getControlFromLayers(group: FormGroup, layers: string[]): any {
    let control: any;
    layers.forEach(layer => {
      control = control ? control.get(layer) : group.get(layer);
    });
    return control;
  }
}
