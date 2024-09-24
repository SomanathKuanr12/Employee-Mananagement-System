import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  data={
    email:sessionStorage.getItem('logginEmail')
  }
constructor(private user:UserService,private dataService:DataService,private route:Router,private authService: SocialAuthService){}


onlogout(){

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
      this.authService.signOut();
    this.dataService.LogInEmail=''
    this.route.navigate([''])
    alert('Logout successfuly')  
    
}
}
