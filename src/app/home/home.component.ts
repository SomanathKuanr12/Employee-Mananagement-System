import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private route:Router){}
  type=''
    onUserClick()
    {
      this.type='user'
       this.route.navigate(['log_in',this.type])
      // this.route.navigate(['user',this.type])
    }
    onAdminClick()
    {
      this.type='admin'
      this.route.navigate(['log_in',this.type])
      //this.route.navigate(['admin',this.type])
    }
}
