import { Response, Request } from 'express';
import { Injectable } from '@nestjs/common';

import * as argon2 from 'argon2';
import {
  createCSRFToken,
  createSessionToken,
  decodeJwt,
  randomString,
  TokenType,
} from './jwt.service';
import {
  forgotPasswordCodeStore,
  ForgotPasswordCodeTable,
  loginStore,
  LoginTable,
  tokenStore,
  TokenTable,
  userStore,
  UserTable,
} from '@stack/database';
import {
  UserTypes,
  SignupResponse,
  User,
  LoginInfo,
  LoginResponse,
  Email,
} from '@stack/models';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { EmailService } from '../services/email.service';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  getAllUsers(res: Response) {
    res.status(200).json({
      message: 'Success',
      data: userStore.getAllUsers(),
    });
  }

  async createUserAndSession(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    userTypeId: UserTypes,
    res: Response
  ) {
    try {
      // Hash the password to get the password digest using argon2
      const passwordDigest = await argon2.hash(password);

      // Create the login with the password digest
      const user = userStore.createUser(
        firstname,
        lastname,
        email,
        passwordDigest,
        userTypeId
      );

      if (!user) throw new Error('Create user failed!');

      const login = loginStore.login(user.id);

      // Create a jwt access token
      const accessToken = await createSessionToken(
        JSON.stringify({ uid: user.id, lid: login.id }),
        TokenType.Access
      );

      // Create a jwt refresh token
      const refreshToken = await createSessionToken(
        JSON.stringify({ uid: user.id, lid: login.id }),
        TokenType.Refresh
      );

      const token: TokenTable = {
        loginId: login.id,
        userId: user.id,
        accessToken,
        refreshToken,
      };
      tokenStore.addToken(token);

      // Creats CSRF token
      const csrfToken = await createCSRFToken();

      // Add the jwt access token to a secure httponly cookie
      res.cookie('__ACCESS__TOKEN', accessToken, {
        httpOnly: true,
        secure: true,
      });

      // Add the jwt access token to a secure httponly cookie
      res.cookie('__REFRESH__TOKEN', refreshToken, {
        httpOnly: true,
        secure: true,
      });

      // Add the CSRF tpken to the cookie
      res.cookie('XSRF-TOKEN', csrfToken);

      // Respond with the login details?˘
      res.status(200).json({
        message: 'Success',
        data: this.mapUser<SignupResponse>(user, login),
      });
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
        data: undefined,
      });
    }
  }

  private mapUser<T>(userTable: Partial<UserTable>, loginTable: LoginTable): T {
    const user: User = {
      id: userTable.id,
      userTypeId: userTable.userTypeId,
      email: userTable.email,
      displayname: userTable.firstname,
      firstname: userTable.firstname,
      lastname: userTable.lastname,
      blocked: userTable.blocked || false,
      frozen: userTable.frozen || false,
      noRefresh: userTable.noRefresh || false,
    };

    const login: LoginInfo = {
      id: loginTable.id,
      loggedIn: true,
      loggedInDate: loginTable.on || new Date(),
      loginAttempts: 0,
      impersonated: false,
      userId: loginTable.userId,
      email: userTable.email,
      userTypeId: userTable.userTypeId,
    };
    return { user, login } as unknown as T;
  }

  getAllLogins() {
    return loginStore.getAllLogins();
  }

  async login(
    email: string,
    password: string,
    rememberMe: string,
    request: Request,
    response: Response
  ) {
    try {
      const invalid = [email, password].some(input => !input);
      if (invalid) {
        response.status(StatusCodes.BAD_REQUEST).json({
          error: 'Invalid Inputs',
        });
        return;
      }

      // Authenticate with email / password
      const user = await userStore.authenticate(email, password);

      if (!user) {
        response.status(StatusCodes.UNAUTHORIZED).json({
          error: 'Unauthenticated',
        });
        return;
      }

      // Remove existing tokens/logins
      const existingAccessToken = request.cookies['__ACCESS__TOKEN'];

      // Create new login
      const login = loginStore.login(user.id);

      // Create a jwt access token
      const accessToken = await createSessionToken(
        JSON.stringify({ uid: user.id, lid: login.id }),
        TokenType.Access
      );

      // Create a jwt refresh token
      const refreshToken = await createSessionToken(
        JSON.stringify({ uid: user.id, lid: login.id }),
        TokenType.Refresh
      );

      const token: TokenTable = {
        loginId: login.id,
        userId: user.id,
        accessToken,
        refreshToken,
      };
      tokenStore.addToken(token);

      // Creats CSRF token
      const csrfToken = await createCSRFToken();

      // Add the jwt access token to a secure httponly cookie
      response.cookie('__ACCESS__TOKEN', accessToken, {
        httpOnly: true,
        secure: true,
      });

      // Add the jwt access token to a secure httponly cookie
      response.cookie('__REFRESH__TOKEN', refreshToken, {
        httpOnly: true,
        secure: true,
      });

      // Add the CSRF tpken to the cookie
      response.cookie('XSRF-TOKEN', csrfToken);

      // Remove existing tokens & mark existing login as obsolete !
      if (existingAccessToken) {
        const existingLoginId =
          tokenStore.getLoginIdFromToken(existingAccessToken);
        if (existingLoginId) {
          tokenStore.removeTokenByLogin(existingLoginId);
          loginStore.markObsolete(existingLoginId);
        }
      }

      // Respond with the login details?˘
      response.status(200).json({
        message: 'Success',
        data: this.mapUser<LoginResponse>(user, login),
      });
    } catch (error) {
      console.log(error);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error,
      });
    }
  }

  logout(request: Request, response: Response) {
    const userId = request['userId'];
    if (userId) {
      const user = userStore.getUserById(userId);
      if (!user) {
        response.status(StatusCodes.FORBIDDEN).json({
          error: 'Not authenticated !',
        });
        return;
      }
    }
    const { accessToken, refreshToken } = this.getTokensFromRequest(request);
    response.clearCookie('__ACCESS__TOKEN');
    response.clearCookie('__REFRESH__TOKEN');
    response.clearCookie('XSRF-TOKEN');
    if (accessToken) {
      let loginId = request['loginId'];
      if (!loginId) loginId = tokenStore.getLoginIdFromToken(accessToken);
      if (loginId) {
        tokenStore.removeTokenByLogin(loginId);
        loginStore.logout(loginId);
      }
    }

    response.status(StatusCodes.OK).json({ message: 'Logout Successful!' });
  }

  private getTokensFromRequest(request: Request): Tokens {
    const cookies = request.cookies;
    if (!cookies) return null;
    const accessToken = cookies['__ACCESS__TOKEN'];
    const refreshToken = cookies['__REFRESH__TOKEN'];
    if (!accessToken || !refreshToken) return null;
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(request: Request, response: Response) {
    const cookies = request.cookies;
    let accessPayload: string | JwtPayload;
    let refreshPayload: string | JwtPayload;

    if (!cookies) {
      response.status(401).json({
        error: 'Not authenticated !',
      });
      return;
    }

    const accessToken = cookies['__ACCESS__TOKEN'];
    const refreshToken = cookies['__ACCESS__TOKEN'];

    if (!accessToken && !refreshToken) {
      response.status(401).json({
        error: 'Not authenticated !',
      });
      return;
    }

    try {
      accessPayload = await decodeJwt(accessToken, TokenType.Access);
      if (!accessPayload?.sub)
        refreshPayload = await decodeJwt(refreshToken, TokenType.Refresh);
    } catch (error) {
      try {
        refreshPayload = await decodeJwt(accessToken, TokenType.Access);
      } catch (error) {
        // return unauthenticated ..
        response.status(401).json({
          error: 'Not authenticated !',
        });
        return;
      }
    }
    if (accessPayload && accessPayload.sub) {
      const loginResponse = this.getLoginResponseFromToken(accessPayload);

      if (!loginResponse?.user || !loginResponse?.user) {
        // handle unauthenticated !
        response.status(401).json({
          error: 'Not authenticated !',
        });
        return;
      }

      // Respond with the login details?˘
      response.status(200).json({
        message: 'Success',
        data: loginResponse,
      });
    } else if (refreshPayload) {
      const loginResponse = this.getLoginResponseFromToken(refreshPayload);

      if (!loginResponse?.user || !loginResponse?.login) {
        // handle unauthenticated !
        response.status(401).json({
          error: 'Not authenticated !',
        });
        return;
      }
      // Create a jwt access token
      const accessToken = await createSessionToken(
        JSON.stringify({
          uid: loginResponse.user.id,
          lid: loginResponse.login.id,
        }),
        TokenType.Access
      );

      tokenStore.updateAccessToken(loginResponse.login.id, accessToken);

      // Add the jwt access token to a secure httponly cookie
      response.cookie('__ACCESS__TOKEN', accessToken, {
        httpOnly: true,
        secure: true,
      });

      // Respond with the login details?˘
      response.status(200).json({
        message: 'Success',
        data: loginResponse,
      });
    } else {
      response.status(401).json({
        error: 'Not authenticated !',
      });
    }
  }

  getLoginResponseFromToken(token: string | JwtPayload) {
    if (token && token.sub) {
      const ids = JSON.parse(token.sub as string);
      if (ids) {
        const loginId = ids['lid'];
        const userId = ids['uid'];

        const user = userStore.getUserById(userId);
        const login = loginStore.getLoginById(loginId);
        // validate user and also if the login is not obsolete !
        if (user && login && !login.obsolete) {
          return this.mapUser<LoginResponse>(user, login);
        }
      }
    }
    return null;
  }

  async requestForgotPassword(
    request: Request,
    response: Response,
    email: string
  ) {
    if (!email) {
      response.status(StatusCodes.FORBIDDEN).json({
        error: 'Email missing!',
      });
      return;
    }

    const user = userStore.getUserByEmail(email);
    if (!user) {
      response.status(StatusCodes.FORBIDDEN).json({
        error: 'User not found!',
      });
      return;
    }

    const random = randomString(5);

    const emailInfo: Email = {
      to: user.email,
      subject: 'Forgot Password',
      html: `<h2>Forgot Password</h2> <p>Please find the security code below: </p> <h3>CODE: ${random}</h3>`,
    };
    try {
      await this.emailService.mockEmail(emailInfo);

      const forgotPasswordCode: ForgotPasswordCodeTable = {
        userId: user.id,
        createdOn: new Date(),
        code: random,
      };
      const codeId = forgotPasswordCodeStore.set(forgotPasswordCode);

      // Create a jwt access token
      const forgotPasswordToken = await createSessionToken(
        JSON.stringify({ uid: user.id, cid: codeId }),
        TokenType.ForgotPassword
      );

      forgotPasswordCodeStore.updateToken(codeId, forgotPasswordToken);

      response.cookie('__FORGOT__TOKEN', forgotPasswordToken, {
        httpOnly: true,
        secure: true,
      });
    } catch (error) {
      response.status(StatusCodes.FORBIDDEN).json({
        error: 'Email issue',
      });
      return;
    }

    response.status(StatusCodes.OK).json({
      message: 'Request Approved!',
    });
    return;
  }

  async forgotPassword(
    request: Request,
    response: Response,
    password: string,
    code: string
  ) {
    try {
      const cookies = request.cookies;
      if (!cookies) {
        // error
        response.status(StatusCodes.FORBIDDEN).json({
          error: 'Forbidden',
        });
        return;
      }

      const forgotPasswordToken = cookies['__FORGOT__TOKEN'];
      if (!forgotPasswordToken) {
        //error
        response.status(StatusCodes.FORBIDDEN).json({
          error: 'Forbidden',
        });
        return;
      }

      const payload = await decodeJwt(
        forgotPasswordToken,
        TokenType.ForgotPassword
      );

      if (!payload || !payload.sub) {
        // Error
        response.status(StatusCodes.FORBIDDEN).json({
          error: 'Forbidden',
        });
        return;
      }

      const sub = JSON.parse(payload.sub as string);
      const userId = sub['uid'];
      const codeId = sub['cid'];
      if (!userId || !codeId) {
        //Error
        response.status(StatusCodes.FORBIDDEN).json({
          error: 'Forbidden',
        });
        return;
      }

      const forgotPasswordCode = forgotPasswordCodeStore.getCodeById(codeId);
      if (!forgotPasswordCode) {
        // Error
        response.status(StatusCodes.FORBIDDEN).json({
          error: 'Forbidden',
        });
        return;
      }

      if (
        code !== forgotPasswordCode.code ||
        forgotPasswordToken !== forgotPasswordCode.token ||
        !!forgotPasswordCode.obsolete
      ) {
        // Error
        response.status(StatusCodes.FORBIDDEN).json({
          error: 'Forbidden',
        });
        return;
      }

      // Hash the password to get the password digest using argon2
      const passwordDigest = await argon2.hash(password);

      userStore.updatePassword(userId, passwordDigest);

      forgotPasswordCodeStore.markPasswordUpdated(codeId);

      response.clearCookie('__FORGOT__TOKEN');

      response
        .status(StatusCodes.OK)
        .json({ message: 'Password reset successfully!' });
    } catch (error) {
      //Error
      response.status(StatusCodes.FORBIDDEN).json({
        error: 'Forbidden',
      });
      return;
    }
  }

  constructor(private emailService: EmailService) {}
}
