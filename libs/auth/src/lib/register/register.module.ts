import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterParentComponent } from './register-parent/register-parent.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterParentComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent,
  ],
  imports: [CommonModule, MatStepperModule],
  exports: [
    RegisterComponent,
    RegisterParentComponent,
    RegisterTeacherComponent,
    RegisterStudentComponent,
  ],
})
export class RegisterModule {}
