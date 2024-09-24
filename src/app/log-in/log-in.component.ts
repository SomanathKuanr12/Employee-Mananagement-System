import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { DataService } from '../Services/data.service';
import {OAuthConfig } from '../auth.config'
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  data = {
    email: '',
    password: ''
  }
  data1={
    email:''
  }
  type:any;
  email:any;
  token:any;
  message=''
  user:any
  loggedIn:any
  constructor(private userService: UserService,private route:Router,private adminService:AdminService,private activeRoute:ActivatedRoute,private dataService:DataService,private oauthService:OAuthService,private authService: SocialAuthService) { 
    this.configureOAuth();
    

  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((res:any)=>{ 
      if(res.type)
      {
        this.type=res.type;
        console.log(this.type);
        
      }

      /////for facebook/////
      this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(user);
        
        this.loggedIn = (user != null);
        this.onFbLogin();
        
      });
      
    })
    
  }


 

  ///////////////for facebook////////////

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  

  onFbLogin(){
    this.data1.email=this.user.email
        const token=this.user.authToken
       
    this.adminService.onFacebook(this.data1).subscribe((res:any)=>{
      if(res){  
        sessionStorage.setItem('role',JSON.stringify('admin'));
        sessionStorage.setItem('token',JSON.stringify(token))
        this.route.navigate(['/admin']);
      }
    },
    (Error:HttpErrorResponse)=>{
      {
      this.message=Error.error.message
      alert(this.message)
      }
    })
  }

  configureOAuth() {
    this.oauthService.configure({
      loginUrl: OAuthConfig.oauthUrl,
      clientId: OAuthConfig.clientId,
      redirectUri: OAuthConfig.redirectUri,
      scope: OAuthConfig.scope,
      responseType: OAuthConfig.responseType,
    });
    
  }
 
  onLinkedIn(){
    const accessToken='AQTwCwGBhzl5_MIyeP7bmCmo9Ql9ghqxn130vzQPKB9Hkzb0qSwQ7IgfF4vjBrUUNBEjKa6OFz0k4HTLHhbk7000Lqbj82Kezrxqdtb9ujNqZxo7anlGIJIM9B21Hko-i8hLGIDmANUQNkN_ujVwkDpFgiOPfnbd_ToOmnGaZwpY4EA0LYFhx8-M7rncXD5TrsaNDAe30hIzCsI5lks&state=WGNkSGhydWs2YjYwYTVxR3pzRH5LMTNaWDliWEhNRmFqX2lncWtPZnJjTGNP'
    sessionStorage.setItem('role',JSON.stringify('admin'));
    sessionStorage.setItem('token',JSON.stringify(accessToken))
    this.oauthService.initImplicitFlow() 
  }

 
  onLinkedInwitthOauth()
  {
    const clientId =OAuthConfig.clientId;
    const redirectUri = encodeURIComponent('http://localhost:4100/auth/linkedin/callback');
    const scope = encodeURIComponent('email profile openid');
    const state = encodeURIComponent('random_state_string');
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    window.location.href = linkedInAuthUrl;

  }

  
  result:any
  onSubmit() {   
    if(this.type=='user')
    this.userService.onlogIn(this.data).subscribe(
      (res)=>{
        this.message="Login successfully"
      //alert(this.message)
        const response=JSON.stringify(res);
        const result=JSON.parse(response)
        this.token=result.token
        this.email=result.email
        // console.log(this.token);
        //console.log(this.email);
        sessionStorage.setItem('token',JSON.stringify(this.token))
        sessionStorage.setItem('role',JSON.stringify('user'))
        this.dataService.LogInEmail=this.email;
        //console.log(this.dataService.LogInEmail);
        this.dataService.getEmail()
        // sessionStorage.setItem('email',JSON.stringify(this.email))
        this.route.navigate(['/user']);
    },
    (Error:HttpErrorResponse)=>{
      {
      this.message=Error.error.message
      alert(this.message)
      }
    })
    if(this.type=='admin')
    this.adminService.onlogIn(this.data).subscribe(
      (res)=>{
      alert("Login successfully")
        const response=JSON.stringify(res);
        const result=JSON.parse(response)
        this.token=result.token
        
        sessionStorage.setItem('token',JSON.stringify(this.token))
        sessionStorage.setItem('role',JSON.stringify('admin'))
        this.route.navigate(['/admin']);
    },
    (Error:HttpErrorResponse)=>{
      {
      this.message=Error.error.message
      alert(this.message)
      }
    })
  }
}
    




  
  
      
    
  






