import { IEnvironment } from '@stack/models';
import { commonEnvironment } from './environment.common';

const env: Partial<IEnvironment> = {
  production: true,
};

export const environment = { ...commonEnvironment, ...env };
