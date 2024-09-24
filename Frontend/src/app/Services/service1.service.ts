import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{LogInComponent} from '../log-in/log-in.component'
@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor(private http:HttpClient,private LogInComponent:LogInComponent) { }
  getUrl=`http://localhost:4100/service1/get`
  deleteUrl=`http://localhost:4100/service1/delete`
  putUrl=`http://localhost:4100/service1/update`
  postUrl=`http://localhost:4100/service1/insert`
  sortUrl=`http://localhost:4100/service1/sort`
  checkUrl='http://localhost:4100/service1/checkRole'
  getData()
  {
    const token1 = sessionStorage.getItem('token')
   
    const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
  console.log(token);
  
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
    return this.http.get(this.getUrl,{headers});
  }
onCheckRole(){
  const token1 = sessionStorage.getItem('token')
   
    const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
  console.log(token);
  
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
    return this.http.get(this.checkUrl,{headers});
}




/////for sorting////////////
onShorting(data:any)
{
  const token1 = sessionStorage.getItem('token')
   
  const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
console.log(token);

  const headers = new HttpHeaders({
    'authorization': `Bearer ${token}`
  });
  return this.http.post(`${this.sortUrl}`,data,{headers})
}
/////////////////

  deleteData(id:any){
    const token1 = sessionStorage.getItem('token')
   
    const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
  console.log(token);
  
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.deleteUrl}/${id}`,{headers})
  }
  getDataById(id:any)
  {
    const token1 = sessionStorage.getItem('token')
   
    const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
  console.log(token);
  
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.getUrl}/${id}`,{headers})
  }
  updateData(data:any,id:any)
  {
    const token1 = sessionStorage.getItem('token')
   
    const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
  console.log(token);
  
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.putUrl}/${id}`,data,{headers})
  }
  insertData(data:any)
  {
    const token1 = sessionStorage.getItem('token')
   
    const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
  console.log(token);
  
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
    return this.http.post(this.postUrl,data,{headers})
  }
}
