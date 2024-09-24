import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../Services/attendance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../Services/data.service';
import { error } from 'jquery';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit{
  constructor(private attendance:AttendanceService,private dataService:DataService){}
  
data={
  date:'',
  email:'',
  totalPresent:0,
}
ngOnInit(): void {
   this.data.email=this.dataService.getEmail()
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = currentDate.getMonth() + 1; // Months are zero-based (0-11), so we add 1
   const day = currentDate.getDate();
   this.data.date=`${month}-${day}-${year}`
}
status='';


onPresent() {
  // console.log(this.status);
  
  if (this.status === 'present') {
    this.attendance.getData(this.data.email).subscribe((res) => {
      const result=JSON.stringify(res);
      const result1=JSON.parse(result)
      const oldPresent=result1[0].totalPresent;
      console.log(oldPresent);
      
      const  num = parseInt(oldPresent);
      this.data.totalPresent = num+ 1; 
      console.log(this.data.totalPresent);
      
      this.attendance.onUpdate(this.data).subscribe((updateRes) => {
        if (updateRes) {
          alert("Attendance updated successfully");
        }
      },(Error:HttpErrorResponse)=>{
        {
          alert(Error.error.message)
        }
      })
    });
  }
}

}
