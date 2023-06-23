import { appConfig } from './app/app.config';

// import { AppModule } from './app/app.module';

// import { setupWorker } from 'msw';
// Removing static import in favor of dynamic import

// import { handlers } from '@stack/mock-server';

import { AppComponent } from './app/app.component';

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { LoginInitService } from './app/initializers';
import { environment } from './environments/environment';

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

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .then((module) =>
//     enableDebugTools(module.injector.get(ApplicationRef).components[0])
//   )
//   .catch((err) => console.error(err));
