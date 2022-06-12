import { Injectable } from '@angular/core';
import { IRegisterRequest, User, UserTypes } from '@stack/models';
import { MockServerModule } from '../../mock-server.module';
import { db } from '../db';
import { TUser, TParent } from '../tables';

@Injectable({ providedIn: MockServerModule })
export class RegisterService {
  constructor() {}

  async register(req: IRegisterRequest): Promise<User | undefined> {
    if (!req || !req.firstname || !req.lastname || !req.email)
      throw Error('Invalid Request!');
    // console.table(await db.userTypes.toArray());
    let newUser: TUser | undefined;
    await db
      .transaction('rw', db.users, db.userTypes, db.parents, async () => {
        const userId = await this.addUser(req);
        newUser = await db.users.where('id').equals(userId).first();
        // console.table(await db.users.toArray());
        switch (req.userTypeId) {
          case UserTypes.Admin:
            throw new Error('Method not implemented.');
          case UserTypes.Parent:
            const parentId = await this.addParent(req, userId);
            const x = await db.parents.toArray();
            // console.table(x);
            break;
          case UserTypes.Student:
            throw new Error('Method not implemented.');
          case UserTypes.Teacher:
            throw new Error('Method not implemented.');
          default:
            throw new Error('Method not implemented.');
        }
        // const users = await db.users.toArray();
        const types = await db.userTypes.toArray();
        const parents = await db.parents.toArray();
      })
      .catch(error => console.log(error));

    const users = await db.users.toArray();
    // const newUser = (await db.users.toArray()).find(
    //   (user) => user.id === userId
    // );
    return <User>{
      id: newUser?.id,
      displayname: newUser?.displayname,
      email: newUser?.email,
      userTypeId: newUser?.userTypeId,
    };
  }

  async addUser(req: IRegisterRequest) {
    const user: TUser = {
      displayname: req.displayname || req.firstname,
      email: req.email,
      blocked: false,
      frozen: false,
      userTypeId: req.userTypeId,
      updateOn: new Date(),
      updatedBy: req.updatedBy || 1,
    };
    console.log('add user', user);
    const id = await db.users.add(user);
    return id;
  }

  async addParent(req: IRegisterRequest, userId: number) {
    console.log('add parent');
    const parent: TParent = {
      dob: req.dob,
      firstname: req.firstname,
      lastname: req.lastname,
      joinedDate: new Date(),
      userId,
      phone: req.phone,
      aboutMe: req.aboutMe,
      profileImageUrl: req.profileImageUrl,
      updatedOn: new Date(),
      updatedBy: userId,
    };

    const id = await db.parents.add(parent);
    return id;
  }

  async addStudent(req: IRegisterRequest, userId: number) {}

  async addTeacher(req: IRegisterRequest, userId: number) {}

  async login(username: string) {
    return db.users
      .where({
        username: username,
      })
      .first();
  }
}
