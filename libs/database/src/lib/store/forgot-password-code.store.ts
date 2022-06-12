import { readFile, writeFile } from '../data';
import { FORGOTPASSWORDCODES } from '../data/forgot-password-code.data';
import { Table } from '../enums';
import { ForgotPasswordCodeTable } from '../tables';
import { store } from './store';

class ForgotPasswordCodeStore {
  forgotPasswordCodesCounter = 0;

  #forgotPasswordCodes = new Map<string, ForgotPasswordCodeTable>();
  public get forgotPasswordCodes() {
    if (this.#forgotPasswordCodes.size === 0)
      this.#forgotPasswordCodes = store.runsInNode
        ? (readFile<ForgotPasswordCodeTable>(Table.ForgotPasswordCodes) as Map<
            string,
            ForgotPasswordCodeTable
          >)
        : FORGOTPASSWORDCODES;
    return this.#forgotPasswordCodes;
  }

  set(forgotPassword: ForgotPasswordCodeTable): number {
    this.forgotPasswordCodesCounter += 1;
    this.forgotPasswordCodes.set(
      this.forgotPasswordCodesCounter.toString(),
      forgotPassword
    );
    this.writeToDatabase();
    return this.forgotPasswordCodesCounter;
  }

  updateToken(id: number, token: string) {
    if (id && token) {
      const code = this.forgotPasswordCodes.get(id.toString());
      if (code) {
        code.token = token;
        this.forgotPasswordCodes.set(id.toString(), code);
        this.writeToDatabase();
      }
    }
  }

  getCodeById(id: number) {
    return this.forgotPasswordCodes.get(id.toString());
  }

  getCodeByUser(userId: number): ForgotPasswordCodeTable | null {
    const forgotPassword = [...this.forgotPasswordCodes.values()].find(
      fp => fp.userId === userId
    );
    return forgotPassword || null;
  }

  getExistingCodesByUser(userId: number): ForgotPasswordCodeTable[] | null {
    const forgotPasswords = [...this.forgotPasswordCodes.values()].filter(
      fp => fp.userId === userId
    );
    return forgotPasswords || null;
  }

  markObsolete(id: number) {
    const code = this.getCodeById(id);
    if (code) {
      code.obsolete = true;
    }
  }

  markPasswordUpdated(id: number) {
    const code = this.getCodeById(id);
    if (code) {
      code.obsolete = true;
      code.passwordUpdated = true;
      this.writeToDatabase();
    }
  }

  writeToDatabase() {
    if (store.runsInNode)
      writeFile(this.forgotPasswordCodes, Table.ForgotPasswordCodes);
  }
}

export const forgotPasswordCodeStore = new ForgotPasswordCodeStore();
