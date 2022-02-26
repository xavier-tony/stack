import { Injectable } from '@angular/core';
import { MockServerModule } from '../../mock-server.module';
import { mockDb } from '../db';
import { IRegisterRequest } from '../models';
import { TUser, TParent } from '../tables';

@Injectable({ providedIn: MockServerModule })
export class RegisterService {
  constructor() {}

  async register(req: IRegisterRequest) {
    if (!req || !req.firstname || !req.lastname || !req.username || !req.email)
      throw Error('Invalid Request!');
    console.table(await mockDb.userTypes.toArray());
    const userId = await this.addUser(req);
    console.table(await mockDb.users.toArray());
    const parentId = await this.addParent(req, userId);
    const x = await mockDb.parents.toArray();
    console.table(x);
    return;
  }

  async addUser(req: IRegisterRequest) {
    const user: TUser = {
      username: req.username,
      blocked: false,
      frozen: false,
      userTypeId: req.userTypeId,
      updateOn: new Date(),
      updatedBy: req.updatedBy || 1,
    };
    console.log('add user', user);
    const id = await mockDb.users.add(user);
    return id;
  }

  async addParent(req: IRegisterRequest, userId: number) {
    console.log('add parent');
    const parent: TParent = {
      dob: req.dob,
      email: req.email,
      firstname: req.firstname,
      lastname: req.lastname,
      joinedDate: new Date(),
      userId,
      displayname: req.displayname || req.firstname,
      phone: req.phone,
      aboutMe: req.aboutMe,
      profileImageUrl: req.profileImageUrl,
      updatedOn: new Date(),
      updatedBy: userId,
    };

    const id = await mockDb.parents.add(parent);
    return id;
  }

  async login(username: string) {
    return mockDb.users
      .where({
        username: username,
      })
      .first();
  }
}
