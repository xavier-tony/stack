import { LoginTable } from '../tables/login.table';
// import loginsJson from './json/login.data.json';
import { keyValueToMap } from '../utils';

const loginData: { [key: string]: LoginTable } = {}; //loginsJson;
const loginsMap = keyValueToMap(loginData);
export const LOGINS: Map<string, LoginTable> = loginsMap;
