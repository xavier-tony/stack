import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Validation } from '@stack/models';

@Injectable({ providedIn: 'root' })
export class PasswordValidationService {
  passwordValidationRules: Validation = {
    heading: 'Password rules',
    messages: [
      {
        code: 'min',
        message: 'The minimum length is 5 characters',
        valid: undefined,
      },
      {
        code: 'uppercase',
        message: 'Atleast one uppercase character',
        valid: undefined,
      },
      {
        code: 'lowercase',
        message: 'Atleast on lowercase character',
        valid: undefined,
      },
      {
        code: 'digits',
        message: 'At least one number',
        valid: undefined,
      },
      {
        code: 'spaces',
        message: 'No spaces are allowed',
        valid: undefined,
      },
      {
        code: 'max',
        message: 'Cannot exceed 25 characters',
        valid: undefined,
      },
    ],
  };

  updateValidations<T extends { [K in keyof T]: AbstractControl<any, any> }>(
    passwordValidationRules: Validation,
    form: FormGroup<T>,
    controlName: string
  ): Validation {
    console.log(form.errors);
    const errors = form.get(controlName)?.errors;
    const dirty = form.get(controlName)?.dirty;
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

  getFormValidationErrors(form: FormGroup) {
    const result: any[] = [];
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors | null | undefined =
        form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError],
          });
        });
      }
    });

    return result;
  }
}
