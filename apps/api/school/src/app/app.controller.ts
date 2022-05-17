import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as KJUR from 'jsrsasign';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService
  ) {}

  @Get()
  getData() {
    console.log(this.configService.get<string>('env'));
    console.log(this.configService.get<string>('zoomSDKKey'));
    return this.appService.getData();
  }

  @Post('signature')
  getSignature(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    console.log(this.configService.get<string>('zoomSDKKey'));
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    const oHeader = { alg: 'HS256', typ: 'JWT' };

    const oPayload = {
      sdkKey: this.configService.get<string>('zoomSDKKey'),
      mn: req.body.meetingNumber,
      role: req.body.role,
      iat: iat,
      exp: exp,
      appKey: this.configService.get<string>('zoomSDKKey'),
      tokenExp: iat + 60 * 60 * 2,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign(
      'HS256',
      sHeader,
      sPayload,
      this.configService.get<string>('zoomSDKSecret')
    );

    res.json({
      signature: signature,
    });
  }
}
