import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../../../Services/salary.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent implements OnInit{
  constructor(private salary:SalaryService){}

  email:any
  salaryData:any
  actualSalary:any
  display:any
  message:any
 ngOnInit(): void {
  this.email=prompt("Enter Employee Email")
  if(this.email!=null)
  {
   this.salary.getData(this.email).subscribe((res)=>{
      this.salaryData=res
      if(this.salaryData[0].email=='')
      {
        this.display=false
        alert("Employee email can not found")
      }
        else{
      console.log(this.salaryData[0].email);
      this.display=true
      // console.log(this.salaryData);
      // console.log(this.salaryData[0].totalPresent);
      // console.log(typeof(this.salaryData[0].salary));
      this.actualSalary=Math.floor(this.salaryData[0].totalPresent*(this.salaryData[0].salary/30))
        }
   },
    (Error:HttpErrorResponse)=>{
      {
      this.message=Error.error.message
      alert(this.message)
      }
    })
   }
  }
  
 }


