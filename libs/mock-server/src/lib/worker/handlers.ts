import { rest } from 'msw';
import { login, register } from './handlers/auth.handlers';
import { upload, files } from './handlers/file.handlers';

const notDefined = rest.all('*', (req, res, ctx) => {
  console.error(`Mock server unhandled api : ${req.url}`);
  return res(ctx.status(200));
});

export const handlers = [login, register, upload, files, notDefined];
