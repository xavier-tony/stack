import { NgModule } from '@angular/core';

import { ForgotPasswordComponent } from './forgot-password.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forgotPasswordRoutes } from './forgot-password.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestForgotPasswordComponent } from './request-forgot-password/request-forgot-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UIKitModule } from '@stack/shared/ui-kit';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    UIKitModule,
    RouterModule.forChild(forgotPasswordRoutes),
  ],
  exports: [],
  declarations: [ForgotPasswordComponent, RequestForgotPasswordComponent],
  providers: [],
})
export class ForgotPasswordModule {}
