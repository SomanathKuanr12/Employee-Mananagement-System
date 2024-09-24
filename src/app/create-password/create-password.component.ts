import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent {
  @ViewChild('myForm') form: any; 
  data={ 
    name:'',
     email:'',
    password:''
   }
   message=''
   type:any
   constructor(private userService:UserService){
   }
onSubmit()
{
  
  this.userService.onSignUp(this.data).subscribe((res) => {
    if(res)
    {
      alert("Password created successfully")
    }
  },
  (Error:HttpErrorResponse)=>{
    {
    this.message=Error.error.message
    alert(this.message)
    }
  })
}
// if(this.type=='admin'){
//   this.adminService.onSignUp(this.data).subscribe((res) => {
//     if(res)
//     {
//       alert("new user added successfully")
//     }
//   },
//   (Error:HttpErrorResponse)=>{
//     {
//     this.message=Error.error.message
//     alert(this.message)
//     }
//   })
// }
// this.form.resetForm();
// }
}
