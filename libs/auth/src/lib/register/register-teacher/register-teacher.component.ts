import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { testValidator } from '@stack/services';
import { AuthService } from '../../auth.service';
import { User, UserTypes } from '@stack/models';

@Component({
  selector: 'stack-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss'],
})
export class RegisterTeacherComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  form = this.formBuilder.group({
    signup: this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }),
    personalInfo: this.formBuilder.group({
      displayname: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [testValidator()],
          updateOn: 'blur',
        },
      ],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      files: [[]],
      qualifications: this.formBuilder.array([]),
    }),
  });

  ngOnInit(): void {}

  signup() {
    const value = this.form.value;
    if (value && value.personalInfo && value.signup) {
      const user: User = {
        displayname: value.personalInfo.displayname?.toString() || '',
        email: value.signup.email?.toString() || '',
        firstname: value.signup.firstname?.toString() || '',
        lastname: value.signup.lastname?.toString() || '',
        userTypeId: UserTypes.Teacher,
        password: value.signup.password || undefined,
      };
      this.authService.signup(user).subscribe(console.log);
    }
    // const { confirmPassword, ...user } = this.authForm.value;
    // console.log(user);
    // this.authService.signup({ ...user, userTypeId: UserTypes.Parent });
  }
}
