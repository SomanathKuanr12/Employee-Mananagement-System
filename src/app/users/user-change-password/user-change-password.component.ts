import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrl: './user-change-password.component.css'
})
export class UserChangePasswordComponent implements OnInit{
  
  message=''
  data = {
    oldPassword: '',
    newPassword: '',
    email:''
  }
  constructor(private user: UserService,private dataService:DataService) { }
  ngOnInit(): void {
    this.data.email=this.dataService.getEmail()
  }
  changePassword()
  {
    this.user.onChange(this.data).subscribe((res) => {
      if (res) {
        const response=JSON.stringify(res)
        const result=JSON.parse(response)
        this.message=result.message
        alert(this.message)
      }
    },
    (Error:HttpErrorResponse)=>{
      {
      this.message=Error.error.message
      }
    })
  }
}
