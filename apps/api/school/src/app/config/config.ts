import * as fs from 'fs';

// TODO: Check to see if we put the key in a string will it be faster than reading from a file

export const RSA_ACCESS_TOKEN_PRIVATE_KEY = fs.readFileSync(
  'apps/api/school/src/assets/keys/access/private.key'
);

export const RSA_ACCESS_TOKEN_PUBLIC_KEY = fs.readFileSync(
  'apps/api/school/src/assets/keys/access/public.key'
);

export const RSA_REFRESH_TOKEN_PRIVATE_KEY = fs.readFileSync(
  'apps/api/school/src/assets/keys/refresh/private.key'
);

export const RSA_REFRESH_TOKEN_PUBLIC_KEY = fs.readFileSync(
  'apps/api/school/src/assets/keys/refresh/private.key'
);

export const RSA_FORGOT_PASSWORD_TOKEN_PRIVATE_KEY = fs.readFileSync(
  'apps/api/school/src/assets/keys/access/private.key'
);

export const RSA_FORGOT_PASSWORD_TOKEN_PUBLIC_KEY = fs.readFileSync(
  'apps/api/school/src/assets/keys/access/public.key'
);

export const ACCESS_TOKEN_EXPIRES_IN = '30m';
export const REFRESH_TOKEN_EXPIRES_IN = '60m';
export const FORGOT_PASSWORD_TOKEN_EXPIRES_IN = '15m';
