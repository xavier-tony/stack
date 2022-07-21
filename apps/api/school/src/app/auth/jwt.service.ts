/* eslint-disable @typescript-eslint/ban-types */
import * as crypto from 'crypto';
import * as util from 'util';

import * as jwt from 'jsonwebtoken';
import {
  RSA_ACCESS_TOKEN_PRIVATE_KEY,
  RSA_ACCESS_TOKEN_PUBLIC_KEY,
  RSA_REFRESH_TOKEN_PRIVATE_KEY,
  RSA_REFRESH_TOKEN_PUBLIC_KEY,
} from '../config';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  FORGOT_PASSWORD_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  RSA_FORGOT_PASSWORD_TOKEN_PRIVATE_KEY,
  RSA_FORGOT_PASSWORD_TOKEN_PUBLIC_KEY,
} from '../config/config';

const randomBytes = util.promisify(crypto.randomBytes);
const signJwt: Function = util.promisify(jwt.sign);

export enum TokenType {
  Access = 'ACCESS',
  Refresh = 'REFRESH',
  CSRF = 'CSRF',
  ForgotPassword = 'FORGOT_PASSWORD',
}

export async function createSessionToken(id: string, type: TokenType) {
  let privateKey: Buffer | string | undefined = undefined;
  let expiration: string;
  if (type === TokenType.Access) {
    privateKey = RSA_ACCESS_TOKEN_PRIVATE_KEY;
    expiration = ACCESS_TOKEN_EXPIRES_IN;
  } else if (type === TokenType.Refresh) {
    privateKey = RSA_REFRESH_TOKEN_PRIVATE_KEY;
    expiration = REFRESH_TOKEN_EXPIRES_IN;
  } else if (type === TokenType.ForgotPassword) {
    privateKey = RSA_FORGOT_PASSWORD_TOKEN_PRIVATE_KEY;
    expiration = FORGOT_PASSWORD_TOKEN_EXPIRES_IN;
  }

  if (!privateKey) throw new Error('Invalid token type!');

  return signJwt({}, privateKey, {
    algorithm: 'RS256',
    expiresIn: expiration,
    subject: id,
  });
}

export async function decodeJwt(token: string, type: TokenType) {
  let publicKey: Buffer | string | undefined = undefined;
  if (type === TokenType.Access) publicKey = RSA_ACCESS_TOKEN_PUBLIC_KEY;
  else if (type === TokenType.Refresh) publicKey = RSA_REFRESH_TOKEN_PUBLIC_KEY;
  else if (type === TokenType.ForgotPassword)
    publicKey = RSA_FORGOT_PASSWORD_TOKEN_PUBLIC_KEY;
  return await jwt.verify(token, publicKey);
}

export async function createCSRFToken() {
  return await randomBytes(32).then(bytes => bytes.toString('hex'));
}

export function randomString(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
}
