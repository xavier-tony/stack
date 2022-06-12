import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decodeJwt, TokenType } from '../auth/jwt.service';
import chalk from 'chalk';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies && req.cookies['__ACCESS__TOKEN'];
    console.log(chalk.cyan('GET USER MIDDLEWARE'));
    if (token) {
      try {
        const payload = await decodeJwt(token, TokenType.Access);
        console.log(payload);
        if (payload.sub) {
          const ids = JSON.parse(payload.sub as string);
          req['userId'] = ids['uid'];
          req['loginId'] = ids['lid'];
        }

        console.log(
          chalk.green(`User ${payload.sub || 'N/A'} added to request`)
        );

        next();
      } catch (error) {
        console.error(error);
        next();
      }
    } else {
      console.log(chalk.red(' No token !'));
      next();
    }
  }
}
