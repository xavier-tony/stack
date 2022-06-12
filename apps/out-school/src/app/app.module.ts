// import { APP_INITIALIZER, NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// // Store
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// // Material
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';

// // Custom
// import { AppComponent, environment } from '@stack/out-school';
// import { ENVIRONMENT } from '@stack/services';

// import {
//   CustomSerializer,
//   RoutingModule,
//   SharedComponentsModule,
// } from '@stack/shared/components';
// import { AppRoutingModule } from './app.routing.module';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { appReducer } from './+state/app.reducer';
// import { LoginInitService } from './initializers';

// export function refreshLogin(loginInitService: LoginInitService) {
//   return loginInitService.refreshLogin();
// }
// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     HttpClientModule,
//     StoreModule.forRoot(appReducer, {
//       metaReducers: !environment.production ? [] : [],
//       runtimeChecks: {
//         strictActionImmutability: true,
//         strictStateImmutability: true,
//       },
//     }),
//     EffectsModule.forRoot([]),
//     StoreRouterConnectingModule.forRoot({
//       serializer: CustomSerializer,
//       // TODO: Can be removed since we have the routing reducer to track the router conf. Also check  to see if we need to set the NavigationActionTiming to PostActivation
//     }),
//     !environment.production ? StoreDevtoolsModule.instrument() : [],
//     MatIconModule,
//     MatButtonModule,
//     MatSidenavModule,
//     SharedComponentsModule,
//     AppRoutingModule,
//     RoutingModule,
//     HttpClientXsrfModule.withOptions({
//       cookieName: 'XSRF-TOKEN',
//       headerName: 'x-xsrf-token',
//     }),
//   ],
//   providers: [
//     {
//       provide: ENVIRONMENT,
//       useValue: environment,
//     },
//     {
//       provide: APP_INITIALIZER,

//       useFactory: refreshLogin,
//       deps: [LoginInitService],
//       multi: true,
//     },
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
