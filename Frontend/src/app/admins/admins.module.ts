import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { Service1Component } from './admin/service1/service1.component';
import { UpdateEmpComponent } from './admin/update-emp/update-emp.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { AdminsRoutingModule } from './admins-routing.module';
import { SalaryComponent } from './admin/salary/salary.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { SearchPipe } from '../Pipes/search.pipe';
import { SortPipe } from '../Pipes/sort.pipe';
import { SetBackgroundDirective } from '../Directives/set-background.directive';
import { ButtonDirective } from '../Directives/button.directive';
import { AddEmpComponent } from './admin/add-emp/add-emp.component';
import { DataTablesModule } from 'angular-datatables';
import { ClickedDirective } from '../Directives/clicked.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from '../gaurds/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';





@NgModule({
  declarations: [
    AdminComponent,
    AddAdminComponent,
    Service1Component,
    UpdateEmpComponent,
    SalaryComponent,
    ChangePasswordComponent,
    SearchPipe,
    SortPipe,
    SetBackgroundDirective,
    ButtonDirective,
    AddEmpComponent,
    ClickedDirective,
    
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    FormsModule,
    DataTablesModule,
    NgxPaginationModule
    
    
  ],
  exports:[
    AdminComponent,
    Service1Component,
    UpdateEmpComponent,
    AddAdminComponent,
    SalaryComponent,
    ChangePasswordComponent,
    AddEmpComponent
  ],
  providers:[AuthGuard]
})
export class AdminsModule { }
