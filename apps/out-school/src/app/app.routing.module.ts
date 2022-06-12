import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, canLoadAuthGuard } from '@stack/auth';
import { HomeComponent } from '@stack/shared/components';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () => import('@stack/auth/signup').then(m => m.SignupModule),
    data: { test: true },
  },
  {
    path: 'login',
    loadChildren: () => import('@stack/auth/login').then(m => m.LoginModule),
  },
  {
    path: 'logout',
    loadChildren: () => import('@stack/auth/logout').then(m => m.LogoutModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('@stack/auth/forgot-password').then(m => m.ForgotPasswordModule),
  },
  {
    canLoad: [canLoadAuthGuard],
    canActivate: [AuthGuard],
    path: 'dashboard',
    loadChildren: () => import('@stack/dashboard').then(m => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
