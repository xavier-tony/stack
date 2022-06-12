import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
