import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import { handlers, mockDb } from '@stack/mock-server';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);

// Enable mocking in unit tests.
beforeAll(async () => {
  server.listen();
  await mockDb.open();
  console.log('DB ready !');
});

// Reset any runtime handlers tests may use.
afterEach(() => server.resetHandlers());

// Clean up once the tests are done.
afterAll(async () => {
  server.close();
  await mockDb.delete();
  mockDb.close();
  console.log('DB Cleared!');
});
