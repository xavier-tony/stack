import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { of, Observable } from 'rxjs';

export function testValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    console.log(control.value);
    return String(control.value).length > 60
      ? of({ lengthGreaterThan60: true })
      : of(null);
  };
}
