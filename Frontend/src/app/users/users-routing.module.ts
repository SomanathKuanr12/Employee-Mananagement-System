import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { NgModule } from "@angular/core";
import { AttendanceComponent } from "./attendance/attendance.component";
import { ChangePasswordComponent } from "../admins/admin/change-password/change-password.component";
import { UserChangePasswordComponent } from "./user-change-password/user-change-password.component";
import { AuthGuard } from "../gaurds/auth.guard";
import { EmpDataComponent } from "./emp-data/emp-data.component";


const userRoutes: Routes = [ {
    path:'user',
    component:UserComponent,
    //canActivate:[AuthGuard],
    children:[
                {
                    path:'emp_data',
                    component:EmpDataComponent
                },
                {
                    path:'attendance',
                    component:AttendanceComponent
                },
                {
                    path:'user_change',
                    component:UserChangePasswordComponent
                }

    ]
   }
  ];



@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }