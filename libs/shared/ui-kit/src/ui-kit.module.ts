import { NgModule } from '@angular/core';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ValidatorComponent } from './validator/validator.component';

@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
  ],
  exports: [FileUploadComponent, ValidatorComponent],
  declarations: [FileUploadComponent, ValidatorComponent],
})
export class UIKitModule {}
