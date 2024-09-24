import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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
