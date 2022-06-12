import { HttpStatusCode } from '@angular/common/http';
// TODO: Should we use a https://www.npmjs.com/package/http-status-codes or https://www.npmjs.com/package/status-code-enum to avoid using angular reference inside mock server ??
import { inject } from '@angular/core';
// TODO: Should we remove the `inject` and user `new RegisterService` to avoid using angular reference inside mock server ??
import { IFile, IRegisterRequest } from '@stack/models';
import { rest } from 'msw';
import { FileDataService } from '../../database/services/file.data.service';

export const upload = rest.post('/api/upload', async (req, res, ctx) => {
  console.log(req, ctx);

  const fileDataService: FileDataService = new FileDataService();

  const id = await fileDataService.uploadFile(req?.body as IFile);

  return res(
    ctx.status(HttpStatusCode.Ok),
    ctx.json({
      message: 'File uploaded successfully!!',
      id,
    })
  );
});

export const files = rest.get('/api/files', async (req, res, ctx) => {
  const fileDataService: FileDataService = new FileDataService();
  return res(
    ctx.status(HttpStatusCode.Ok),
    ctx.json(await fileDataService.getFiles())
  );
});
