import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../../Services/service1.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-data',
  templateUrl: './emp-data.component.html',
  styleUrl: './emp-data.component.css'
})
export class EmpDataComponent implements OnInit{
  searchText='';    
  sortText='';
   datatable:any  //fordatatables

   page:number=1;
   limit:number=5;
  total:number=0;
  
  constructor(private service1:Service1Service,private route:Router,private dialog:MatDialog) { }
  dtInstance:any
  employeeData:any=[];
  ngOnInit(): void {
    // this.onGetData()
    
    this.onSelect();
  }
  onGetData()
{
 this.service1.getData().subscribe((res:any)=>{
  console.log(res);
  
  this.employeeData=res;
 })
}
onSelect(){
 
  let ofset=(this.page-1)*this.limit;
  const data={
    search:this.searchText,
    sort:this.sortText,
    limit:this.limit,
    offset:ofset
  }
  
 
  this.service1.onShorting(data).subscribe((result:any)=>{
    this.total=result.total;   
    this.employeeData = result.data;
    if(this.total<ofset)
      {
        this.page--;
        this.onSelect();
      }  
  })
}


getPage(pageNo:number)
{
  this.page=pageNo;
  this.onSelect();
}


}
