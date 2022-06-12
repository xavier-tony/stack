import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RequestForgotPasswordComponent } from './request-forgot-password/request-forgot-password.component';

export const forgotPasswordRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ForgotPasswordComponent,
  },
  { path: 'request', component: RequestForgotPasswordComponent },
];
