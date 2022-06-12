import { Routes } from '@angular/router';
import { SignUpContainerComponent } from './sign-up.container/sign-up.container.component';
export const signupRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignUpContainerComponent,
  },
];
