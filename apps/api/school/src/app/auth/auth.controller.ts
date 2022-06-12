import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserTypes } from '@stack/models';
import { Request, Response } from 'express';
import { request } from 'http';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';
import chalk from 'chalk';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  createLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('userTypeId') userTypeId: UserTypes,
    @Res() res: Response
  ) {
    this.authService.createUserAndSession(
      email,
      password,
      firstname,
      lastname,
      userTypeId,
      res
    );
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('rememberMe') rememberMe: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    this.authService.login(email, password, rememberMe, request, response);
  }

  @Post('logout')
  logout(@Req() request: Request, @Res() response: Response) {
    this.authService.logout(request, response);
  }

  @Post('refresh')
  refreshToken(@Req() request: Request, @Res() response: Response) {
    this.authService.refreshToken(request, response);
  }

  @Get('users')
  users(@Res() res) {
    this.authService.getAllUsers(res);
  }

  @Get('logins')
  logins(@Res() res: Response) {
    const logins = this.authService.getAllLogins();
    console.log(chalk.greenBright(logins));
    res.status(StatusCodes.OK).json({
      message: 'Success',
      data: logins,
    });
  }

  @Post('forgot-password/request')
  requestForgotPassword(
    @Req() request: Request,
    @Res() response: Response,
    @Body('email') email: string
  ) {
    this.authService.requestForgotPassword(request, response, email);
  }

  @Post('forgot-password')
  forgotPassword(
    @Req() request: Request,
    @Res() response: Response,
    @Body('password') password: string,
    @Body('code') code: string
  ) {
    this.authService.forgotPassword(request, response, password, code);
  }
}
