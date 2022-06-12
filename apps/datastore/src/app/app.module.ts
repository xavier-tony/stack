import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsModule } from '@stack/shared/components';
import { FilterTablesPipe } from './filter.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, TableComponent, FilterTablesPipe],
  imports: [
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    SharedComponentsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
