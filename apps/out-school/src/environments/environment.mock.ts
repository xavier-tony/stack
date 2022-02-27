import { IEnvironment } from '@stack/models';
import { commonEnvironment } from './environment.common';

const env: Partial<IEnvironment> = {
  mock: true,
};

export const environment = { ...commonEnvironment, ...env };
