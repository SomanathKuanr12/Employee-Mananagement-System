import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePasswordComponent } from '../create-password/create-password.component';
import { ChangePasswordComponent } from '../admins/admin/change-password/change-password.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { AuthGuard } from '../gaurds/auth.guard';
import { UserForgotPasswordComponent } from '../user-forgot-password/user-forgot-password.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { EmpDataComponent } from './emp-data/emp-data.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    UserComponent,
    UserChangePasswordComponent,
    AttendanceComponent,
    DailyReportComponent,
    EmpDataComponent,
    
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports:[
    AttendanceComponent,
    UserChangePasswordComponent
  ],
  providers:[AuthGuard]
})
export class UsersModule { }
