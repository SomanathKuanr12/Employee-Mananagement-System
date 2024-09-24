import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { UpdateEmpComponent } from '../update-emp/update-emp.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Service1Service } from '../../../Services/service1.service';
import { Employee } from '../../../model/Employee';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { ApiResponse } from '../../../model/ApiResponse';

import { Subject } from 'rxjs';
import DataTables from 'datatables.net';
import { error } from 'jquery';




@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrl: './service1.component.css'
})
export class Service1Component implements OnInit {
  userType = sessionStorage.getItem('role')
  searchText = '';
  sortText = '';
  datatable: any  //fordatatables
  message='';
  page: number = 1;
  limit: number = 5;
  total: number = 0;

  constructor(private service1: Service1Service, private route: Router, private dialog: MatDialog) { }
  dtInstance: any
  employeeData: any = [];
  ngOnInit(): void {
    // this.onGetData()

    this.onSelect();
  }
  onGetData() {
    this.service1.getData().subscribe((res: any) => {
      console.log(res);

      this.employeeData = res;
    })
  }


  //////////for dataTables/////////////

  // this.service1.getData().subscribe((result:any) => {
  //   this.employeeData=result;
  //   setTimeout(()=>{   
  //     this.datatable=$('#datatableexample').DataTable( {
  //       pagingType: 'full_numbers',
  //       pageLength: 5,
  //       processing: true,
  //       lengthMenu : [5,10,15]
  //   } );
  //   }, 0);
  // })


  errMessage=''

  /////////////for shorting/////
  onSelect() {

    let ofset = (this.page - 1) * this.limit;
    const data = {
      search: this.searchText,
      sort: this.sortText,
      limit: this.limit,
      offset: ofset
    }


    this.service1.onShorting(data).subscribe((result: any) => {
      this.total = result.total;
      this.employeeData = result.data;
      if (this.total < ofset) {
        this.page--;
        this.onSelect();
      }
    },
    (Error:HttpErrorResponse)=>{
      this.errMessage=Error.error.message;
      alert(this.errMessage);
      // if(Error.status==413)
      //   {
      //     this.route.navigate(['Home']);
      //   }   
    }
  )
  }


  getPage(pageNo: number) {
    this.page = pageNo;
    this.onSelect();
  }

  //  currentPage:any;
  //  onPrev()
  //  {
  //   this.onSelect();
  //  }
  //  onNext()
  //  {
  //   this.onSelect();
  //  }

  onEdit(id: any) {
    //  this.route.navigate(['update_emp',id])
    const dialogref = this.dialog.open(UpdateEmpComponent, {
      data: id
    })
    dialogref.afterClosed().subscribe(() => {
      // this.datatable.destroy()
      this.ngOnInit()

    })
  }



  onDelete(id: any) {
    this.service1.deleteData(id).subscribe((res) => {
      if (res) {
        alert("Data deleted successfully");
        // this.service1.getData(this.page).subscribe((res)=>{
        //   this.employeeData=res;
        //   // this.datatable.destroy();
        this.ngOnInit()
        // })
      }
    },
    (Error:HttpErrorResponse)=>{
      {
      this.message=Error.error.message
      alert(this.message)
      }
    })
  }
  // onAdd(){
  //   this.route.navigate(['update_emp'])
  // }


  onAdd() {
   this.service1.onCheckRole().subscribe((res)=>{
    if(res)
      {
        const dialogRef = this.dialog.open(AddEmpComponent)
        dialogRef.afterClosed().subscribe(() => {
          // this.datatable.destroy()
          this.ngOnInit()
        })
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
