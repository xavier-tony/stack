import { IFile } from '@stack/models';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import {
  FormArray,
  FormControl,
  FormControlDirective,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '@stack/services';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'stack-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  form!: FormGroup;
  @Input() formGroupName!: string;
  files$: Observable<IFile[]> = this.fileService.getFiles().pipe(
    map((files: IFile[]) =>
      files.map((file) => ({
        ...file,
        file: file.file
          ? this.sanitizer.bypassSecurityTrustResourceUrl(file.file)
          : null,
      }))
    ),
    tap(console.log)
  );

  maxDate: Date = new Date();
  constructor(
    private formGroupDirective: FormGroupDirective,
    private http: HttpClient,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
  ) {}

  get displayNameLengthError() {
    return this.form.get('displayname')?.hasError('lengthGreaterThan60');
  }

  get qualifications() {
    return this.form && (this.form.controls['qualifications'] as FormArray);
  }

  ngOnInit(): void {
    this.form = this.formGroupDirective.control.get(
      this.formGroupName
    ) as FormGroup;
  }

  addQualification() {
    let qualification = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
    }) as FormGroup;
    this.qualifications.push(qualification);
  }

  deleteQualification(index: number) {
    this.qualifications.removeAt(index);
  }
}
