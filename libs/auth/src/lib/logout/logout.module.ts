import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule } from '@angular/router';
import { logoutRoutes } from './logout.routes';

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, RouterModule.forChild(logoutRoutes)],
})
export class LogoutModule {}
