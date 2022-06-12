import { TokenTable } from '../tables/token.table';
import { TOKENS } from '../data/token.data';
import { store } from './store';
import { readFile } from '../data';
import { Table } from '../enums';
import { writeFile } from '../data/read-write.file';
class TokenStore {
  #tokens = new Map<string, TokenTable>();
  public get tokens() {
    if (this.#tokens.size === 0)
      this.#tokens = store.runsInNode
        ? (readFile<TokenTable>(Table.Tokens) as Map<string, TokenTable>)
        : TOKENS;
    return this.#tokens;
  }

  addToken(token: TokenTable) {
    this.tokens.set(token.loginId.toString(), token);
    this.writeTokens();
  }

  removeTokenByLogin(loginId: number) {
    this.tokens.delete(loginId.toString());
  }

  removeToken(accessToken: string) {
    const token = [...this.tokens.values()].find(
      token => token.accessToken === accessToken
    );
    if (token?.loginId) {
      this.removeTokenByLogin(token.loginId);
    }
  }

  getLoginIdFromToken(accessToken: string) {
    const token = [...this.tokens.values()].find(
      token => token.accessToken === accessToken
    );
    return token?.loginId || null;
  }

  updateAccessToken(loginId: number, accessToken: string) {
    const token = this.tokens.get(loginId.toString());
    if (token) {
      token.accessToken = accessToken;
      this.tokens.set(loginId.toString(), token);
    }
  }

  updateToken(token: Partial<TokenTable>) {
    if (!token.loginId) throw new Error('LoginId is missing !');
    const tokenToUpdate = this.getToken(token.loginId.toString());
    if (tokenToUpdate) {
      const newToken = { ...tokenToUpdate, ...token };
      this.addToken(newToken);
      this.writeTokens();
    }
  }

  getToken(loginId: string) {
    return this.tokens.get(loginId);
  }

  writeTokens() {
    if (store.runsInNode) writeFile(this.tokens, Table.Tokens);
  }
}

export const tokenStore = new TokenStore();
