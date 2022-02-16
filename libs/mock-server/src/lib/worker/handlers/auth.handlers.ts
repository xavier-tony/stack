import { rest } from 'msw';
import { IRegisterRequest } from '../../database/models';
import { RegisterService } from '../../database/services/register.service';

const registerService = new RegisterService();

export const register = rest.post('/api/register', async (req, res, ctx) => {
  const payload = req.body as IRegisterRequest;
  await registerService.register(payload);
  return res(
    ctx.status(200),
    ctx.json({
      message: 'User Registration successfull!!',
    })
  );
});

export const login = rest.post('/api/login', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      message: 'Login successfull!!',
    })
  );
});
