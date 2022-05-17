import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomComponent } from './zoom.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ZoomComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ZoomComponent],
})
export class ZoomModule {}
