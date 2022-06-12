import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { schema } from './models';
import * as data from './config/data.json';
import { TParent, TStudent, TTeacher, TUser, TUserType } from './tables';
import { MockServerModule } from '../mock-server.module';
import { TFile } from './tables/file.table';

@Injectable({
  providedIn: MockServerModule, // TODO: mockserver - try to providedIn: MockServerModule to minimize the scope of this service
})
export class MockDB extends Dexie {
  userTypes!: Table<TUserType, number>;
  users!: Table<TUser, number>;
  parents!: Table<TParent, number>;
  students!: Table<TStudent, number>;
  teachers!: Table<TTeacher, number>;
  files!: Table<TFile, number>;
  data: any = data;
  constructor() {
    super('thestackdb');
    this.version(1).stores(schema);
    this.on('populate', async () => {
      await this.populate();
      console.log('populated', await db.userTypes.count());
    });
    if (!this.isOpen()) this.open();
    // this.users.hook('creating', function (obj) {
    //   // You may return another object or modify existing object.
    //   console.log('creating : ', obj);
    // });

    // this.users.hook('deleting', function (obj) {
    //   // You may return another object or modify existing object.
    //   console.log('deleting : ', obj);
    // });
    // this.users.hook('updating', function (obj) {
    //   // You may return another object or modify existing object.
    //   console.log('updating : ', obj);
    // });

    // this.users.hook('reading', function (obj) {
    //   // You may return another object or modify existing object.
    //   console.log('reading : ', obj);
    // });
  }

  populate(): any {
    console.log('populating');
    if (!data) throw Error('No data to populate!');
    return db.userTypes.bulkAdd(this.data.userTypes);
  }
}

export const db = new MockDB();
