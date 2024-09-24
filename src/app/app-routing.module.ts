import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AppComponent } from './app.component';
import { MainComponent } from './sidebar/main/main.component';

import { AuthGuard } from './gaurds/auth.guard';

import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



const routes: Routes = [
{path:'',component:HomeComponent},
{path:'Home',component:HomeComponent},
{path:'log_in/:type',component:LogInComponent},
{path:'forgot_password',component:UserForgotPasswordComponent},
{path:'reset_password',component:ResetPasswordComponent},
  {
    path:'admin',
    loadChildren: () => import('./admins/admins.module').then((m) => m.AdminsModule)
  },
  {
    path:'user',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
