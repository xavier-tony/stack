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

    const userId = await this.addUser(req);
    return this.addParent(req, userId);
  }

  private addUser(req: IRegisterRequest) {
    const user: TUser = {
      username: req.username,
      blocked: false,
      frozen: false,
      userTypeId: req.userTypeId,
      updateOn: new Date(),
      updatedBy: req.updatedBy || 1,
    };

    return mockDb.users.add(user);
  }

  private addParent(req: IRegisterRequest, userId: number) {
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

    return mockDb.parents.add(parent);
  }

  async login(username: string) {
    return mockDb.users
      .where({
        username: username,
      })
      .first();
  }
}
