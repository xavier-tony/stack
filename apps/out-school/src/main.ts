import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import { setupWorker } from 'msw';
// Removing static import in favor of dynamic import

import { handlers } from '@stack/mock-server';

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
  .catch((err) => console.error(err));
