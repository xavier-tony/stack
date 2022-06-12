import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decodeJwt, TokenType } from '../auth/jwt.service';
import chalk from 'chalk';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const csrfCookie = req.cookies['XSRF-TOKEN'];
    const csrfHeader = req.headers['x-xsrf-token'];
    if (req.originalUrl.indexOf('refresh') > -1 && !csrfCookie) {
      console.log('SAFE', req.originalUrl);
      next();
    } else if (csrfCookie && csrfHeader && csrfCookie === csrfHeader) {
      console.log('ALL COOL');
      next();
    } else {
      console.log('Pani kitti', req.originalUrl);
      res.status(StatusCodes.FORBIDDEN).json({
        error: 'Forbidden !',
      });
    }
  }
}
