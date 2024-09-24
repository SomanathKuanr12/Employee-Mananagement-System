import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './sidebar/main/main.component';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './gaurds/auth.guard';
import { ChangePasswordComponent } from './admins/admin/change-password/change-password.component';

import { AttendanceComponent } from './users/attendance/attendance.component';
import { SalaryComponent } from './admins/admin/salary/salary.component';
import { UserComponent } from './users/user/user.component';
import { AdminComponent } from './admins/admin/admin.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { AddAdminComponent } from './admins/admin/add-admin/add-admin.component';
import { HomeComponent } from './home/home.component';
import { UpdateEmpComponent } from './admins/admin/update-emp/update-emp.component';
import { Service1Component } from './admins/admin/service1/service1.component';
import { AdminsModule } from './admins/admins.module';
import { CommonModule } from '@angular/common';
import { UsersModule } from './users/users.module';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddEmpComponent } from './admins/admin/add-emp/add-emp.component';
import { DataTablesModule } from 'angular-datatables';
import { UserForgotPasswordComponent } from './user-forgot-password/user-forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OAuthModule, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { OAuthConfig } from './auth.config';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';







interface CustomOAuthModuleConfig extends OAuthModuleConfig {
  customConfig: any;
}



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MainComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    CreatePasswordComponent,
    HomeComponent,
    PageNotFoundComponent, 
    UserForgotPasswordComponent, ResetPasswordComponent
  ],
  
  imports: [
    
    BrowserModule,
    AdminsModule,
    UsersModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule ,
    SocialLoginModule,
    DataTablesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [],
        sendAccessToken: true,
      },
      // Pass your custom configuration directly
      customConfig: OAuthConfig,
    } as CustomOAuthModuleConfig)
  ],
  providers: [LogInComponent,AdminsModule,UsersModule,    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1512094386071565')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
