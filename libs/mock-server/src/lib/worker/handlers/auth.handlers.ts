import { HttpStatusCode } from '@angular/common/http';
// TODO: Should we use a https://www.npmjs.com/package/http-status-codes or https://www.npmjs.com/package/status-code-enum to avoid using angular reference inside mock server ??
import { inject } from '@angular/core';
// TODO: Should we remove the `inject` and user `new RegisterService` to avoid using angular reference inside mock server ??
import { IRegisterRequest } from '@stack/models';
import { rest } from 'msw';
import { RegisterService } from '../../database/services/register.service';

const registerService = new RegisterService();

export const register = rest.post('/api/register', async (req, res, ctx) => {
  const payload = req.body as IRegisterRequest;
  const user = await registerService.register(payload);
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(user));
});

export const login = rest.post('/api/login', (req, res, ctx) => {
  return res(
    ctx.status(HttpStatusCode.Ok),
    ctx.json({
      message: 'Login successfull!!',
    })
  );
});
