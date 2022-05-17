import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ZoomModule } from './zoom/zoom.module';

export const chatRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ZoomModule],
  exports: [ZoomModule],
})
export class ChatModule {}
