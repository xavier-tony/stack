import { UserTable } from '../tables/user.table';
import { USERS } from '../data/user.data';
import * as argon2 from 'argon2';
import { store } from './store';
import { readFile, writeFile } from '../data/read-write.file';
import { Table } from '../enums';

class UserStore {
  userId: number = 0;

  #users = new Map<string, UserTable>();
  public get users() {
    if (this.#users.size === 0)
      this.#users = store.runsInNode
        ? (readFile<UserTable>(Table.Users) as Map<string, UserTable>)
        : USERS;
    return this.#users;
  }

  createUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    userTypeId: number
  ): Partial<UserTable> {
    const valid = [firstname, lastname, email, password].some(v => !!v);
    if (!valid) throw new Error('Invalid Parameters !');

    const user = this.getUserByEmail(email);
    if (user) throw new Error(`User with email : ${email} already exists !`);

    this.userId += 1;
    const newUser: UserTable = {
      id: this.userId,
      userTypeId,
      firstname,
      lastname,
      email,
      passwordDigest: password,
      blocked: false,
      frozen: false,
      forceLogout: false,
      noRefresh: false,
    };
    this.users.set(this.userId.toString(), newUser);
    const { passwordDigest, ...rest } = newUser;
    this.writeUsers();
    return rest;
  }

  getAllUsers(): Partial<UserTable>[] {
    return [...this.users.values()].map(user => {
      const { passwordDigest, ...rest } = user;
      return rest;
    });
  }

  getUserById(id: number) {
    if (!id) throw new Error('Userid cannot be empty !');
    return this.users.get(id.toString());
  }

  getUserByEmail(email: string) {
    if (!email) throw new Error('Email cannot be empty!');
    return [...this.users.values()].find(user => user.email === email);
  }

  setUser(userId: number, user: UserTable) {
    if (!userId || !user) throw new Error('Invalid user!');
    this.users.set(userId.toString(), user);
    this.writeUsers();
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<UserTable | null> {
    if (!email || !password) throw new Error('Bad request!');

    const user = this.getUserByEmail(email);
    if (!user) throw new Error("User doesn't exists !");

    const validPassword: boolean = await this.verifyPassword(
      user.passwordDigest,
      password
    );

    if (validPassword) return user;

    return null;
  }

  async verifyPassword(
    passwordDigest: string,
    password: string
  ): Promise<boolean> {
    return await argon2.verify(passwordDigest, password);
  }

  updatePassword(userId: number, passwordDigest: string) {
    const user = this.getUserById(userId);
    if (!user) throw new Error('User not found!');
    user.passwordDigest = passwordDigest;
    this.setUser(userId, user);
    this.writeUsers();
  }

  writeUsers() {
    if (store.runsInNode) writeFile(this.users, Table.Users);
  }
}

export const userStore = new UserStore();
