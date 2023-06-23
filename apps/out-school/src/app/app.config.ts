import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from '@stack/auth';
import { ENVIRONMENT } from '@stack/services';
import { CustomSerializer, RoutingModule } from '@stack/shared/components';
import { environment } from '../environments/environment';
import { appReducer } from './+state/app.reducer';
import { AppRoutingModule } from './app.routing.module';
import { LoginInitService } from './initializers';
import { refreshLogin } from '../main';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      StoreModule.forRoot(appReducer, {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot({
        serializer: CustomSerializer,
        // TODO: Can be removed since we have the routing reducer to track the router conf. Also check  to see if we need to set the NavigationActionTiming to PostActivation
      }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      MatIconModule,
      MatButtonModule,
      MatSidenavModule,
      // SharedComponentsModule,
      AppRoutingModule,
      RoutingModule,
      AuthModule,
      HttpClientXsrfModule.withOptions({
        cookieName: 'XSRF-TOKEN',
        headerName: 'x-xsrf-token',
      })
    ),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: refreshLogin,
      deps: [LoginInitService],
      multi: true,
    },
  ],
};
