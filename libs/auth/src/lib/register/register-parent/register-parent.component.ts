import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTypes } from '@stack/models';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'stack-register-parent',
  templateUrl: './register-parent.component.html',
  styleUrls: ['./register-parent.component.scss'],
})
export class RegisterParentComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form!: FormGroup;

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   signup: this.formBuilder.group({
    //     firstname: ['', Validators.required],
    //     lastname: ['', Validators.required],
    //     email: ['', Validators.required, Validators.email],
    //     password: ['', Validators.required],
    //     confirmPassword: ['', Validators.required],
    //   }),
    //   personalInfo: this.formBuilder.group({
    //     displayname: [undefined, Validators.required],
    //     phone: ['', Validators.required],
    //     qualifications: this.formBuilder.array([]),
    //   }),
    // });
  }

  signup() {
    console.log(this.form.value);
    // const { confirmPassword, ...user } = this.authForm.value;
    // console.log(user);
    // this.authService.signup({ ...user, userTypeId: UserTypes.Parent });
  }
}
