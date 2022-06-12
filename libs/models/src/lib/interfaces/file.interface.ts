export interface IFile {
  id?: number;
  clientId: string;
  name: string;
  type: string;
  size: number;
  file?: string;
  progress: number | null;
  uploaded: boolean;
  error?: string;
}
