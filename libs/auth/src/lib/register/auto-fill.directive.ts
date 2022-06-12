import { AutofillMonitor } from '@angular/cdk/text-field';
import { Directive, ElementRef, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  DefaultValueAccessor,
  RequiredValidator,
  Validators,
} from '@angular/forms';

/**
 * This directive monkeypatches a RequiredValidator directive instance to accept autofilled
 * inputs as valid despite reporting an empty value. Ideally this should be supported directly
 * by the DefaultValueAccessor and Validators.required() should be able to take this into account.
 */
@Directive({
  // the selector used for DefaultValueAccessor
  selector:
    'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
})
export class AutofillValueAccessor {
  autofilled = false;

  constructor(
    private _autofillMonitor: AutofillMonitor,
    @Self() private _valueAccessor: DefaultValueAccessor,
    @Self() private _elementRef: ElementRef,
    @Optional() @Self() requiredValidator: RequiredValidator
  ) {
    if (requiredValidator) {
      requiredValidator.validate = (c: AbstractControl) => {
        return requiredValidator.required && !this.autofilled
          ? Validators.required(c)
          : null;
      };
    }
  }

  ngOnInit() {
    this._autofillMonitor
      .monitor(this._elementRef.nativeElement)
      .subscribe((event) => {
        this.autofilled = event.isAutofilled;
        this._valueAccessor.onChange(this._elementRef.nativeElement.value);
      });
  }

  ngOnDestroy() {
    this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
  }
}
