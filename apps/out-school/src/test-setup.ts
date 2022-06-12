import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import { store } from '@stack/database';
import { handlers, db } from '@stack/mock-server';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);

// Enable mocking in unit tests.
beforeAll(async () => {
  // Add this flag to avoid any file saving operations in node.
  store.runsInNode = false;
  server.listen();
  await db.open();
  console.log('DB ready !');
});

// Reset any runtime handlers tests may use.
afterEach(() => {
  server.resetHandlers();
});

// Clean up once the tests are done.
afterAll(async () => {
  server.close();
  await db.delete();
  db.close();
  console.log('DB Cleared!');
});
