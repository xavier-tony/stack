import { Injectable } from '@angular/core';
import { ColorCodes } from '@stack/models';

@Injectable({ providedIn: 'root' })
export class ConsoleService {
  constructor() {}

  log(...message: any[]) {
    console.log(ColorCodes.BLUE, ...message);
  }

  success(...message: any[]) {
    console.log(ColorCodes.GREEN, ...message);
  }

  warn(...message: any[]) {
    console.log(ColorCodes.MAGENTA, ...message);
  }

  error(...message: any[]) {
    console.log(ColorCodes.RED, ...message);
  }

  table(message: any) {
    console.table(message);
  }

  color(color: string, ...message: any[]) {
    console.log(ColorCodes.BLUE, ...message);
  }
}
