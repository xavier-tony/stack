import { EmailService } from './services/email.service';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { GetUserMiddleware } from './middlewares/get-user.middleware';
import { AuthController } from './auth/auth.controller';
import { CsrfMiddleware } from './middlewares/csrf.middleware';
import { csrfMiddlewareRoutes } from './routes';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [EmailService, AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CsrfMiddleware).forRoutes(...csrfMiddlewareRoutes);
    consumer.apply(GetUserMiddleware).forRoutes('/');
  }
}
