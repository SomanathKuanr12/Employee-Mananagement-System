import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient) { }
  loginurl = `http://localhost:4100/admin/log_in`;
  fburl = `http://localhost:4100/admin/log_in/facebook`;
  addUrl = `http://localhost:4100/admin/sign_up`;
  geturl = `http://localhost:4100/admin/get`;
  posturl=`http://localhost:4100/admin/change`;
    onlogIn(data1:any) {
     // console.log(data1);
      
     return  this.http.post(this.loginurl,data1)
    }
    onFacebook(data:any){
      return  this.http.post(this.fburl,data)
    }
    onAdd(data2:any)
    {
      const token1 = sessionStorage.getItem('token')
   
    const token=token1?.substring(1,token1.length-1); //as data comes from sessonStorageis in string format with " "
  console.log(token);
  
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`
    });
     return  this.http.post(this.addUrl,data2,{headers})
      }
    onRead()
    {
      
      return this.http.get(this.geturl);
    }
    onChange(data3:any){
      console.log('called',data3);
      
      return this.http.put(this.posturl,data3)
    }
   
}
