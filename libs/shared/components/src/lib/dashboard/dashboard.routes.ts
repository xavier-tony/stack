import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
];
