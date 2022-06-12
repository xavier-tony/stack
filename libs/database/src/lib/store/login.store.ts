import { LOGINS } from '../data/login.data';
import { LoginTable } from '../tables';
import { readFile, writeFile } from '../data/read-write.file';
import { Table } from '../enums';
import { store } from './store';
class LoginStore {
  loginCounter = 0;
  #logins = new Map<string, LoginTable>();
  public get logins() {
    if (this.#logins.size === 0)
      this.#logins = store.runsInNode
        ? (readFile<LoginTable>(Table.Logins) as Map<string, LoginTable>)
        : LOGINS;
    return this.#logins;
  }

  login(userId: number): LoginTable {
    this.loginCounter += 1;
    const newLogin: LoginTable = {
      id: this.loginCounter,
      userId,
      on: new Date(),
      logOut: false,
      obsolete: false,
    };
    this.logins.set(this.loginCounter.toString(), newLogin);
    this.writeLogins();
    return newLogin;
  }

  logout(id: number) {
    const login = this.logins.get(id.toString());
    if (login) {
      const updated = { ...login, logOut: true, obsolete: true };
      this.logins.set(id.toString(), updated);
      this.writeLogins();
    } else {
      throw new Error(`Cannot find login with id : ${id}`);
    }
  }

  getLoginById(id: number) {
    if (!id) throw new Error(`Parameter id is needed`);
    const login = this.logins.get(id.toString());
    if (!login) throw new Error(`No login with this id: ${id.toString()}`);
    return login;
  }

  getLoginsByUserId(userId: number) {
    const logins = [...this.logins.values()].filter(
      login => login.userId === userId
    );
    if (!logins || logins.length === 0)
      throw new Error(`No logins found for this user with user id : ${userId}`);
    return logins;
  }

  updateLogin(login: Partial<LoginTable>) {
    if (!login.id) throw new Error('Id is not present in the parameters');
    const loginToUpdate = this.logins.get(login.id.toString());
    if (!loginToUpdate) throw new Error(`No login found with id : ${login.id}`);
    const newLogin: LoginTable = { ...loginToUpdate, ...login };
    this.logins.set(login.id.toString(), newLogin);
    this.writeLogins();
  }

  markObsolete(loginId: number) {
    const login = this.logins.get(loginId.toString());
    if (login) {
      login.obsolete = true;
      this.logins.set(loginId.toString(), login);
    }
    this.writeLogins();
  }

  getAllLogins() {
    return [...this.logins.values()];
  }

  writeLogins() {
    if (store.runsInNode) writeFile(this.logins, Table.Logins);
  }
}

export const loginStore = new LoginStore();
