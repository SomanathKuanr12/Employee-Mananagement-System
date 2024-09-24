import { Component, Inject, ViewChild, viewChild } from '@angular/core';
import { Service1Service } from '../../../Services/service1.service';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../model/Employee';

@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrl: './update-emp.component.css'
})
export class UpdateEmpComponent {
employee:Employee={
  id:0,
  name:'',
  city:'',
  salary:0,
  email:''
}
  currentId=0;
  message=''
  constructor(private service1:Service1Service,private activeroute:ActivatedRoute,private dialogRef:MatDialogRef<UpdateEmpComponent>,
    @Inject(MAT_DIALOG_DATA) private id1:number,private route:Router){}
    // this.activeroute.params.subscribe((res:any)=>{  //to get the data 
    //   if(res.id)
    //   {
    //     console.log(res.id)
    //     this.currentId=res.id; //stores the id 
    //   }
    // })
  
  ngOnInit(): void {
    console.log(this.id1);
    this.currentId=this.id1
   this.getData()
  }
  
  employeeData:any;
  employeeData1:any;
  getData()
  {
    this.service1.getDataById(this.currentId).subscribe((resp)=>{
      this.employeeData1=JSON.stringify(resp)
      this.employeeData=JSON.parse(this.employeeData1)
      this.employee.id=this.employeeData[0].id
      this.employee.name=this.employeeData[0].name
      this.employee.salary=this.employeeData[0].salary
      this.employee.email=this.employeeData[0].email
      this.employee.city=this.employeeData[0].city      
    });
  }
   onUserUpdate()
    {
      const body = {
        name: this.employee.name,
        city: this.employee.city,
        email: this.employee.email,
        salary: this.employee.salary
      };
      
      this.service1.updateData(body,this.currentId).subscribe((res)=>{
        if(res)
        {
          alert("updated successfully")
          this.dialogRef.close();
        }
      },
      (Error:HttpErrorResponse)=>{
        {
        this.message=Error.error.message
        alert(this.message)
        }
      }) 
    }  
    onClose(){
      this.dialogRef.close();
    }
}
