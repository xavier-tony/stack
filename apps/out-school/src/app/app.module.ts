import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NxWelcomeComponent, AppComponent, environment } from '@stack/out-school';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ENVIRONMENT } from '@stack/services';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
