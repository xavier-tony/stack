import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Validation } from '@stack/models';

@Component({
  selector: 'stack-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidatorComponent implements OnInit, OnChanges {
  @Input() validation!: Validation;
  valid = false;
  dirty = true;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['validation'] &&
      (changes['validation'].isFirstChange() ||
        changes['validation'].currentValue !==
          changes['validation'].previousValue)
    ) {
      this.dirty = this.allDirty();
      this.valid = this.allValid();
    }
  }

  allValid() {
    return this.validation.messages.every(m => m.valid);
  }

  allDirty() {
    return this.validation.messages.every(m => m.valid === undefined);
  }

  ngOnInit(): void {}
}
