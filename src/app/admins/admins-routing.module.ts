import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { Service1Component } from "./admin/service1/service1.component";

import { AddAdminComponent } from "./admin/add-admin/add-admin.component";
import { ChangePasswordComponent } from "./admin/change-password/change-password.component";
import { SalaryComponent } from "./admin/salary/salary.component";
import { AuthGuard } from "../gaurds/auth.guard";



const routes: Routes = [ {
    path:'admin',
    component:AdminComponent,
   // canActivate:[AuthGuard],
    children:[
     {
      path:'services',
      component:Service1Component
     },
     {
        path:'change',
        component:ChangePasswordComponent
       },
       {
        path:'salary',
        component:SalaryComponent
       },
     {
        path:'add_admin',
        component:AddAdminComponent
     }
    ]
   }
  ];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminsRoutingModule { }