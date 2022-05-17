import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NxWelcomeComponent, AppComponent, environment } from '@stack/out-school';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ENVIRONMENT } from '@stack/services';
import { ChatModule } from '@stack/chat';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, ChatModule],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
