import { rest } from 'msw';
import { login, register } from './handlers/auth.handlers';

const notDefined = rest.all('*', (req, res, ctx) => {
  console.error(`Mock server unhandled api : ${req.url}`);
  return res(ctx.status(200));
});

export const handlers = [login, register];
