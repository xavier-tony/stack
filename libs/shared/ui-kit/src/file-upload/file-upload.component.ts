/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { IFile } from '@stack/models';
import { FileService } from '@stack/services';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'stack-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  files: IFile[] = [];
  disabled = false;
  @Output() filesSelected = new EventEmitter<File[]>();

  onUploadClicked(fileUploadInput: HTMLInputElement) {
    fileUploadInput.click();
    this.onTouched();
  }

  async onFileSelected(event: Event) {
    const files = (event?.target as HTMLInputElement)?.files;
    if (files && files.length > 0) {
      await this.uploadFiles(Array.from(files));
      this.filesSelected.emit(Array.from(files));
    }
  }

  async uploadFiles(files: File[]) {
    files.forEach(async f => {
      const fileToUpload: IFile = await this.fileService.getBase64(f);
      const { file, ...onlyMetadata } = fileToUpload;
      if (fileToUpload) this.files.push(onlyMetadata);
      // TODO: Find a way to move the above logic to the api/msw since getBase64(file) its only needed on `mock` configuration

      this.uploadFile(fileToUpload);
    });
  }

  uploadFile(file: IFile) {
    return this.fileService
      .upload(file)
      .pipe(
        catchError(error => {
          this.updateError(file, error);
          return of(error);
        }),
        finalize(() => this.updateProgress(file, null))
      )
      .subscribe(event => {
        console.log(event.type);
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.updateProgress(
            file,
            Math.round(100 * (event.loaded / event.total))
          );
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
          this.updateUploadStatus(file, true);
          if (event.body.id) this.updateId(file, event.body?.id);
          this.onChange(this.files);
          this.onValidatorChange();
        }
      });
  }

  updateId(file: IFile, id: number) {
    const fileToUpdate = this.files.find(f => f.clientId === file.clientId);
    if (fileToUpdate) fileToUpdate.id = id;
  }

  updateProgress(file: IFile, progress: number | null) {
    console.log(file.name, progress);
    this.files = [
      ...this.files.map(f => ({
        ...f,
        progress: f.clientId === file.clientId ? progress : f.progress,
      })),
    ];
  }

  updateUploadStatus(file: IFile, uploaded: boolean) {
    this.files = [
      ...this.files.map(f => ({
        ...f,
        uploaded: f.clientId === file.clientId ? uploaded : f.uploaded,
        progress: f.clientId === file.clientId ? null : f.progress,
      })),
    ];
  }

  updateError(file: IFile, error: string) {
    this.files = [
      ...this.files.map(f => ({
        ...f,
        error: f.clientId === file.clientId ? error : f.error,
        uploaded: f.clientId === file.clientId ? false : f.uploaded,
        progress: f.clientId === file.clientId ? null : f.progress,
      })),
    ];
  }

  onChange = (files: IFile[]) => {};
  onTouched = () => {};

  writeValue(files: IFile[]): void {
    this.files = files;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  onValidatorChange = () => {};

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const anyFailed = this.files.some(file => !!file.error);
    if (anyFailed)
      return {
        uploadFailed: true,
      };
    else return null;
  }

  constructor(private fileService: FileService) {}
}
