import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFile } from '@stack/models';
import { Observable } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  upload(file: IFile) {
    return this.http.post('/api/upload', file, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getBase64(file: File): Promise<IFile> {
    return new Promise<IFile>((resolve, reject) => {
      const reader = new FileReader();
      // Setup onload event for reader
      reader.onload = async e => {
        if (e && e.target && e.target.result) {
          // Store base64 encoded representation of file
          const [name, size, type] = [file.name, file.size, file.type];
          const fileAsBase64 =
            e && e.target && e.target.result
              ? e.target.result.toString()
              : null;
          resolve(<IFile>{
            clientId: uuidV4(),
            file: fileAsBase64,
            name,
            size,
            type,
            uploaded: false,
          });
        }
      };

      // Read the file
      reader.readAsDataURL(file);
    });
  }

  getFiles(): Observable<IFile[]> {
    return this.http.get<IFile[]>('/api/files');
  }
}
