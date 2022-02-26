import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { schema } from './models';
import * as data from './config/data.json';
import { TParent, TStudent, TTeacher, TUser, TUserType } from './tables';
import { MockServerModule } from '../mock-server.module';

@Injectable({
  providedIn: MockServerModule, // TODO: mockserver - try to providedIn: MockServerModule to minimize the scope of this service
})
export class MockDB extends Dexie {
  userTypes!: Table<TUserType, number>;
  users!: Table<TUser, number>;
  parents!: Table<TParent, number>;
  students!: Table<TStudent, number>;
  teachers!: Table<TTeacher, number>;
  data: any = data;
  constructor() {
    super('thestackdb');
    this.version(1).stores(schema);
    this.on('populate', async () => {
      await this.populate();
      console.log('populated', await this.userTypes.count());
    });
  }

  populate(): any {
    console.log('populating');
    if (!data) throw Error('No data to populate!');
    return this.userTypes.bulkAdd(this.data.userTypes);
  }
}

export const mockDb = new MockDB();
