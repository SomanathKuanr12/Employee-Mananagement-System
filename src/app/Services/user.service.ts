import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  loginurl = `http://localhost:4100/user/log_in`;
  signupurl = `http://localhost:4100/user/sign_up`;
  geturl = `http://localhost:4100/user/get`;
  posturl=`http://localhost:4100/user/change`;
    onlogIn(data1:any) { 
     return  this.http.post(this.loginurl,data1)
    }
    onSignUp(data2:any)
    {
     return  this.http.put(this.signupurl,data2)
      }
    onRead()
    {
      return this.http.get(this.geturl);
    }
    onChange(data3:any){
      console.log('called',data3);
      console.log(data3.email);
      
      return this.http.put(this.posturl,data3)
    }
 }

