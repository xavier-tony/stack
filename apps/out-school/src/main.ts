import { ApplicationRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import { setupWorker } from 'msw';
// Removing static import in favor of dynamic import

import { handlers } from '@stack/mock-server';
import { enableDebugTools } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

if (environment.mock) {
  const msw = import('msw');
  msw.then(({ setupWorker }) => {
    const worker = setupWorker(...handlers);
    worker.start();
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((module) =>
    enableDebugTools(module.injector.get(ApplicationRef).components[0])
  )
  .catch((err) => console.error(err));
