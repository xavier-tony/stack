import { Injectable } from '@angular/core';
import { IFile } from '@stack/models';
import { db } from '../db';
import { TFile } from '../tables/file.table';

@Injectable({ providedIn: 'root' })
export class FileDataService {
  constructor() {}
  async getFiles(): Promise<TFile[]> {
    return db.files.toArray();
  }

  async uploadFile(file: IFile): Promise<number | null> {
    if (file.file) {
      const id: number = await this.addFile(
        file.name,
        file.size,
        file.type,
        file.file
      );
      return id;
    }
    return null;
  }

  async addFile(
    name: string,
    size: number,
    type: string,
    file: string
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      const newFile: TFile = {
        name,
        size,
        type,
        file,
      };
      await db.transaction('rw', db.files, async () => {
        const id: number = await db.files.add(newFile);
        resolve(id);
      });
    });
  }
}
