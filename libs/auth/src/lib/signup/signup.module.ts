import { NgModule } from '@angular/core';

import { SignupComponent } from './signup.component';
import { SignUpContainerComponent } from './sign-up.container/sign-up.container.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { signupRoutes } from './signup.routes';
import { UIKitModule } from '@stack/shared/ui-kit';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    UIKitModule,
    RouterModule.forChild(signupRoutes),
  ],
  exports: [],
  declarations: [SignupComponent, SignUpContainerComponent],
})
export class SignupModule {}
