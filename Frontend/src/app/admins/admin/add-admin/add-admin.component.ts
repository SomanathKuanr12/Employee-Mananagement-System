import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  @ViewChild('myForm') form: any; 
  data={ 
    name:'',
     email:'',
    password:''
   }
   message=''
   constructor(private adminService:AdminService){
    
   }
onSubmit()
{
  this.adminService.onAdd(this.data).subscribe((res) => {
    if(res)
    {
      alert("new Admin added successfully")
    }
  },
  (Error:HttpErrorResponse)=>{
    {
    this.message=Error.error.message
    alert(this.message)
    }
  })
  this.form.resetForm();
 }
}
