import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../../Services/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  @ViewChild('myForm') form: any; 
  message=''
  data = {
    oldPassword: '',
    newPassword: '',
    email:''
  }

type:any
  constructor(private user: UserService,private admin:AdminService) { }
  changePassword()
  {
    this.admin.onChange(this.data).subscribe((res) => {
      if (res) {
        this.message="updated successfully"
        alert(this.message)
        this.form.resetForm();
      }
    },
    (Error:HttpErrorResponse)=>{
      {
      this.message=Error.error.message;     
      }
    })
  }
}


