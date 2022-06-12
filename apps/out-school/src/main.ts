import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import { setupWorker } from 'msw';
// Removing static import in favor of dynamic import

// import { handlers } from '@stack/mock-server';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app/+state/app.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer, RoutingModule } from '@stack/shared/components';
import { AppRoutingModule } from './app/app.routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { ENVIRONMENT } from '@stack/services';
import { LoginInitService } from './app/initializers';
import { AuthModule } from '@stack/auth';

if (environment.production) {
  enableProdMode();
}

// if (environment.mock) {
//   const msw = import('msw');
//   msw.then(({ setupWorker }) => {
//     const worker = setupWorker(...handlers);
//     worker.start();
//   });
// }

export function refreshLogin(loginInitService: LoginInitService) {
  return loginInitService.refreshLogin();
}

bootstrapApplication(AppComponent, {
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
}).catch(err => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .then((module) =>
//     enableDebugTools(module.injector.get(ApplicationRef).components[0])
//   )
//   .catch((err) => console.error(err));
