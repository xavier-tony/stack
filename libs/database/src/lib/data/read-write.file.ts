import * as fs from 'fs';
import chalk from 'chalk';
import { Table } from '../enums';
import { JsonFiles } from '../constants/json-files.constants';
import { keyValueToMap, mapToKeyValuePair } from '../utils';

export function writeFile<T>(data: Map<string, T>, table: Table) {
  const keyValuePair = mapToKeyValuePair<T>(data);
  const dataString = JSON.stringify(keyValuePair, null, 2);
  const filename: string = JsonFiles[table];
  if (dataString && filename) {
    fs.writeFile(`${__dirname}/assets/json/${filename}`, dataString, error => {
      if (error) console.log(error);
      console.log(chalk.cyanBright(`Files written successfully !: ${table}`));
    });
  } else console.log(chalk.magenta(`Could not write the file : ${table}`));
}

export function writeFileSync(data: any, table: Table) {
  const dataString = JSON.stringify(data, null, 2);
  const filename: string = JsonFiles[table];
  fs.writeFileSync(`${__dirname}/assets/json/${filename}`, dataString);
}

export function readFile<T>(table: Table) {
  const filename: string = JsonFiles[table];
  if (filename) {
    const file = fs.readFileSync(`${__dirname}/assets/json/${filename}`);
    if (file) {
      const keyValuePairs = JSON.parse(file as unknown as string);
      return keyValueToMap<T>(keyValuePairs);
    }
  }
  console.log(chalk.magenta(`Could not read the file : ${table}`));
  return new Map<string, T>();
}
