import { IFile } from '@stack/models';

export interface TFile {
  id?: number;
  name: string;
  type: string;
  size: number;
  file: string;
}
