import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterParentComponent } from './register-parent/register-parent.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UIKitModule } from '@stack/shared/ui-kit';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { SignUpContainerComponent } from '../signup/sign-up.container/sign-up.container.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterParentComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent,
    PersonalInfoComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    UIKitModule,
    MatButtonModule,
    TextFieldModule,
    MatRadioModule,
  ],
  exports: [
    RegisterComponent,
    RegisterParentComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent,
  ],
})
export class RegisterModule {}
