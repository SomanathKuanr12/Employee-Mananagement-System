import { Component } from '@angular/core';
import { Service1Service } from '../../../Services/service1.service';
import { Employee } from '../../../model/Employee';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateEmpComponent } from '../update-emp/update-emp.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { OtpService } from '../../../Services/otp.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css'
})
export class AddEmpComponent {
  constructor(private service1:Service1Service,private otpService:OtpService,private dialogRef:MatDialogRef<UpdateEmpComponent>){}
    // employee: Employee = new Employee(0, '', '', 0, ''); 
    message='';
    errMessage='';
  onUserAdd(val:any){
    const employee:Employee={
      id: val.id,
      name:val.name,
      city:val.city,
      email:val.email,
      salary:val.salary,
    }
    this.service1.insertData(employee).subscribe((res)=>{
      if(res)
      {
      //   this.otpService.sendMessage(employee.email).subscribe((result)=>{
      //     if(result)
      //       {
      //         this.message="Wellcome mail sent Successfully"
      //       }
      //   },
      // (Error:HttpErrorResponse)=>{
      //   this.errMessage=Error.error.message
      // })   
      this.message="employee added Successfully"
      }
    },
    (Error:HttpErrorResponse)=>{
      this.errMessage=Error.error.message;
      
    })
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }
  onClose(){
    this.dialogRef.close();
  }
}
