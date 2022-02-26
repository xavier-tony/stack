import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { setupWorker } from 'msw';
import { handlers } from '@stack/mock-server';

export const worker = setupWorker(...handlers);

if (environment.production) {
  enableProdMode();
}

if (environment.mock) {
  worker.start();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
